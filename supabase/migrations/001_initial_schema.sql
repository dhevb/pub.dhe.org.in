-- Viksit Bharat Journal - Supabase initial schema (v1.1)

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'author',
  institution text,
  area_of_study text,
  orcid text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.manuscripts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  journal_id text not null,
  title text not null,
  status text not null default 'submitted',
  abstract text,
  file_path text,
  metadata jsonb default '{}',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists manuscripts_user_id_idx on public.manuscripts(user_id);
create index if not exists manuscripts_status_idx on public.manuscripts(status);

create table if not exists public.status_history (
  id uuid primary key default gen_random_uuid(),
  manuscript_id uuid not null references public.manuscripts(id) on delete cascade,
  status text not null,
  changed_by uuid references public.profiles(id),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.review_assignments (
  id uuid primary key default gen_random_uuid(),
  manuscript_id uuid not null references public.manuscripts(id) on delete cascade,
  reviewer_id uuid references public.profiles(id),
  reviewer_email text not null,
  status text not null default 'invited',
  recommendation text,
  report text,
  due_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.editorial_notes (
  id uuid primary key default gen_random_uuid(),
  manuscript_id uuid not null references public.manuscripts(id) on delete cascade,
  author_id uuid references public.profiles(id),
  body text not null,
  visibility text not null default 'editor',
  created_at timestamptz not null default now()
);

create table if not exists public.article_metrics (
  id uuid primary key default gen_random_uuid(),
  article_path text not null,
  metric_type text not null check (metric_type in ('view', 'download')),
  count bigint not null default 0,
  updated_at timestamptz not null default now(),
  unique (article_path, metric_type)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  actor_id uuid,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

create table if not exists public.doi_registrations (
  id uuid primary key default gen_random_uuid(),
  manuscript_id uuid references public.manuscripts(id),
  doi text,
  status text not null default 'pending',
  crossref_response jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.manuscripts enable row level security;
alter table public.review_assignments enable row level security;
alter table public.editorial_notes enable row level security;
alter table public.status_history enable row level security;

do $$ begin
  create policy "Authors read own manuscripts" on public.manuscripts
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Authors insert own manuscripts" on public.manuscripts
    for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Editors read all manuscripts" on public.manuscripts
    for select using (
      exists (
        select 1 from public.profiles
        where id = auth.uid() and role in ('editor', 'admin', 'reviewer')
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Profiles read own" on public.profiles
    for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Profiles update own" on public.profiles
    for update using (auth.uid() = id);
exception when duplicate_object then null; end $$;
