import { createClient } from "@supabase/supabase-js";

/**
 * Read-only client for public website content.
 *
 * Public pages must not depend on (or attempt to decode) portal auth cookies.
 * Row-level security remains enforced by Supabase using the publishable key.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
