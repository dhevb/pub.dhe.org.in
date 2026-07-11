import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "./config";

let serviceClient: SupabaseClient | null = null;

/** Server-side Supabase client with service role — never expose to browser. */
export function getSupabaseServiceClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!serviceClient) {
    serviceClient = createClient(
      getSupabaseUrl(),
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }

  return serviceClient;
}

/** Browser-safe anon client for client components when needed. */
export function createSupabaseBrowserClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createClient(url, key);
}
