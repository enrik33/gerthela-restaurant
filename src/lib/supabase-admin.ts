import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export function isAuthorized(authHeader: string | null): boolean {
  if (!authHeader?.startsWith('Bearer ')) return false;
  return authHeader.slice(7) === process.env.ADMIN_PASSWORD;
}
