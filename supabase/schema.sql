-- INVENTECH S.A.S. — Esquema Supabase (PostgreSQL)
-- Ejecutar en el SQL Editor del proyecto Supabase del usuario.
-- Ver docs/architecture.md y docs/security.md para el diseño y las políticas.

-- =========================================================================
-- Extensiones
-- =========================================================================
create extension if not exists "pgcrypto";

-- =========================================================================
-- profiles — se crea automáticamente al registrarse (trigger sobre auth.users)
-- =========================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- categories
-- =========================================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (created_by, name)
);

alter table public.categories enable row level security;

create policy "El dueño gestiona sus categorías"
  on public.categories for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- =========================================================================
-- products
-- =========================================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text,
  description text,
  category_id uuid references public.categories (id) on delete set null,
  cost_price numeric(12, 2) not null default 0 check (cost_price >= 0),
  sale_price numeric(12, 2) not null default 0 check (sale_price >= 0),
  track_inventory boolean not null default true,
  stock numeric(12, 2) not null default 0 check (stock >= 0),
  min_stock numeric(12, 2) not null default 0 check (min_stock >= 0),
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint cost_not_greater_than_sale check (sale_price = 0 or cost_price <= sale_price)
);

create index if not exists products_created_by_idx on public.products (created_by);
create unique index if not exists products_owner_sku_idx on public.products (created_by, sku) where sku is not null;

alter table public.products enable row level security;

create policy "El dueño gestiona sus productos"
  on public.products for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- =========================================================================
-- inventory_movements
-- =========================================================================
create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  type text not null check (type in ('in', 'out', 'adjustment')),
  quantity numeric(12, 2) not null check (quantity >= 0),
  stock_after numeric(12, 2) not null,
  source text not null check (source in ('manual', 'pos_sale', 'scanner')),
  notes text,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists inventory_movements_product_idx on public.inventory_movements (product_id);

alter table public.inventory_movements enable row level security;

create policy "El dueño ve y crea sus movimientos"
  on public.inventory_movements for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- =========================================================================
-- sales / sale_items
-- =========================================================================
create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  transaction_number text not null unique,
  total numeric(12, 2) not null default 0 check (total >= 0),
  payment_method text not null,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales (id) on delete cascade,
  product_id uuid not null references public.products (id),
  product_name text not null,
  quantity numeric(12, 2) not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  subtotal numeric(12, 2) not null check (subtotal >= 0)
);

alter table public.sales enable row level security;
alter table public.sale_items enable row level security;

create policy "El dueño ve y crea sus ventas"
  on public.sales for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy "El dueño ve los ítems de sus ventas"
  on public.sale_items for select
  using (exists (select 1 from public.sales s where s.id = sale_id and s.created_by = auth.uid()));

-- sale_items solo se inserta desde la función create_sale (security definer),
-- nunca directamente desde el cliente.

-- =========================================================================
-- documents / document_categories (normatividad)
-- =========================================================================
create table if not exists public.document_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  url text not null,
  published_at timestamptz not null default now()
);

alter table public.document_categories enable row level security;
alter table public.documents enable row level security;

create policy "Cualquier usuario autenticado lee categorías de documentos"
  on public.document_categories for select
  using (auth.role() = 'authenticated');

create policy "Cualquier usuario autenticado lee documentos"
  on public.documents for select
  using (auth.role() = 'authenticated');

-- La escritura de documentos/normatividad se hace desde el panel de
-- administración de Supabase (rol admin), no desde el frontend público.

