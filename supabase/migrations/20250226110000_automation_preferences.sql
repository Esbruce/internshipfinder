-- Automation preferences: search frequency, email digest, auto-apply, max applications per day, notify new matches
create table if not exists public.automation_preferences (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade unique,
  search_frequency text not null default 'daily' check (search_frequency in ('hourly', 'daily', 'weekly')),
  email_digest boolean not null default true,
  auto_apply_enabled boolean not null default false,
  max_applications_per_day integer not null default 5 check (max_applications_per_day >= 0),
  notify_new_matches boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.automation_preferences enable row level security;

create policy "Users can view own automation preferences"
  on public.automation_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own automation preferences"
  on public.automation_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert own automation preferences"
  on public.automation_preferences for insert
  with check (auth.uid() = user_id);

create index if not exists automation_preferences_user_id_idx on public.automation_preferences (user_id);
