-- Internship preferences: CV, location, industry, ideal internship description
create table if not exists public.internship_preferences (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade unique,
  cv_url text,
  location text,
  industry text,
  ideal_internship_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.internship_preferences enable row level security;

create policy "Users can view own internship preferences"
  on public.internship_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own internship preferences"
  on public.internship_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert own internship preferences"
  on public.internship_preferences for insert
  with check (auth.uid() = user_id);

create index if not exists internship_preferences_user_id_idx on public.internship_preferences (user_id);
