-- Run in Supabase SQL Editor (Dashboard → SQL) if you are not using the Supabase CLI.

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  constraint favorites_user_product_unique unique (user_id, product_id)
);

create index if not exists favorites_user_id_idx on public.favorites (user_id);

alter table public.favorites enable row level security;

drop policy if exists "Users read own favorites" on public.favorites;
create policy "Users read own favorites"
  on public.favorites
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users insert own favorites" on public.favorites;
create policy "Users insert own favorites"
  on public.favorites
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users delete own favorites" on public.favorites;
create policy "Users delete own favorites"
  on public.favorites
  for delete
  using (auth.uid() = user_id);
