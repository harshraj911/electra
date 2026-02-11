
from supabase import create_client, Client

SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    print("Checking tables...")
    # Try to select from a non-existent table to see error or list tables if possible (Supabase client doesn't have a direct 'list tables' without admin api usually, but we can try to query 'registrations')
    try:
        res = supabase.table('registrations').select("*").limit(1).execute()
        print("Table 'registrations' exists and is accessible.")
    except Exception as e:
        print(f"Error accessing 'registrations': {e}")

    print("\nChecking buckets...")
    try:
        res = supabase.storage.list_buckets()
        print("Buckets:", res)
    except Exception as e:
        print(f"Error accessing buckets: {e}")

except Exception as e:
    print(f"Connection failed: {e}")
