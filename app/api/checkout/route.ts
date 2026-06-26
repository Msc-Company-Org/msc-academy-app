import { createCheckoutSession } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* noop */ }
  const { email, attribution, client_id, fbp, fbc, produto } = body || {};
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
