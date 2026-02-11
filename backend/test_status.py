
from supabase import create_client, Client

SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"

def check_all():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase")
        
        print("\n--- Storage ---")
        try:
            buckets = supabase.storage.list_buckets()
            print(f"Buckets found: {[b.name for b in buckets]}")
        except Exception as e:
            print(f"Error listing buckets: {e}")
            
        print("\n--- Settings Table ---")
        try:
            res = supabase.table('settings').select("*").execute()
            print(f"Settings data: {res.data}")
        except Exception as e:
            print(f"Error reading settings: {e}")
            
        print("\n--- Registrations Table ---")
        try:
            res = supabase.table('registrations').select("count", count='exact').limit(0).execute()
            print(f"Total registrations: {res.count}")
        except Exception as e:
            print(f"Error checking registrations: {e}")

    except Exception as e:
        print(f"General Error: {e}")

if __name__ == "__main__":
    check_all()
