-- product_images table: up to 8 images per product, ordered by sort_order.
-- See ARCHITECTURE.md's data model ("1 to 8 per product").

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text not null,
  sort_order integer not null check (sort_order between 1 and 8),
  created_at timestamptz not null default now(),
  -- A product can't have two images claiming the same sort position.
  unique (product_id, sort_order)
);

-- Deleting a product should clean up its images (they're meaningless
-- without the product), unlike categories→products which are decoupled.
-- Note: this only removes the DB rows. The actual image files in Supabase
-- Storage are NOT deleted by this — that has to be handled in application
-- code (or a follow-up trigger) when we build image upload/delete. Flagging
-- this now so it isn't forgotten later.

alter table public.product_images enable row level security;

-- Anyone can view product images (product detail page, image gallery).
create policy "product images are viewable by everyone"
  on public.product_images for select
  using (true);

create policy "admins can insert product images"
  on public.product_images for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );

create policy "admins can update product images"
  on public.product_images for update
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

create policy "admins can delete product images"
  on public.product_images for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('simple_admin', 'privileged_admin')
    )
  );

-- Enforces "at most 8 images per product" at the database level (not just
-- sort_order 1-8, which alone wouldn't stop 8 rows all claiming, say,
-- sort_order values 1-8 correctly but then a 9th insert reusing an existing
-- number would just fail the unique constraint instead of giving a clear
-- reason). This trigger gives a clearer error and is a true count-based cap.
create function public.check_product_image_limit()
returns trigger
language plpgsql
as $$
begin
  if (
    select count(*) from public.product_images
    where product_id = new.product_id
  ) >= 8 then
    raise exception 'Products can have at most 8 images';
  end if;
  return new;
end;
$$;

create trigger enforce_product_image_limit
  before insert on public.product_images
  for each row execute function public.check_product_image_limit();
