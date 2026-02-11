
from supabase import create_client, Client

SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    # Try to select from 'settings' table
    res = supabase.table('settings').select("*").limit(1).execute()
    print("Table 'settings' exists.")
except Exception as e:
    print(f"Table 'settings' likely does not exist or error: {e}")
