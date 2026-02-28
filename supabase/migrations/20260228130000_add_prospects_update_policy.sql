-- Allow authenticated users to update only their own prospects rows.
alter table public.prospects enable row level security;

drop policy if exists "Users can update own prospects" on public.prospects;
create policy "Users can update own prospects"
  on public.prospects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