-- =========================================================================
-- scanner_events
-- =========================================================================
create table if not exists public.scanner_events (
  id uuid primary key default gen_random_uuid(),
  barcode text not null,
  source text not null check (source in ('manual', 'keyboard-scanner')),
  resolved_product_id uuid references public.products (id),
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.scanner_events enable row level security;

create policy "El dueño ve y crea sus eventos de escaneo"
  on public.scanner_events for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- =========================================================================
-- Función: register_inventory_movement (atómica)
-- =========================================================================
create or replace function public.register_inventory_movement(
  p_product_id uuid,
  p_type text,
  p_quantity numeric,
  p_source text,
  p_notes text
)
returns public.inventory_movements
language plpgsql
security definer set search_path = public
as $$
declare
  v_current_stock numeric;
  v_stock_after numeric;
  v_movement public.inventory_movements;
begin
  select stock into v_current_stock
  from public.products
  where id = p_product_id and created_by = auth.uid()
  for update;

  if not found then
    raise exception 'Producto no encontrado o sin permisos.';
  end if;

  if p_type = 'in' then
    v_stock_after := v_current_stock + p_quantity;
  elsif p_type = 'out' then
    v_stock_after := v_current_stock - p_quantity;
  else
    v_stock_after := p_quantity;
  end if;

  if v_stock_after < 0 then
    raise exception 'El movimiento dejaría el stock en un valor negativo.';
  end if;

  update public.products set stock = v_stock_after where id = p_product_id;

  insert into public.inventory_movements (product_id, type, quantity, stock_after, source, notes, created_by)
  values (p_product_id, p_type, p_quantity, v_stock_after, p_source, p_notes, auth.uid())
  returning * into v_movement;

  return v_movement;
end;
$$;

-- =========================================================================
-- Función: create_sale (atómica — venta + ítems + descuento de stock)
-- =========================================================================
create or replace function public.create_sale(
  p_items jsonb,
  p_payment_method text
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_sale public.sales;
  v_item jsonb;
  v_product public.products;
  v_total numeric := 0;
  v_transaction_number text;
  v_items_result jsonb := '[]'::jsonb;
  v_sale_item public.sale_items;
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'La venta debe tener al menos un producto.';
  end if;

  v_transaction_number := 'INV-' || to_char(now(), 'YYYYMMDD-HH24MISS') || '-' || substr(gen_random_uuid()::text, 1, 4);

  insert into public.sales (transaction_number, total, payment_method, created_by)
  values (v_transaction_number, 0, p_payment_method, auth.uid())
  returning * into v_sale;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select * into v_product
    from public.products
    where id = (v_item ->> 'product_id')::uuid and created_by = auth.uid()
    for update;

    if not found then
      raise exception 'Producto % no encontrado o sin permisos.', v_item ->> 'product_id';
    end if;

    if v_product.track_inventory and v_product.stock < (v_item ->> 'quantity')::numeric then
      raise exception 'Stock insuficiente para %.', v_product.name;
    end if;

    if v_product.track_inventory then
      update public.products
      set stock = stock - (v_item ->> 'quantity')::numeric
      where id = v_product.id;

      insert into public.inventory_movements (product_id, type, quantity, stock_after, source, notes, created_by)
      values (
        v_product.id,
        'out',
        (v_item ->> 'quantity')::numeric,
        v_product.stock - (v_item ->> 'quantity')::numeric,
        'pos_sale',
        'Venta ' || v_transaction_number,
        auth.uid()
      );
    end if;

    insert into public.sale_items (sale_id, product_id, product_name, quantity, unit_price, subtotal)
    values (
      v_sale.id,
      v_product.id,
      v_product.name,
      (v_item ->> 'quantity')::numeric,
      (v_item ->> 'unit_price')::numeric,
      (v_item ->> 'quantity')::numeric * (v_item ->> 'unit_price')::numeric
    )
    returning * into v_sale_item;

    v_total := v_total + v_sale_item.subtotal;
    v_items_result := v_items_result || to_jsonb(v_sale_item);
  end loop;

  update public.sales set total = v_total where id = v_sale.id;
  v_sale.total := v_total;

  return jsonb_build_object('sale', to_jsonb(v_sale), 'items', v_items_result);
end;
$$;

-- =========================================================================
-- Datos semilla de ejemplo (medios de pago sugeridos para la UI del POS)
-- Nota: no se modela como tabla porque no requiere administración dinámica
-- en este prototipo; se mantiene como constante en el frontend
-- (core/data/payment-methods.data.ts) para evitar una tabla innecesaria.
-- =========================================================================
