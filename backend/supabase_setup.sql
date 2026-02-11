
-- Create Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    upi_id TEXT DEFAULT '',
    qr_image TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row if not exists
INSERT INTO public.settings (upi_id, qr_image)
SELECT '', ''
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- Enable Row Level Security (RLS) - Optional, but good practice
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create Policy to allow read/write access (public for now, or restrict as needed)
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Enable update access for all users" ON public.settings FOR UPDATE USING (true);
CREATE POLICY "Enable insert access for all users" ON public.settings FOR INSERT WITH CHECK (true);

-- STORAGE SETUP INSTRUCTIONS (Run these in Supabase SQL Editor OR Dashboard)
-- 1. Manually create a bucket named 'images' in Dashboard -> Storage
-- 2. Make it 'Public'
-- 3. Run the following to allow anyone to upload (for registrations/QR):

-- Allow public uploads to 'images' bucket
CREATE POLICY "Allow Public Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow public read access to 'images' bucket
CREATE POLICY "Allow Public Select" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow updates (for admins replacing QR)
CREATE POLICY "Allow Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
