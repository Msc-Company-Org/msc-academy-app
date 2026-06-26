import 'server-only';

/**
 * Inserção de lead no Supabase (mesma tabela `leads` do funil).
 * Usa a chave PUBLICÁVEL (anon) — RLS tem policy só de INSERT. Não precisa de service_role.
 * É assim que o gate do blog grava o lead sem depender da chave de leitura do CRM.
 */
export type LeadInput = {
  email: string;
  whatsapp?: string | null;
  nome?: string | null;
  profissao?: string | null;
  isca: string;
  variante?: string | null;
  quiz_result?: string | null;
  gclid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  ga_client_id?: string | null;
  source_surface?: string | null;
  event_id?: string | null;
};

export async function insertLead(row: LeadInput): Promise<{ ok: boolean; duplicate?: boolean; error?: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY; // chave publicável (anon)
  if (!url || !key) return { ok: false, error: 'supabase_env_missing' };
  const clean = { ...row, email: String(row.email).trim().toLowerCase(), variante: row.variante || 'A' };
  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(clean),
    });
    if (res.status === 409) return { ok: true, duplicate: true };
    if (!res.ok) return { ok: false, error: `supabase_${res.status}` };
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: `fetch_${(e as Error)?.message || 'err'}` };
  }
}
