# Petify

An online storefront for exotic pets (fish, birds, squirrels, and similar) — catalog, cart,
order submission, and a fully database-driven admin panel for managing every piece of content
without touching code.

See `PRD.md` for what/why, `ARCHITECTURE.md` for how it's built, `CLAUDE.md` for working rules,
and `TASKS.md` for current build progress.

## Prerequisites

- Node.js (LTS version) and npm
- A free [Supabase](https://supabase.com) account/project
- A GitHub account (for hosting via GitHub Pages)
- (Later) A [Resend](https://resend.com) account or similar, for order email notifications

## Install

```bash
git clone <this-repo-url>
cd petify
npm install
```

## Environment variables

Create a `.env` file in the project root (never commit this file — see `.env.example` for the
names only):

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project's public anon key |

Notes:
- The `anon` key is safe to expose in a frontend app *as long as Row Level Security policies
  are correctly set up* on every table — it does not bypass RLS.
- Never put the Supabase `service_role` key in this app. That key bypasses RLS entirely and
  must only ever be used inside Supabase Edge Functions, never in frontend code.
- The Resend (or similar) email API key also lives only inside the Supabase Edge Function
  environment, configured through the Supabase dashboard — not in this repo's `.env`.

## Run locally

```bash
npm run dev
```

Visit the local URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy (GitHub Pages)

1. Push the repo to GitHub.
2. Configure the repo's Pages settings to deploy from the `dist/` output (via GitHub Actions,
   or the `gh-pages` branch approach — exact steps to be finalized in Phase 0 of `TASKS.md`).
3. Once a custom domain is purchased, add it in the repo's Pages settings and update DNS
   records with your domain registrar.

## Database setup (Supabase)

1. Create a new Supabase project.
2. Apply the SQL migrations in `supabase/migrations/` (via Supabase CLI or the SQL editor in
   the dashboard) — these create all tables and RLS policies.
3. Manually create the first privileged admin account (see `TASKS.md`, Phase 2) — admin
   accounts are not self-service via the signup form.
4. Set up the `notify-new-order` Edge Function (in `supabase/functions/`) and configure its
   email API key as a Supabase secret, not in this repo.

## Project structure

See `ARCHITECTURE.md` for the full folder layout and reasoning behind each part.

## Handing this off

If someone else picks this project up:
1. Read `PRD.md`, `ARCHITECTURE.md`, and `CLAUDE.md` in that order.
2. Check `TASKS.md` for what's done and what's next.
3. Request access to the Supabase project and GitHub repo from the current owner.
