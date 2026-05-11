-- ============================================================
-- SamAira Creations — Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- Project: https://dosbamgdialhjkizhmex.supabase.co
-- ============================================================

-- -------------------------------------------------------
-- TABLES
-- -------------------------------------------------------

create table if not exists public.products (
  id           text primary key,
  name         text not null,
  sku          text unique not null,
  price        numeric(10,2) not null,
  original_price numeric(10,2),
  category     text not null,
  sub_category text,
  designs      text[] default '{}',
  age_groups   text[] default '{}',
  material     text not null,
  description  text not null,
  care_instructions text,
  images       text[] default '{}',
  is_organic   boolean default false,
  is_new       boolean default false,
  is_best_seller boolean default false,
  in_stock     boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table if not exists public.bundles (
  id              text primary key,
  name            text not null,
  description     text,
  product_ids     text[] default '{}',
  price           numeric(10,2) not null,
  original_price  numeric(10,2) not null,
  savings         numeric(10,2),
  is_featured     boolean default false,
  is_perfect_gift boolean default false,
  whatsapp_template text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.homepage_sections (
  id          text primary key,
  label       text not null,
  is_visible  boolean default true,
  order_index integer not null,
  updated_at  timestamptz default now()
);

create table if not exists public.media (
  id         uuid default gen_random_uuid() primary key,
  filename   text not null,
  url        text not null,
  size       integer,
  mime_type  text,
  created_at timestamptz default now()
);

-- -------------------------------------------------------
-- ROW LEVEL SECURITY
-- -------------------------------------------------------

alter table public.products enable row level security;
alter table public.bundles enable row level security;
alter table public.settings enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.media enable row level security;

-- Public read access for all tables
create policy "public_read_products" on public.products for select using (true);
create policy "public_read_bundles" on public.bundles for select using (true);
create policy "public_read_settings" on public.settings for select using (true);
create policy "public_read_homepage_sections" on public.homepage_sections for select using (true);
create policy "public_read_media" on public.media for select using (true);

-- Authenticated (admin) write access
create policy "admin_all_products" on public.products for all using (auth.role() = 'authenticated');
create policy "admin_all_bundles" on public.bundles for all using (auth.role() = 'authenticated');
create policy "admin_all_settings" on public.settings for all using (auth.role() = 'authenticated');
create policy "admin_all_homepage_sections" on public.homepage_sections for all using (auth.role() = 'authenticated');
create policy "admin_all_media" on public.media for all using (auth.role() = 'authenticated');

-- -------------------------------------------------------
-- SEED DATA — Products
-- -------------------------------------------------------

insert into public.products (id, name, sku, price, original_price, category, sub_category, designs, age_groups, material, description, care_instructions, images, is_organic, is_new, is_best_seller, in_stock) values

('ht-001', 'Muslin Hooded Towel - Strawberry', 'HT-MUS-STR', 21, null, 'hooded-towels', 'Muslin',
  ARRAY['Strawberry', 'Cloudy'],
  ARRAY['3-6-months', '6-12-months', '1-2-years', '2-3-years', '3-4-years'],
  '100% Organic Cotton Muslin',
  'Soft comfort for your newborn''s first days. Our hooded baby towel is made from soft quilted cotton, offering gentle care for delicate skin. Ideal for hospital essentials and everyday use. With its breathable fabric, hooded design for added head protection, and adjustable wrap belt for a secure fit, it keeps your baby warm and comfortable.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=600&fit=crop'],
  true, false, true, true),

('ht-002', 'Knitted Hooded Towel - Cloudy', 'HT-KNT-CLD', 24, null, 'hooded-towels', 'Knitted',
  ARRAY['Strawberry', 'Cloudy'],
  ARRAY['3-6-months', '6-12-months', '1-2-years'],
  '100% Organic Cotton Knit',
  'Cozy knitted hooded towel perfect for sensitive skin. Breathable fabric with adjustable wrap belt.',
  'Hand wash recommended',
  ARRAY['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop'],
  true, false, false, true),

('sw-001', 'Organic Muslin Swaddle - Giraffe', 'SW-MUS-GIR', 18, null, 'swaddles', null,
  ARRAY['Giraffe', 'Carrot', 'Duck', 'Watermelon', 'Car', 'Fruit'],
  ARRAY['0-3-months', '3-6-months'],
  'GOTS Certified Organic Cotton Muslin',
  'Our organic muslin swaddles are made from carefully selected organic cotton and produced to high environmental and quality standards. Lightweight and breathable, they support good air circulation, help prevent overheating, and keep your baby comfortably wrapped.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=600&fit=crop'],
  true, true, false, true),

