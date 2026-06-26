import crypto from 'node:crypto';
import { insertLead, type LeadRow } from '@/lib/leads';
import { sendEmail } from '@/lib/email';
import { buildDeliveryEmail } from '@/lib/email-templates';

export const runtime = 'nodejs';

const sha256 = (s: string) => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');
const iscaFrom = (isca?: string, sample?: string): string =>
  isca || (sample === 'quiz' ? 'quiz' : sample === '7-do-arsenal' ? 'arsenal-7' : sample === 'blog' ? 'blog' : 'arsenal-7');

/**
 * Captura de lead UNIFICADA (funil + iscas + blog):
 *  1) persiste no Supabase (leads, RLS insert-only via chave publicável)
 *  2) entrega por e-mail (Resend) se a isca tiver e-mail (arsenal-7/quiz/guia/starter)
 *  3) Meta CAPI Lead (dedup pelo event_id)
 *  4) se isca='blog', devolve cookie blog_unlock (libera leitura)
 */
export async function POST(req: Request) {
  let body: any = {};
  try { body = await req.json(); } catch { /* noop */ }

  const { name, email, phone, profissao, event_id, attribution, fbp, fbc, client_id, isca: iscaRaw, variant, quiz_result, sample, source_surface } = body || {};
  if (!email || !String(email).includes('@')) return Response.json({ ok: false, error: 'email_required' }, { status: 400 });

  const isca = iscaFrom(iscaRaw, sample);
  const variante = (variant === 'B' || variant === 'A') ? variant : (isca === 'quiz' ? 'B' : 'A');
  const a = attribution || {};
  const ua = req.headers.get('user-agent') || '';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';

  const row: LeadRow = {
    email, whatsapp: phone || null, nome: name || null, profissao: profissao || null,
    isca, variante, quiz_result: quiz_result || null,
    gclid: a.gclid || null, fbclid: a.fbclid || null,
    utm_source: a.utm_source || null, utm_medium: a.utm_medium || null,
    utm_campaign: a.utm_campaign || null, utm_content: a.utm_content || null, utm_term: a.utm_term || null,
    ga_client_id: client_id || null, fbp: fbp || null, fbc: fbc || null,
    event_id: event_id || null, source_surface: source_surface || (isca === 'blog' ? 'blog' : 'lead_lp'),
    user_agent: ua, ip, email_status: 'queued',
  };
  const saved = await insertLead(row);
  if (!saved.ok) {
    console.error('[lead] supabase insert falhou:', saved.error);
    return Response.json({ ok: false, error: 'lead_persist_failed' }, { status: 502 });
  }

  const mail = buildDeliveryEmail({ email, profissao, isca, quiz_result });
  if (mail) {
    const sent = await sendEmail({ to: email, subject: mail.subject, parts: mail.parts, tags: mail.tags });
    if (!sent.ok) console.error('[lead] resend envio falhou:', sent.error);
  }

  const pixel = process.env.PUBLIC_FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const capiToken = process.env.FB_CAPI_TOKEN;
  if (pixel && capiToken) {
    try {
      const user_data: Record<string, unknown> = { client_user_agent: ua, client_ip_address: ip };
      if (email) user_data.em = [sha256(String(email))];
      if (phone) user_data.ph = [sha256(String(phone).replace(/\D/g, ''))];
      if (fbp) user_data.fbp = fbp;
      if (fbc) user_data.fbc = fbc; else if (a.fbclid) user_data.fbc = `fb.1.${Date.now()}.${a.fbclid}`;
      await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${capiToken}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [{ event_name: 'Lead', event_time: Math.floor(Date.now() / 1000), event_id, action_source: 'website', event_source_url: req.headers.get('referer') || undefined, user_data, custom_data: { currency: 'BRL', value: 5, isca, variant: variante } }] }),
      });
    } catch { /* best-effort */ }
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (isca === 'blog') headers['Set-Cookie'] = `blog_unlock=1; Path=/; Max-Age=${60 * 60 * 24 * 180}; SameSite=Lax`;
  return new Response(JSON.stringify({ ok: true, persisted: true, duplicate: saved.duplicate === true }), { status: 200, headers });
}
