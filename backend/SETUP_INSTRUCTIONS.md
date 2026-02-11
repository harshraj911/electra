
# Supabase Setup Instructions for Persistent Data

To fix the reset issue (settings and images disappearing), you must configure your Supabase project to store these permanently.

## 1. Run SQL to Create Settings Table

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Go to the **SQL Editor** (likely one of the icons on the left sidebar).
3.  Click "New Query".
4.  Copy and paste the contents of `backend/supabase_setup.sql`.
5.  Click **Run**.
    -   This creates a `settings` table to store UPI ID and QR Code URL permanently.

## 2. Create Storage Bucket for Images

The app needs a place to store uploaded QR codes and Payment Screenshots.

1.  In Supabase Dashboard, go to **Storage** (icon on left).
2.  Click **New Bucket**.
3.  Name the bucket: `images` (must be exact).
4.  **IMPORTANT**: Toggle "Public bucket" to **ON**.
5.  Click **Create Bucket**.
6.  (Optional) If you face upload errors, check **Policies** within the Storage page:
    -   Click "Policies" under Configuration.
    -   Under `images` bucket, click "New Policy".
    -   Select "For full customization".
    -   Name: `Allow public uploads`
    -   Allowed operations: `INSERT`, `SELECT`, `UPDATE`
    -   Target roles: `anon` (public) or checks for authenticated users.
    -   Click "Review" and "Save".

## 3. Restart Your Backend

Once these steps are done, restart your backend server so it picks up the changes.
-   If running locally: Stop (Ctrl+C) and run `python app.py`.
-   If deployed (e.g. Render): Redeploy or Restart Service.

Your UPI ID, QR Code, and Payment Screenshots should now persist across reloads!