('sw-002', 'Organic Muslin Swaddle - Carrot', 'SW-MUS-CAR', 18, null, 'swaddles', null,
  ARRAY['Giraffe', 'Carrot', 'Duck', 'Watermelon', 'Car', 'Fruit'],
  ARRAY['0-3-months', '3-6-months'],
  'GOTS Certified Organic Cotton Muslin',
  'Lightweight and breathable, they support good air circulation, help prevent overheating, and keep your baby comfortably wrapped.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=600&fit=crop'],
  true, false, false, true),

('sw-003', 'Organic Muslin Swaddle - Watermelon', 'SW-MUS-WML', 20, null, 'swaddles', null,
  ARRAY['Giraffe', 'Carrot', 'Duck', 'Watermelon', 'Car', 'Fruit'],
  ARRAY['0-3-months', '3-6-months'],
  'GOTS Certified Organic Cotton Muslin',
  'Perfect for keeping your baby comfortably wrapped in style.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=600&fit=crop'],
  true, false, false, true),

('bc-001', 'Soft Burp Cloth - Deer', 'BC-DER-001', 12, null, 'burp-cloths', null,
  ARRAY['Deer', 'Dino', 'Car', 'Penguin', 'Fruit', 'Panda'],
  ARRAY['0-3-months', '3-6-months', '6-12-months'],
  '100% Organic Cotton',
  'Soft, absorbent, and durable. Gentle on delicate baby skin. Made from breathable materials, they are ideal for quick clean-ups and daily use.',
  'Machine wash warm',
  ARRAY['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop'],
  true, false, true, true),

('bl-001', '2-Layer Muslin Blanket', 'BL-2LY-001', 26, null, 'blankets', '2-Layer',
  ARRAY[]::text[],
  ARRAY['0-3-months', '3-6-months', '6-12-months', '1-2-years', '2-3-years', '3-4-years'],
  '100% Organic Cotton Muslin',
  'Made from soft breathable muslin, these blankets provide gentle comfort while remaining lightweight and airy. Versatile for swaddling, cuddling, playtime, or travel use.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=600&fit=crop'],
  true, false, false, true),

('bl-002', '6-Layer Premium Muslin Blanket', 'BL-6LY-001', 42, null, 'blankets', '6-Layer',
  ARRAY[]::text[],
  ARRAY['0-3-months', '3-6-months', '6-12-months', '1-2-years'],
  '100% Organic Cotton Muslin',
  'Premium 6-layer muslin for maximum softness and warmth. Perfect for colder days.',
  'Machine wash cold, tumble dry low',
  ARRAY['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=600&fit=crop'],
  true, false, true, true),

('ns-001', 'Comfy Night Suit - Strawberry', 'NS-STR-001', 24, null, 'night-suits', null,
  ARRAY['Strawberry', 'Cloudy'],
  ARRAY['3-6-months', '6-12-months', '1-2-years', '2-3-years'],
  '100% Organic Cotton',
  'Comfortable sleepwear for day and night. Made from soft breathable fabric to keep your baby comfortable during both sleep and play.',
  'Machine wash warm',
  ARRAY['https://images.unsplash.com/photo-1522771930-22448d3c2f8a?w=600&h=600&fit=crop'],
  true, true, false, true),

('sh-001', 'Classic Cotton Shirt - Monkey', 'SH-MON-001', 22, null, 'shirts', null,
  ARRAY['Monkey', 'Blue', 'Palm Tree', 'Dino'],
  ARRAY['6-12-months', '1-2-years', '2-3-years', '3-4-years'],
  'Premium Organic Cotton',
  'Classic style with everyday comfort. Crafted from premium cotton and designed for breathable all-day wear.',
  'Machine wash cold',
  ARRAY['https://images.unsplash.com/photo-1438902919162-3f517001418f?w=600&h=600&fit=crop'],
  true, false, false, true),

('ks-001', 'Kimono Set - Green Giraffe', 'KS-GIR-001', 32, null, 'kimono-sets', null,
  ARRAY['Green Giraffe', 'Pink Cow', 'Yellow Dino', 'Heart'],
  ARRAY['3-6-months', '6-12-months', '1-2-years'],
  '100% Organic Cotton',
  'Comfortable and practical for everyday wear. The kimono-style top allows easy dressing while remaining soft and breathable for sensitive skin.',
  'Machine wash warm',
  ARRAY['https://images.unsplash.com/photo-1519457431-44bfd5eaa33f?w=600&h=600&fit=crop'],
  true, false, true, true),

('co-001', 'Crinkle Co-Ord Set - Dino', 'CO-DIN-001', 30, null, 'co-ord-sets', null,
  ARRAY['Dino', 'Heart', 'Pink Stripe', 'Blue Stripe'],
  ARRAY['6-12-months', '1-2-years', '2-3-years', '3-4-years'],
  'Breathable Crinkle Cotton',
  'Lightweight comfort with a relaxed summer style. Designed using breathable crinkle cotton to keep children cool and comfortable throughout the day.',
  'Machine wash cold',
  ARRAY['https://images.unsplash.com/photo-1515364389169-1b9e3d16e7ba?w=600&h=600&fit=crop'],
  true, true, false, true)

