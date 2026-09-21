-- categories table: admin-editable list of product categories (fish, bird,
-- squirrel, etc.). Never hardcode these in components — see CLAUDE.md.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

-- Anyone, including logged-out visitors, can browse categories — needed for
-- the public catalog/filter UI.
create policy "categories are viewable by everyone"
  on public.categories for select
  using (true);

-- Both admin tiers manage categories day-to-day (PRD.md: category management
-- is catalog work, not privileged-only content like site_content).
create policy "admins can insert categories"
  on public.categories for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );

create policy "admins can update categories"
  on public.categories for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );

create policy "admins can delete categories"
  on public.categories for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );
