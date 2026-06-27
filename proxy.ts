import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Proxy (ex-middleware no Next 16) — cinto-e-suspensório: protege /painel/* (sessão
 * admin) ANTES de renderizar + aplica headers de segurança. Fail-closed: sem
 * ADMIN_JWT_SECRET, nega o painel.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/painel') && pathname !== '/painel/login') {
    const token = req.cookies.get('msc_admin')?.value;
    const sec = process.env.ADMIN_JWT_SECRET;
    let ok = false;
    if (token && sec) {
      try { await jwtVerify(token, new TextEncoder().encode(sec)); ok = true; } catch { /* token inválido */ }
    }
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = '/painel/login';
      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  // áreas sensíveis não-embedáveis (anti-clickjacking)
  if (pathname.startsWith('/painel') || pathname.startsWith('/membros')) {
    res.headers.set('X-Frame-Options', 'DENY');
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
