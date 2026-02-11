
import os
from supabase import create_client, Client

SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"

def test_url_gen():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        url = supabase.storage.from_('images').get_public_url('test_file.png')
        print(f"Generated URL: {url}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_url_gen()
