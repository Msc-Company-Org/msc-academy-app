import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * Auth do PAINEL admin — gate de senha simples (padrão da casa: admin/admin).
 * Sessão = JWT assinado em cookie HttpOnly. (Compradores usam Supabase Auth magic link — Fase D.)
 */
const COOKIE = 'msc_admin';
const TTL = 60 * 60 * 12; // 12h
const isProd = process.env.NODE_ENV === 'production';

// segredo do JWT — fail-closed em produção (sem fallback público conhecido)
function jwtSecret(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) {
    if (isProd) throw new Error('ADMIN_JWT_SECRET não configurado');
    return new TextEncoder().encode('dev-only-local-insecure'); // só ambiente local
  }
  return new TextEncoder().encode(s);
}

export function checkPassword(pw: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return isProd ? false : pw === 'admin'; // prod sem senha = nega; local = admin/admin
  return pw === real;
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TTL}s`)
    .sign(jwtSecret());
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true, path: '/', sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', maxAge: TTL,
  });
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  try { await jwtVerify(token, jwtSecret()); return true; } catch { return false; }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
