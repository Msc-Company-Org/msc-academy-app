import crypto from 'node:crypto';
import { verifyStripeSignature } from '@/lib/stripe';
import { insertPurchase } from '@/lib/leads';
import { signAccess } from '@/lib/access';
import { sendEmail, siteUrlFromEnv } from '@/lib/email';
import { buildPurchaseEmail } from '@/lib/email-templates';

export const runtime = 'nodejs';

const sha256 = (s: string) => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

/**
 * Webhook Stripe — venda AUTORITATIVA. checkout.session.completed (cartão) +
 * async_payment_succeeded (Pix/boleto). Idempotente (stripe_session_id). Em pago:
 * grava venda → GA4 MP + Meta CAPI Purchase → libera acesso por e-mail (/membros).
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!verifyStripeSignature(raw, sig, process.env.STRIPE_WEBHOOK_SECRET)) {
    return Response.json({ ok: false, error: 'invalid_signature' }, { status: 401 });
  }

  let event: any = {};
  try { event = JSON.parse(raw); } catch { return Response.json({ ok: false }, { status: 400 }); }

  const type = event.type;
  if (type !== 'checkout.session.completed' && type !== 'checkout.session.async_payment_succeeded') {
    return Response.json({ ok: true, ignored: type });
  }
  const session = event.data?.object || {};
  if (type === 'checkout.session.completed' && session.payment_status && session.payment_status !== 'paid') {
    return Response.json({ ok: true, pending: true });
  }

  const sessionId = String(session.id || '');
  const value = Number(session.amount_total ?? 0) / 100 || 97;
  const email = session.customer_details?.email || session.customer_email || undefined;
  const m = session.metadata || {};
  const produto = m.produto || 'arsenal';

  const saved = await insertPurchase({
    stripe_session_id: sessionId, email, amount_cents: session.amount_total ?? null,
    currency: session.currency || 'brl', produto, status: 'paid',
    gclid: m.gclid || null, fbclid: m.fbclid || null,
    utm_source: m.utm_source || null, utm_medium: m.utm_medium || null, utm_campaign: m.utm_campaign || null,
    utm_content: m.utm_content || null, utm_term: m.utm_term || null,
    ga_client_id: m.ga_client_id || null, fbp: m.fbp || null, fbc: m.fbc || null,
  });
  if (saved.duplicate) return Response.json({ ok: true, already: true });
  if (!saved.ok) console.error('[stripe] insert purchase falhou:', saved.error);

  const GA_ID = process.env.GA_ID;
  const GA_API_SECRET = process.env.GA_API_SECRET;
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || process.env.FB_PIXEL_ID;
  const FB_CAPI_TOKEN = process.env.FB_CAPI_TOKEN;
  const items = [{ item_id: produto === 'tripwire' ? 'arsenal-tripwire' : 'arsenal-de-ia-97', item_name: produto === 'tripwire' ? 'Kit Conteúdo na Veia' : 'Arsenal de IA', price: value, quantity: 1 }];

  if (GA_ID && GA_API_SECRET && m.ga_client_id) {
    try {
      await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${GA_API_SECRET}`, {
        method: 'POST',
        body: JSON.stringify({ client_id: m.ga_client_id, events: [{ name: 'purchase', params: { transaction_id: sessionId, value, currency: 'BRL', items } }] }),
      });
    } catch { /* best-effort */ }
  }

  if (FB_PIXEL_ID && FB_CAPI_TOKEN) {
    try {
      const user_data: Record<string, unknown> = {};
      if (email) user_data.em = [sha256(String(email))];
      if (m.fbc) user_data.fbc = m.fbc; else if (m.fbclid) user_data.fbc = `fb.1.${Date.now()}.${m.fbclid}`;
      if (m.fbp) user_data.fbp = m.fbp;
      await fetch(`https://graph.facebook.com/v21.0/${FB_PIXEL_ID}/events?access_token=${FB_CAPI_TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [{ event_name: 'Purchase', event_time: Math.floor(Date.now() / 1000), event_id: sessionId, action_source: 'website', user_data, custom_data: { currency: 'BRL', value, content_ids: [items[0].item_id] } }] }),
      });
    } catch { /* best-effort */ }
  }

  if (email && /\S+@\S+\.\S+/.test(String(email))) {
    try {
      const token = signAccess(String(email));
      const accessUrl = `${siteUrlFromEnv()}/membros?t=${token}`;
      const mail = buildPurchaseEmail(String(email), accessUrl, produto);
      await sendEmail({ to: String(email), subject: mail.subject, parts: mail.parts, tags: mail.tags });
    } catch (e: any) { console.error('[stripe] envio de acesso falhou:', e?.message); }
  }

  return Response.json({ ok: true, sessionId });
}
