create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  service_id text not null,
  service_title text not null,
  travel_date date not null,
  people integer not null check (people > 0),
  nights integer not null default 1 check (nights > 0),
  duration_hours integer not null default 1 check (duration_hours > 0),
  add_on_ids text[] not null default '{}',
  customer_name text not null,
  customer_country text,
  customer_phone text not null,
  customer_email text,
  notes text,
  estimate integer not null default 0,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  source text not null default 'website',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);

alter table public.bookings enable row level security;

drop policy if exists "No public access to bookings" on public.bookings;
create policy "No public access to bookings"
on public.bookings
for all
to public
using (false)
with check (false);
