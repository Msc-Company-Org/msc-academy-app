import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase ADMIN (service_role) — SOMENTE server-side.
 * Bypassa RLS → o CRM lê leads/purchases. NUNCA importar em componente client.
 */
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
