import { createCheckoutSession } from '@/lib/stripe';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_CHECKOUTS_PER_WINDOW = 10;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || cur.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  cur.count += 1;
  return cur.count <= MAX_CHECKOUTS_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* noop */ }
  const { email, attribution, client_id, fbp, fbc, produto, checkout_intent } = body || {};
  if (checkout_intent !== 'site_checkout') {
    return Response.json({ ok: false, error: 'invalid_checkout_intent' }, { status: 400 });
  }
  if (produto != null && produto !== 'arsenal' && produto !== 'tripwire') {
    return Response.json({ ok: false, error: 'invalid_product' }, { status: 400 });
  }

  const r = await createCheckoutSession({
    email: (email as string) || undefined,
    produto: produto === 'tripwire' ? 'tripwire' : 'arsenal',
    attribution: (attribution as never) || {},
    gaClientId: (client_id as string) || undefined,
    fbp: (fbp as string) || undefined,
    fbc: (fbc as string) || undefined,
  });
  if (!r.url) {
    console.error('[checkout] falhou:', r.error);
    return Response.json({ ok: false, error: r.error || 'checkout_failed' }, { status: 502 });
  }
  return Response.json({ ok: true, url: r.url });
}
