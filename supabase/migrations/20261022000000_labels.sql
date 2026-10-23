-- Supabase schema for shared product labels. Run in Supabase SQL Editor.
-- Never use a service_role/secret key in the browser.

create table if not exists public.label_editor_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.label_editor_access enable row level security;
drop policy if exists "label editors can read own access row" on public.label_editor_access;
create policy "label editors can read own access row" on public.label_editor_access
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_label_editor_allowed()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.label_editor_access a where a.user_id = auth.uid()); $$;
revoke all on function public.is_label_editor_allowed() from public;
grant execute on function public.is_label_editor_allowed() to authenticated;

create table if not exists public.label_products (
  id uuid primary key,
  description text not null default '',
  code text not null default '',
  qty text not null default '1 PZ',
  location text not null default '',
  top_label text not null default 'SURTIDO',
  show_location boolean not null default true,
  image_path text,
  sort_order integer not null default 0,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists label_products_sort_order_idx on public.label_products(sort_order);
alter table public.label_products enable row level security;
drop policy if exists "authorized label editors can read products" on public.label_products;
create policy "authorized label editors can read products" on public.label_products for select to authenticated using (public.is_label_editor_allowed());
drop policy if exists "authorized label editors can insert products" on public.label_products;
create policy "authorized label editors can insert products" on public.label_products for insert to authenticated with check (public.is_label_editor_allowed());
drop policy if exists "authorized label editors can update products" on public.label_products;
create policy "authorized label editors can update products" on public.label_products for update to authenticated using (public.is_label_editor_allowed()) with check (public.is_label_editor_allowed());
drop policy if exists "authorized label editors can delete products" on public.label_products;
create policy "authorized label editors can delete products" on public.label_products for delete to authenticated using (public.is_label_editor_allowed());
grant select, insert, update, delete on public.label_products to authenticated;
grant select on public.label_editor_access to authenticated;

create or replace function public.set_label_product_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists set_label_product_updated_at on public.label_products;
create trigger set_label_product_updated_at before update on public.label_products for each row execute function public.set_label_product_updated_at();

insert into storage.buckets (id, name, public) values ('label-images', 'label-images', false)
on conflict (id) do update set public = false;
drop policy if exists "authorized editors can read label images" on storage.objects;
create policy "authorized editors can read label images" on storage.objects for select to authenticated using (bucket_id='label-images' and public.is_label_editor_allowed());
drop policy if exists "authorized editors can upload label images" on storage.objects;
create policy "authorized editors can upload label images" on storage.objects for insert to authenticated with check (bucket_id='label-images' and public.is_label_editor_allowed());
drop policy if exists "authorized editors can update label images" on storage.objects;
create policy "authorized editors can update label images" on storage.objects for update to authenticated using (bucket_id='label-images' and public.is_label_editor_allowed()) with check (bucket_id='label-images' and public.is_label_editor_allowed());
drop policy if exists "authorized editors can delete label images" on storage.objects;
create policy "authorized editors can delete label images" on storage.objects for delete to authenticated using (bucket_id='label-images' and public.is_label_editor_allowed());

do $$
begin
  if exists (select 1 from pg_publication where pubname='supabase_realtime')
     and not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='label_products') then
    execute 'alter publication supabase_realtime add table public.label_products';
  end if;
end;
$$;

-- 1) Register the first account in the editor, then confirm its email if required.
-- 2) Replace the placeholder email below and execute this statement in SQL Editor:
-- insert into public.label_editor_access (user_id,email,is_admin)
-- select id,email,true from auth.users where lower(email)=lower('TU_CORREO@DOMINIO.COM')
-- on conflict (user_id) do update set is_admin=true,email=excluded.email;
-- Add other permitted users the same way with is_admin=false.
