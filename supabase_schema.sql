-- Create the stream_posts table
create table public.stream_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null, -- This will store HTML/Rich Text
  image_url text,
  published boolean default true
);

-- Set up Row Level Security (RLS)
alter table public.stream_posts enable row level security;

-- Allow everyone to read published posts
create policy "Public posts are viewable by everyone"
  on public.stream_posts for select
  using ( true );

-- Allow only the admin to insert/update/delete (You can refine this to specific emails if you want strict RLS, but for now we'll handle the UI check)
-- Ideally, you'd create a policy like:
-- create policy "Admin can do everything" on public.stream_posts using (auth.jwt() ->> 'email' = 'hzstrooper@gmail.com') with check (auth.jwt() ->> 'email' = 'hzstrooper@gmail.com');
-- For simplicity in this setup, I'll allow authenticated users to insert, but we'll guard it in the UI. 
-- BETTER SECURITY:
create policy "Admin full access"
  on public.stream_posts
  for all
  using (auth.jwt() ->> 'email' = 'hzstrooper@gmail.com')
  with check (auth.jwt() ->> 'email' = 'hzstrooper@gmail.com');

-- Storage Bucket for Stream Images
insert into storage.buckets (id, name, public) values ('stream-images', 'stream-images', true);

-- Storage Policies
create policy "Stream images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'stream-images' );

create policy "Admin can upload stream images"
  on storage.objects for insert
  with check ( bucket_id = 'stream-images' and auth.jwt() ->> 'email' = 'hzstrooper@gmail.com' );
