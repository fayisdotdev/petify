# TASKS.md — Petify build order

Work top to bottom. Each item should be small enough to finish in one chat/session. Check items
off as you go (`- [x]`). Add new items at the bottom of the relevant section if something new
comes up — don't renumber, just append.

## Phase 0 — Project setup

- [x] Create GitHub repo `petify`, add PRD.md, ARCHITECTURE.md, CLAUDE.md, TASKS.md, README.md
- [x] Scaffold Vite + React app (`npm create vite@latest`), confirm `npm run dev` works
- [x] Create Supabase project, note project URL + anon key (do not commit them)
- [x] Add `.env.example` with variable names only, add `.env` to `.gitignore`
- [x] Set up `src/lib/supabaseClient.js`
- [x] Set up basic routing shell in `App.jsx` with placeholder pages (Home, Catalog, Cart,
      Login, Signup, Admin)
- [ ] Confirm a basic build deploys successfully to GitHub Pages (even just "Hello Petify")

## Phase 1 — Database schema

- [ ] Write migration: `profiles` table (id, role, display_name) + RLS policies
- [ ] Write migration: `categories` table + RLS (public read, admin write)
- [ ] Write migration: `products` table + RLS (public read, admin write)
- [ ] Write migration: `product_images` table + RLS
- [ ] Write migration: `site_content` table + RLS (public read, privileged-admin write)
- [ ] Write migration: `social_links` table + RLS (public read, admin write)
- [ ] Write migration: `orders` + `order_items` tables + RLS (customers see only their own;
      admins see all)
- [ ] Seed a handful of test categories and products for development

## Phase 2 — Auth & accounts

- [ ] Build Signup page (customer accounts)
- [ ] Build Login page
- [ ] Build AuthContext (current user, role, loading state)
- [ ] Route protection: redirect logged-out users away from account-only pages
- [ ] Route protection: redirect non-admins away from `/admin/*`
- [ ] Manual process/notes for creating the first privileged admin (no self-signup for admins)

## Phase 3 — Product catalog (public)

- [ ] Build Catalog page: list all products, filter by category
- [ ] Build ProductCard component (image, name, price, quick add-to-cart)
- [ ] Build ProductDetail page (full description, care instructions, image gallery up to 8,
      stock status)
- [ ] Handle optional fields gracefully (missing image → default image, missing description →
      fallback text, etc.)
- [ ] Basic search/filter by name or category

## Phase 4 — Cart & orders

- [ ] Build CartContext (add/remove/update quantity, persisted to localStorage)
- [ ] Build Cart page (review items, quantities, total)
- [ ] Build "Submit order" flow (requires login) → writes to `orders` + `order_items`
- [ ] Build OrderHistory page for logged-in customers
- [ ] Build Supabase Edge Function: on new order, email admin via Resend
- [ ] Test the full flow end-to-end as a real customer account

## Phase 5 — Admin panel

- [ ] Build AdminDashboard shell (role-gated, shows nav based on simple vs privileged)
- [ ] Build AdminProducts (create/edit/delete products, upload up to 8 images, set stock
      status)
- [ ] Build AdminOrders (view submitted orders, see customer + items + total)
- [ ] Build AdminContent (privileged-only: edit any `site_content` key/value used across the
      site)
- [ ] Build admin management screen (privileged-only: promote/demote simple admins)
- [ ] Build category management (add/edit/remove categories)

## Phase 6 — Social media showcase

- [ ] Build AdminSocialLinks (privileged/simple admin adds/edits/removes links per platform)
- [ ] Build public-facing social showcase section/page displaying those links (Instagram,
      Facebook, YouTube)

## Phase 7 — Polish & pre-launch

- [ ] Responsive check on mobile widths (given a future mobile app, keep layouts adaptable)
- [ ] Fallback/empty states for empty cart, empty catalog, missing images
- [ ] Basic SEO: page titles, meta descriptions (pulled from `site_content` where relevant)
- [ ] Error handling for failed Supabase calls (network errors, RLS denials) shown clearly to
      the user
- [ ] Final RLS audit: manually test as customer, simple admin, privileged admin, logged-out
- [ ] Write real README.md install/deploy steps once stack is finalized
- [ ] Buy domain, point it at GitHub Pages (or migrate host if needed)

## Backlog (not v1, don't start unless asked)

- [ ] Online payment gateway
- [ ] WhatsApp order notifications
- [ ] Live-synced social media feeds (API-based instead of manual links)
- [ ] Native mobile app
- [ ] Reviews/ratings, favorites/wishlist
- [ ] Sub-categories
