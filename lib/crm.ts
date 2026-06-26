import 'server-only';
import { supabaseAdmin } from './supabase';

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

const BRL = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export async function getLeads(filters: LeadFilters = {}, limit = 300): Promise<Lead[]> {
  let q = supabaseAdmin().from('leads').select('*').order('created_at', { ascending: false }).limit(limit);
  if (filters.isca) q = q.eq('isca', filters.isca);
  if (filters.variante) q = q.eq('variante', filters.variante);
  if (filters.surface) q = q.eq('source_surface', filters.surface);
  if (filters.q) q = q.ilike('email', `%${filters.q}%`);
  const { data, error } = await q;
  if (error) { console.error('[crm] getLeads', error.message); return []; }
  return (data || []) as Lead[];
}

export type VariantStat = { variante: string; leads: number; sales: number; revenueCents: number; convRate: number };

export type AbStats = {
  totalLeads: number;
  byVariant: VariantStat[];
  byIsca: { isca: string; leads: number }[];
};

/** Placar A/B: leads por variante + conversão (join por e-mail com compras pagas). */
export async function getAbStats(): Promise<AbStats> {
  const sb = supabaseAdmin();
  const [{ data: leads }, { data: buys }] = await Promise.all([
    sb.from('leads').select('email,variante,isca'),
    sb.from('purchases').select('email,amount_cents,status').eq('status', 'paid'),
  ]);
  const L = (leads || []) as { email: string; variante: string; isca: string }[];
  const B = (buys || []) as { email: string; amount_cents: number | null }[];

  // mapa email → valor pago (compras)
  const paid = new Map<string, number>();
  for (const b of B) if (b.email) paid.set(b.email.toLowerCase(), (paid.get(b.email.toLowerCase()) || 0) + (b.amount_cents || 0));

  const variants = new Map<string, VariantStat>();
  const iscas = new Map<string, number>();
  for (const l of L) {
    const v = l.variante || '—';
    const vs = variants.get(v) || { variante: v, leads: 0, sales: 0, revenueCents: 0, convRate: 0 };
    vs.leads++;
    const cents = paid.get((l.email || '').toLowerCase());
    if (cents) { vs.sales++; vs.revenueCents += cents; }
    variants.set(v, vs);
    iscas.set(l.isca || '—', (iscas.get(l.isca || '—') || 0) + 1);
  }
  const byVariant = [...variants.values()].map((v) => ({ ...v, convRate: v.leads ? v.sales / v.leads : 0 })).sort((a, b) => a.variante.localeCompare(b.variante));
  const byIsca = [...iscas.entries()].map(([isca, leads]) => ({ isca, leads })).sort((a, b) => b.leads - a.leads);
  return { totalLeads: L.length, byVariant, byIsca };
}

export type RevenueStats = { totalCents: number; sales: number; byProduct: { produto: string; sales: number; cents: number }[]; recent: Purchase[] };

export async function getRevenue(): Promise<RevenueStats> {
  const { data, error } = await supabaseAdmin()
    .from('purchases').select('*').eq('status', 'paid').order('created_at', { ascending: false });
  if (error) { console.error('[crm] getRevenue', error.message); return { totalCents: 0, sales: 0, byProduct: [], recent: [] }; }
  const rows = (data || []) as Purchase[];
  const byP = new Map<string, { sales: number; cents: number }>();
  let totalCents = 0;
  for (const r of rows) {
    totalCents += r.amount_cents || 0;
    const p = r.produto || 'arsenal';
    const cur = byP.get(p) || { sales: 0, cents: 0 };
    cur.sales++; cur.cents += r.amount_cents || 0;
    byP.set(p, cur);
  }
  return {
    totalCents, sales: rows.length,
    byProduct: [...byP.entries()].map(([produto, v]) => ({ produto, ...v })),
    recent: rows.slice(0, 10),
  };
}

export { BRL };
