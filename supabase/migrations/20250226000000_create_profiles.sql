-- Create profiles table for account page (run in Supabase Dashboard → SQL Editor)
-- Matches app/account/account-form.tsx: full_name, username, website, avatar_url

create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  full_name text,
  username text,
  website text,
  avatar_url text,
  updated_at timestamptz default now()
);

-- RLS: users can read/update their own row
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Optional: auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, username, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'username',
    now()
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