on conflict (id) do nothing;

-- -------------------------------------------------------
-- SEED DATA — Bundles
-- -------------------------------------------------------

insert into public.bundles (id, name, description, product_ids, price, original_price, savings, is_featured, is_perfect_gift, whatsapp_template) values

('bundle-001', 'Everyday Outfit Set', 'Affordable daily essentials bundle',
  ARRAY['ns-001', 'bc-001'], 30, 36, 6, false, false,
  'Hello SamAira Creations, I would like to order the Everyday Outfit Set (1 Night Suit + 1 Burp Cloth). Please share availability and next steps.'),

('bundle-002', 'Playtime Set', 'Daytime comfort and activity bundle',
  ARRAY['co-001', 'sw-001'], 42, 48, 6, true, false,
  'Hello SamAira Creations, I would like to order the Playtime Set (1 Co-Ord Set + 1 Swaddle). Please share availability and next steps.'),

('bundle-003', 'Gift Outfit Set', 'Premium gifting collection',
  ARRAY['ks-001', 'bl-001'], 48, 58, 10, false, true,
  'Hello SamAira Creations, I would like to order the Gift Outfit Set (1 Kimono Set + 1 Blanket). Please share availability and next steps.'),

('bundle-004', 'Premium Baby Wardrobe Set', 'Luxury complete wardrobe bundle',
  ARRAY['co-001', 'ns-001', 'sw-001', 'bc-001'], 72, 84, 12, true, true,
  'Hello SamAira Creations, I would like to order the Premium Baby Wardrobe Set. Please share availability and next steps.'),

('bundle-005', 'Newborn Starter Set', 'Hospital and newborn essentials',
  ARRAY['sw-001', 'bc-001'], 26, 30, 4, false, true,
  'Hello SamAira Creations, I would like to order the Newborn Starter Set. Please share availability and next steps.'),

('bundle-006', 'Bath Time Set', 'Bath and post-care essentials',
  ARRAY['ht-001', 'bc-001'], 30, 33, 3, false, false,
  'Hello SamAira Creations, I would like to order the Bath Time Set. Please share availability and next steps.'),

('bundle-007', 'Everyday Essentials Set', 'Best-value essentials collection',
  ARRAY['sw-001', 'bc-001', 'bl-001'], 47, 56, 9, true, false,
  'Hello SamAira Creations, I would like to order the Everyday Essentials Set. Please share availability and next steps.'),

('bundle-008', 'Comfort Set (Premium)', 'High-end luxury comfort bundle',
  ARRAY['ht-001', 'sw-001', 'bc-001', 'bl-002'], 72, 85, 13, true, true,
  'Hello SamAira Creations, I would like to order the Comfort Set (Premium). Please share availability and next steps.')

on conflict (id) do nothing;

-- -------------------------------------------------------
-- SEED DATA — Homepage Sections
-- -------------------------------------------------------

insert into public.homepage_sections (id, label, is_visible, order_index) values
('hero',          'Hero Section',            true, 1),
('categories',    'Featured Categories',     true, 2),
('bundles',       'Bundle Showcase',         true, 3),
('organic-story', 'Organic Cotton Story',    true, 4),
('best-sellers',  'Best Sellers',            true, 5),
('gallery',       'Instagram Gallery',       true, 6)
on conflict (id) do nothing;

-- -------------------------------------------------------
-- SEED DATA — Settings
-- -------------------------------------------------------

insert into public.settings (key, value) values
('whatsapp_config', '{"number": "4917632333257", "welcomeMessage": "Hello SamAira Creations, I am interested in..."}'::jsonb),
('store_info',      '{"name": "SamAira Creations", "email": "hello@samaira-creations.de", "freeShippingThreshold": 50}'::jsonb),
('hero_content',    '{"headline": "Gentle Luxury for Little Ones", "subheadline": "Discover our curated collection of premium organic cotton clothing, swaddles, and accessories — designed with love for your baby''s delicate skin.", "imageUrl": ""}'::jsonb)
on conflict (key) do nothing;

-- -------------------------------------------------------
-- STORAGE BUCKET (run separately if needed)
-- -------------------------------------------------------
-- In the Supabase Dashboard → Storage → New Bucket:
--   Name: product-images
--   Public: YES (toggle on)
--
-- Then add this storage policy in SQL Editor:
-- create policy "public_read_storage"
--   on storage.objects for select using (bucket_id = 'product-images');
-- create policy "admin_upload_storage"
--   on storage.objects for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
-- create policy "admin_delete_storage"
--   on storage.objects for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');
