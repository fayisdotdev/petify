-- profiles table: one row per user, holds their role. Every "is this person
-- an admin" check anywhere in the app (RLS policies, UI gating) reads this
-- table. See ARCHITECTURE.md's data model and PRD.md's two admin tiers.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'customer'
    check (role in ('customer', 'simple_admin', 'privileged_admin')),
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Auto-create a profile row whenever someone signs up via Supabase Auth, so
-- the app never has to remember a separate "create profile" step after
-- signup. New rows always start as 'customer' — nobody can grant themselves
-- admin by signing up; that only happens by a privileged admin manually
-- updating the role (see TASKS.md Phase 2: "no self-signup for admins").
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS policies
--
-- Everyone (including logged-out visitors) can read profiles. This is
-- deliberately permissive: role and display_name aren't sensitive, and
-- several parts of the app (e.g. showing an admin's display name) are
-- simpler if profile reads don't require auth. Reconsider if profiles ever
-- gain sensitive columns.
create policy "profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- A user can update their own display_name — but NOT their own role.
-- (Role changes are handled by a separate, more restrictive policy below.)
-- This policy alone would technically let a user set their own role via a
-- crafted update, since column-level restriction isn't expressed here — the
-- role-change policy below closes that gap by requiring the new role to
-- match the old one unless the actor is already a privileged_admin.
create policy "users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and (
      role = (select role from public.profiles where id = auth.uid())
      or exists (
        select 1 from public.profiles
        where id = auth.uid() and role = 'privileged_admin'
      )
    )
  );

-- Only a privileged_admin can change *someone else's* role (promote/demote
-- simple admins, per PRD.md). This is a separate policy so it can target any
-- row, not just the user's own.
create policy "privileged admins can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'privileged_admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'privileged_admin'
    )
  );

-- No insert policy: rows are only ever created by the handle_new_user
-- trigger (which runs as security definer, bypassing RLS), never directly
-- by client code. No delete policy: profiles are never deleted from the
-- client; deleting the auth.users row cascades automatically.
