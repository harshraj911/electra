
from supabase import create_client, Client

SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"

def create_bucket():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Attempting to create 'images' bucket...")
        res = supabase.storage.create_bucket('images', options={'public': True})
        print("Result:", res)
    except Exception as e:
        print(f"Error creating bucket: {e}")

if __name__ == "__main__":
    create_bucket()
