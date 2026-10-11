create table if not exists public.pain_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date timestamptz not null default now(),
  location text not null,
  severity text not null check (severity in ('Low', 'Moderate', 'High')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.recovery_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date timestamptz not null,
  sleep text not null,
  hydration text not null,
  mood text not null check (mood in ('Excellent', 'Good', 'Okay', 'Tired')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists pain_entries_user_date_idx on public.pain_entries(user_id, date desc);
create index if not exists recovery_entries_user_date_idx on public.recovery_entries(user_id, date desc);

alter table public.pain_entries enable row level security;
alter table public.recovery_entries enable row level security;

drop policy if exists "Users can read their pain entries" on public.pain_entries;
drop policy if exists "Users can create their pain entries" on public.pain_entries;
drop policy if exists "Users can update their pain entries" on public.pain_entries;
drop policy if exists "Users can delete their pain entries" on public.pain_entries;
drop policy if exists "Users can read their recovery entries" on public.recovery_entries;
drop policy if exists "Users can create their recovery entries" on public.recovery_entries;
drop policy if exists "Users can update their recovery entries" on public.recovery_entries;
drop policy if exists "Users can delete their recovery entries" on public.recovery_entries;

create policy "Users can read their pain entries" on public.pain_entries for select using ((select auth.uid()) = user_id);
create policy "Users can create their pain entries" on public.pain_entries for insert with check ((select auth.uid()) = user_id);
create policy "Users can update their pain entries" on public.pain_entries for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete their pain entries" on public.pain_entries for delete using ((select auth.uid()) = user_id);

create policy "Users can read their recovery entries" on public.recovery_entries for select using ((select auth.uid()) = user_id);
create policy "Users can create their recovery entries" on public.recovery_entries for insert with check ((select auth.uid()) = user_id);
create policy "Users can update their recovery entries" on public.recovery_entries for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete their recovery entries" on public.recovery_entries for delete using ((select auth.uid()) = user_id);
