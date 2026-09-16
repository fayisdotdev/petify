# ARCHITECTURE.md — Petify

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React 18 + Vite 5 | Static build, no server-side rendering needed |
| Language | JavaScript (not TypeScript) | Keeps things approachable given current skill level; can migrate to TS later without changing architecture |
| Styling | Plain CSS / CSS Modules | No framework lock-in; revisit Tailwind later if desired |
| Routing | React Router v6 | Client-side routing on a static site |
| Backend | Supabase (Postgres + Auth + Storage + Edge Functions) | Hosted, free tier, no server for us to run |
| Auth | Supabase Auth (email/password) | Covers customers, simple admins, privileged admins |
| File storage | Supabase Storage | Product images |
| Email | Supabase Edge Function → Resend (or similar) | Triggered on new order insert |
| Hosting (frontend) | GitHub Pages | Free; static build output only. Migrate to Vercel/Netlify later if we ever need server routes, redirects, or preview deployments — not needed for v1 |
| Hosting (backend) | Supabase cloud | Free tier |
| Package manager | npm | Matches what's already installed |

**Why not Next.js:** Next.js's server features (API routes, SSR) would go unused on GitHub
Pages, which only serves static files. Plain Vite + React keeps the build simple and matches
what's actually being deployed. If we later move off GitHub Pages to something like Vercel, a
migration to Next.js is possible but not required — Supabase already covers the "backend"
need.

## How data flows

```
Customer/Admin browser (React app, static, served by GitHub Pages)
        │
        │  all data operations go through the Supabase JS client
        ▼
Supabase (hosted)
 ├─ Postgres database   (products, categories, orders, site_content, profiles)
 ├─ Auth                (signup/login, issues JWT, attaches role to session)
 ├─ Row Level Security  (enforces who can read/write what, per table)
 ├─ Storage             (product images, bucket per purpose)
 └─ Edge Function        (on new row in `orders` → calls Resend → emails admin)
```

**Example: customer places an order**
1. Customer adds products to cart (cart lives in React state / localStorage until checkout).
2. Customer clicks "Submit order" → React calls Supabase client to insert into `orders` +
   `order_items`.
3. RLS policy checks the customer is authenticated and only inserting their own order.
4. A Postgres trigger (or a scheduled Edge Function poll) fires the "new order" Edge Function.
5. Edge Function calls Resend's API to email the admin the order details.
6. Admin dashboard queries `orders` directly from Supabase (read access gated by RLS to
   admin roles only) — no separate notification system needed there.

**Example: privileged admin edits homepage heading text**
1. Admin logs in → Supabase Auth session includes their role (via a `profiles` table joined
   on login, checked by RLS).
2. Admin panel loads editable fields from the `site_content` table (key-value: e.g.
   `home_hero_title` → "Welcome to Petify").
3. Admin edits the value, saves → React calls Supabase client to update that row.
4. RLS policy only allows `role = 'privileged_admin'` to write to `site_content`.
5. Public site reads `site_content` on load and renders whatever's in the database — no
   redeploy needed for text changes.

## Data model (high level — exact schema defined during setup task)

- **profiles** — id (matches Supabase auth user), role (`customer` | `simple_admin` |
  `privileged_admin`), display_name
- **categories** — id, name, slug — editable by admins, not a fixed hardcoded list
- **products** — id, name (required), category_id, price (required), description (optional),
  stock_status (optional), care_instructions (optional), default_image flag
- **product_images** — id, product_id, image_url, sort_order (1 to 8 per product)
- **orders** — id, customer_id, status, created_at, total
- **order_items** — id, order_id, product_id, quantity, price_at_order_time
- **site_content** — key, value, page (for every editable text block sitewide)
- **social_links** — id, platform (instagram/facebook/youtube), url, caption, sort_order

## Folder structure

```
petify/
├── PRD.md
├── ARCHITECTURE.md
├── CLAUDE.md
├── TASKS.md
├── README.md
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── (static assets: favicon, etc.)
├── src/
│   ├── main.jsx                 # entry point
│   ├── App.jsx                  # routes
│   ├── lib/
│   │   └── supabaseClient.js    # single Supabase client instance
│   ├── pages/                   # one file per route
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── OrderHistory.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminContent.jsx      # privileged-only, edits site_content
│   │       └── AdminOrders.jsx
│   ├── components/              # reusable UI pieces (ProductCard, CartItem, etc.)
│   ├── context/
│   │   ├── AuthContext.jsx      # current user + role
│   │   └── CartContext.jsx
│   ├── hooks/                   # custom hooks (useProducts, useSiteContent, etc.)
│   └── styles/
├── supabase/
│   ├── migrations/               # SQL migration files, version controlled
│   └── functions/
│       └── notify-new-order/     # Edge Function source
└── .env.example                  # variable NAMES only, no values
```

## The 5 biggest decisions and why

1. **All site text lives in the database (`site_content` table), not hardcoded JSX strings.**
   This is what makes the site "fully manageable" by a non-technical privileged admin. Trade-off:
   more complex than hardcoding text, and requires a fallback/default value system so the site
   doesn't break if a key is missing.

2. **GitHub Pages for frontend hosting, Supabase for everything else.**
   No server we have to run or pay for. Trade-off: GitHub Pages can't hide secrets or run
   server code, so all access control must be enforced by Supabase Row Level Security, never
   trusted to the frontend alone.

3. **No online payment gateway in v1 — orders are "submitted," not "paid."**
   Matches the current WhatsApp/Instagram workflow and keeps v1 free to run. Adding a payment
   gateway later (Stripe, Razorpay, etc.) is a scoped addition, not a rebuild — orders table
   already models `status`, ready to extend.

4. **Two admin roles enforced via a `profiles.role` column + RLS, not separate apps.**
   One codebase, role-gated UI and database access. Simpler to build and extend than separate
   admin apps.

5. **Plain JavaScript + Vite instead of Next.js or TypeScript.**
   Matches current skill level and the static-hosting constraint. Both are easy upgrade paths
   later (Vite → TS is incremental, file-by-file) without a rewrite.

## Known constraints to keep in mind

- GitHub Pages serves static files only — nothing here should assume a Node server exists at
  runtime.
- Supabase free tier has usage limits (rows, storage, Edge Function invocations) — fine for
  v1 scale, worth checking before heavy usage.
- Because there's no payment gateway, order totals shown to admin should be treated as
  "customer's stated request," not a financial transaction record.
