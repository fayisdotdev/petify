# CLAUDE.md — How to work on Petify

Read this file at the start of every task. Also read `TASKS.md` to find what to work on next,
and `ARCHITECTURE.md`/`PRD.md` if you need context on why something is built the way it is.

## Who's building this

The owner is a BCA graduate, comfortable with basic programming logic, previously worked with
Flutter (about a year ago, mostly AI-assisted), currently focused on hardware. Not a full-time
developer. Explanations should be clear and not assume deep framework knowledge — explain *why*
before diving into *how*, and avoid unexplained jargon.

## Commands

```bash
npm install              # install dependencies
npm run dev               # start local dev server
npm run build              # production build (outputs to dist/)
npm run preview            # preview the production build locally
```

(Supabase CLI commands will be added here once the Supabase project is initialized — see
TASKS.md.)

## Coding rules

- **JavaScript, not TypeScript**, for v1 (see ARCHITECTURE.md for why).
- **No hardcoded site text** in components where a `site_content` entry should exist instead —
  if you're tempted to write `<h1>Welcome to Petify</h1>` directly, check whether that heading
  belongs in `site_content` first (see ARCHITECTURE.md's data model).
- **One component, one file.** Keep components small and named for what they render.
- **All Supabase calls go through `src/lib/supabaseClient.js`** — never create a second client
  instance elsewhere.
- **Never trust the frontend for access control.** Any "only admins can do X" rule must be
  enforced by a Supabase Row Level Security policy, not just hidden UI. Hidden buttons are a
  UX nicety, not security.
- **Every new table needs an RLS policy before it's used**, even during development.
- **Comment the "why," not the "what"**, especially around Supabase queries and RLS-dependent
  logic — this codebase will be read and extended without a developer nearby.
- Keep components accessible: real `<button>`/`<a>` tags, alt text on images, labeled form
  inputs.

## Never do this

- Never commit `.env` or any file containing real Supabase keys/secrets. Only `.env.example`
  with variable names is committed.
- Never put a secret API key (Resend, etc.) in frontend code — those belong in Supabase Edge
  Functions only, since anything in the React app is publicly visible once deployed.
- Never assume a Node server is running in production — this deploys as static files to
  GitHub Pages. Don't write code that requires a persistent server process.
- Never hardcode category values (fish/bird/squirrel/etc.) in components — categories are
  admin-editable and must be fetched from the database.
- Never skip updating `TASKS.md` after finishing a task — mark it done, add follow-ups if the
  work uncovered new ones.
- Never introduce a second UI library or CSS framework without discussing it first — stick to
  plain CSS/CSS Modules per ARCHITECTURE.md unless that file is updated.
- Never make a schema change directly in the Supabase dashboard without also saving it as a
  migration file in `supabase/migrations/` — otherwise the change isn't reproducible.

## Step-by-step workflow for a new task

1. Read `TASKS.md`, pick the next unchecked item (top to bottom, unless the user says
   otherwise).
2. If the task is unclear or touches a decision not covered in `ARCHITECTURE.md`, ask before
   writing code.
3. Make the change, keeping it scoped to that one task — don't drift into unrelated
   improvements (note them in TASKS.md as new items instead).
4. Test it locally (`npm run dev`) — for anything touching Supabase, confirm the RLS policy
   behaves as expected (try it as a customer, as a simple admin, as a privileged admin, or as
   logged out, whichever applies).
5. Mark the task done in `TASKS.md`. Add any new follow-up tasks it revealed.
6. Summarize what changed in plain language, since the owner may not read the diff line by
   line.

## When in doubt

Prefer the simpler option that matches what's already in `ARCHITECTURE.md`. If a task seems to
require a new architectural decision (new library, new hosting piece, new data pattern), flag
it and propose an update to `ARCHITECTURE.md` rather than silently deciding.
