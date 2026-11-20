-- Myths of the Veil: run once in Supabase -> SQL Editor -> New query -> Run.
create table if not exists public.keepers (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null unique check (char_length(name) between 2 and 24),
  world jsonb not null default '{}'::jsonb,
  team jsonb not null default '[]'::jsonb,
  score int not null default 0,
  dragons int not null default 0,
  top_level int not null default 0,
  arena int not null default 0,
  codex int not null default 0,
  ghost_wins int not null default 0,
  updated_at timestamptz not null default now(),
  constraint world_size check (pg_column_size(world) < 2000000)
);
alter table public.keepers enable row level security;
drop policy if exists "keepers are public" on public.keepers;
drop policy if exists "insert own keeper" on public.keepers;
drop policy if exists "update own keeper" on public.keepers;
drop policy if exists "delete own keeper" on public.keepers;
create policy "keepers are public" on public.keepers for select using (true);
create policy "insert own keeper" on public.keepers for insert to authenticated with check (auth.uid() = id);
create policy "update own keeper" on public.keepers for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "delete own keeper" on public.keepers for delete to authenticated using (auth.uid() = id);
create index if not exists keepers_score_idx on public.keepers (score desc);
