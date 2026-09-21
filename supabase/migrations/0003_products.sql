-- products table: the catalog itself. See ARCHITECTURE.md's data model and
-- PRD.md's product fields (name/price required, rest optional).

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references public.categories (id) on delete set null,
  price numeric(10, 2) not null check (price >= 0),
  description text,
  stock_status text,
  care_instructions text,
  default_image_url text,
  created_at timestamptz not null default now()
);

-- Deleting a category shouldn't delete or silently break products that
-- reference it — category_id just becomes null, and the product still shows
-- up (uncategorized) rather than vanishing. Admin UI should prompt to
-- reassign, but the schema itself stays safe either way.

alter table public.products enable row level security;

-- Anyone, including logged-out visitors, can browse the catalog.
create policy "products are viewable by everyone"
  on public.products for select
  using (true);

-- Both admin tiers manage products day-to-day (PRD.md: simple admin's job
-- description is exactly "edits product listings").
create policy "admins can insert products"
  on public.products for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );

create policy "admins can update products"
  on public.products for update
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

create policy "admins can delete products"
  on public.products for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );
