import { insertLead } from '@/lib/leads';

export const runtime = 'nodejs';

/**
 * Captura de lead. Usada pelo gate do blog (e, depois, pelo funil migrado).
 * Grava no Supabase via chave publicável (RLS insert-only) e, se for o gate do blog,
 * devolve um cookie `blog_unlock` que libera a leitura completa dos posts.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* noop */ }

  const email = String(body.email || '').trim();
  if (!email || !email.includes('@')) {
    return Response.json({ ok: false, error: 'email_invalid' }, { status: 400 });
  }

  const isca = String(body.isca || 'blog');
  const saved = await insertLead({
    email,
    whatsapp: (body.phone as string) || null,
    nome: (body.nome as string) || null,
    profissao: (body.profissao as string) || null,
    isca,
    variante: (body.variant as string) || 'A',
    source_surface: (body.source_surface as string) || 'blog',
    gclid: (body.gclid as string) || null,
    utm_source: (body.utm_source as string) || null,
    utm_campaign: (body.utm_campaign as string) || null,
    event_id: (body.event_id as string) || null,
  });
  if (!saved.ok) console.error('[lead] insert falhou:', saved.error);

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (isca === 'blog') {
    headers['Set-Cookie'] = `blog_unlock=1; Path=/; Max-Age=${60 * 60 * 24 * 180}; SameSite=Lax`;
  }
  return new Response(JSON.stringify({ ok: true, persisted: saved.ok }), { status: 200, headers });
}
