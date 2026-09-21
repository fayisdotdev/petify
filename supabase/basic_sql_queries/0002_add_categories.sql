select set_config('request.jwt.claims', json_build_object('sub', '<user-id>', 'role', 'authenticated')::text, true);
set role authenticated;

-- now run the actual test query, e.g.:
insert into public.categories (name, slug) values ('Fish', 'fish');