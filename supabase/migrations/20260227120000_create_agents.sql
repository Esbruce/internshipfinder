-- Agents created by each user from the Agents page form.
create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  cv_url text,
  ideal_internship_description text,
  industry text,
  location text,
  work_type text check (work_type in ('on_site', 'remote', 'hybrid')),
  compensation_type text check (compensation_type in ('paid', 'unpaid')),
  prospect_rate_per_day int check (prospect_rate_per_day in (10, 20, 50)),
  auto_outreach_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agents_user_id_idx on public.agents (user_id);
create index if not exists agents_created_at_idx on public.agents (created_at desc);

alter table public.agents enable row level security;

drop policy if exists "Users can view own agents" on public.agents;
create policy "Users can view own agents"
  on public.agents for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own agents" on public.agents;
create policy "Users can insert own agents"
  on public.agents for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own agents" on public.agents;
create policy "Users can update own agents"
  on public.agents for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own agents" on public.agents;
create policy "Users can delete own agents"
  on public.agents for delete
  using (auth.uid() = user_id);
