import 'server-only';

/**
 * Dados do CRM via Edge Function `crm-data` (no Supabase) — a service_role fica LÁ,
 * auto-injetada, nunca no nosso env. Chamamos com um segredo compartilhado (hash gateado).
 * Nunca lança: em falha de config/rede, devolve vazio + error (painel degrada, sem 500).
 */

export type Lead = {
  id: string; created_at: string;
  email: string; whatsapp: string | null; nome: string | null; profissao: string | null;
  isca: string; variante: string; quiz_result: string | null;
  gclid: string | null; utm_source: string | null; utm_campaign: string | null;
  source_surface: string | null; email_status: string | null;
};
export type Purchase = {
  id: string; created_at: string; email: string | null;
  amount_cents: number | null; currency: string | null; produto: string | null; status: string | null;
};
export type LeadFilters = { isca?: string; variante?: string; surface?: string; q?: string };

export const BRL = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export async function fetchCrmData(): Promise<{ leads: Lead[]; purchases: Purchase[]; error?: string }> {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.CRM_EDGE_SECRET;
  if (!url || !secret) return { leads: [], purchases: [], error: 'config_missing' };
  try {
    const r = await fetch(`${url}/functions/v1/crm-data`, {
      method: 'GET', headers: { 'x-crm-secret': secret }, cache: 'no-store',
    });
    if (!r.ok) return { leads: [], purchases: [], error: `edge_${r.status}` };
    const data = await r.json();
    return { leads: (data.leads || []) as Lead[], purchases: (data.purchases || []) as Purchase[] };
  } catch (e: unknown) {
    return { leads: [], purchases: [], error: `fetch_${(e as Error)?.message || 'err'}` };
  }
}

export function filterLeads(leads: Lead[], f: LeadFilters = {}, limit = 300): Lead[] {
  let out = leads;
  if (f.isca) out = out.filter((l) => l.isca === f.isca);
  if (f.variante) out = out.filter((l) => l.variante === f.variante);
  if (f.surface) out = out.filter((l) => l.source_surface === f.surface);
  if (f.q) out = out.filter((l) => (l.email || '').toLowerCase().includes(f.q!.toLowerCase()));
  return out.slice(0, limit);
}

export type VariantStat = { variante: string; leads: number; sales: number; revenueCents: number; convRate: number };
export type AbStats = { totalLeads: number; byVariant: VariantStat[]; byIsca: { isca: string; leads: number }[] };

export function computeAbStats(leads: Lead[], purchases: Purchase[]): AbStats {
  const paid = new Map<string, number>();
  for (const b of purchases) if (b.email) paid.set(b.email.toLowerCase(), (paid.get(b.email.toLowerCase()) || 0) + (b.amount_cents || 0));
  const variants = new Map<string, VariantStat>();
  const iscas = new Map<string, number>();
  for (const l of leads) {
    const v = l.variante || '—';
    const vs = variants.get(v) || { variante: v, leads: 0, sales: 0, revenueCents: 0, convRate: 0 };
    vs.leads++;
    const cents = paid.get((l.email || '').toLowerCase());
    if (cents) { vs.sales++; vs.revenueCents += cents; }
    variants.set(v, vs);
    iscas.set(l.isca || '—', (iscas.get(l.isca || '—') || 0) + 1);
  }
  return {
    totalLeads: leads.length,
    byVariant: [...variants.values()].map((v) => ({ ...v, convRate: v.leads ? v.sales / v.leads : 0 })).sort((a, b) => a.variante.localeCompare(b.variante)),
    byIsca: [...iscas.entries()].map(([isca, n]) => ({ isca, leads: n })).sort((a, b) => b.leads - a.leads),
  };
}

export type RevenueStats = { totalCents: number; sales: number; byProduct: { produto: string; sales: number; cents: number }[] };
export function computeRevenue(purchases: Purchase[]): RevenueStats {
  const byP = new Map<string, { sales: number; cents: number }>();
  let totalCents = 0;
  for (const r of purchases) {
    totalCents += r.amount_cents || 0;
    const p = r.produto || 'arsenal';
    const cur = byP.get(p) || { sales: 0, cents: 0 };
    cur.sales++; cur.cents += r.amount_cents || 0;
    byP.set(p, cur);
  }
  return { totalCents, sales: purchases.length, byProduct: [...byP.entries()].map(([produto, v]) => ({ produto, ...v })) };
}
