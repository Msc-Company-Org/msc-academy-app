import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import { fetchCrmData, filterLeads, computeAbStats, computeRevenue, BRL, type LeadFilters } from '@/lib/crm';
import { logoutAction } from './actions';

export const dynamic = 'force-dynamic';

const pct = (n: number) => (n * 100).toFixed(1) + '%';
const dt = (s: string) => new Date(s).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const ISCAS = ['arsenal-7', 'quiz', 'guia-memoria', 'starter-mcp'];

export default async function Painel({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  if (!(await isAuthed())) redirect('/painel/login');
  const sp = await searchParams;
  const filters: LeadFilters = { isca: sp.isca, variante: sp.variante, surface: sp.surface, q: sp.q };
  const { leads: allLeads, purchases, error } = await fetchCrmData();
  const stats = computeAbStats(allLeads, purchases);
  const revenue = computeRevenue(purchases);
  const leads = filterLeads(allLeads, filters);

  const qs = (patch: Record<string, string | undefined>) => {
    const merged = { ...sp, ...patch };
    const u = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) u.set(k, v);
    const s = u.toString();
    return s ? `/painel?${s}` : '/painel';
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#163300" />
            <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
            <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
          </svg>
          <span className="font-display text-xl font-bold">Painel · Arsenal de IA</span>
        </div>
        <form action={logoutAction}><button className="btn btn-ghost text-sm">Sair</button></form>
      </header>

      {error && (
        <div className="card mb-6 border-[color-mix(in_srgb,var(--color-amber)_45%,transparent)] p-4 text-sm">
          ⚠️ Não consegui carregar os dados agora (<code>{error}</code>). O login está ok — é a leitura do CRM. Já estou ajustando a função <code>crm-data</code>.
        </div>
      )}

      {/* Placar A/B */}
      <section className="mb-8">
        <h2 className="mb-3 font-display text-lg font-semibold">Placar A/B · {stats.totalLeads} leads</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.byVariant.map((v) => (
            <div key={v.variante} className="card p-5">
              <div className="flex items-center justify-between">
                <span className={`pill ${v.variante === 'A' ? 'pill-a' : 'pill-b'}`}>Variante {v.variante}</span>
                <span className="text-xs text-[color-mix(in_srgb,var(--color-ink)_50%,transparent)]">{v.variante === 'A' ? '7 Superpoderes' : v.variante === 'B' ? 'Quiz' : '—'}</span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold">{v.leads}</p>
              <p className="text-sm text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]">leads captados</p>
              <div className="mt-3 flex justify-between border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-3 text-sm">
                <span>{v.sales} vendas · <strong>{pct(v.convRate)}</strong></span>
                <span className="font-semibold">{BRL(v.revenueCents)}</span>
              </div>
            </div>
          ))}
          <div className="card p-5">
            <span className="pill pill-a">Receita total</span>
            <p className="mt-3 font-display text-3xl font-extrabold">{BRL(revenue.totalCents)}</p>
            <p className="text-sm text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]">{revenue.sales} vendas pagas</p>
            <div className="mt-3 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-3 text-sm">
              {revenue.byProduct.map((p) => (<div key={p.produto} className="flex justify-between"><span>{p.produto}</span><span>{p.sales}× · {BRL(p.cents)}</span></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <a href={qs({ variante: undefined })} className={`rounded-full px-3 py-1 ${!sp.variante ? 'bg-[var(--color-ink)] text-[var(--color-sand)]' : 'card'}`}>Todas</a>
        <a href={qs({ variante: 'A' })} className={`rounded-full px-3 py-1 ${sp.variante === 'A' ? 'bg-[var(--color-ink)] text-[var(--color-sand)]' : 'card'}`}>Variante A</a>
        <a href={qs({ variante: 'B' })} className={`rounded-full px-3 py-1 ${sp.variante === 'B' ? 'bg-[var(--color-ink)] text-[var(--color-sand)]' : 'card'}`}>Variante B</a>
        <span className="mx-1 opacity-40">|</span>
        {ISCAS.map((i) => (
          <a key={i} href={qs({ isca: sp.isca === i ? undefined : i })} className={`rounded-full px-3 py-1 ${sp.isca === i ? 'bg-[var(--color-sage)] text-white' : 'card'}`}>{i}</a>
        ))}
        <span className="mx-1 opacity-40">|</span>
        <a href="/painel/export" className="rounded-full card px-3 py-1">⤓ Exportar CSV</a>
      </section>

      {/* Tabela de leads */}
      <section className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)] text-xs uppercase tracking-wide text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]">
              <tr>
                <th className="px-4 py-3">Data</th><th className="px-4 py-3">E-mail</th><th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Isca</th><th className="px-4 py-3">Var</th><th className="px-4 py-3">Área</th>
                <th className="px-4 py-3">Origem</th><th className="px-4 py-3">Pago</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]">
                  <td className="whitespace-nowrap px-4 py-2.5 text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]">{dt(l.created_at)}</td>
                  <td className="px-4 py-2.5">{l.email}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">{l.whatsapp || '—'}</td>
                  <td className="px-4 py-2.5">{l.isca}{l.quiz_result ? ` · ${l.quiz_result}` : ''}</td>
                  <td className="px-4 py-2.5"><span className={`pill ${l.variante === 'A' ? 'pill-a' : 'pill-b'}`}>{l.variante}</span></td>
                  <td className="px-4 py-2.5">{l.profissao || '—'}</td>
                  <td className="px-4 py-2.5">{l.source_surface || '—'}{l.gclid ? ' · ads' : ''}</td>
                  <td className="px-4 py-2.5">{l.email_status === 'queued' ? '✉️' : l.email_status || '—'}</td>
                </tr>
              ))}
              {leads.length === 0 && (<tr><td colSpan={8} className="px-4 py-8 text-center text-[color-mix(in_srgb,var(--color-ink)_50%,transparent)]">Nenhum lead com esses filtros ainda.</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-3 text-xs text-[color-mix(in_srgb,var(--color-ink)_45%,transparent)]">Mostrando até 300 leads mais recentes. Backend: Supabase msc-hub (online).</p>
    </main>
  );
}
