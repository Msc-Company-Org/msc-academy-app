import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * Auth do PAINEL admin — gate de senha simples (padrão da casa: admin/admin).
 * Sessão = JWT assinado em cookie HttpOnly. (Compradores usam Supabase Auth magic link — Fase D.)
 */
const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'dev-secret-troque-em-producao');
const COOKIE = 'msc_admin';
const TTL = 60 * 60 * 12; // 12h

export function checkPassword(pw: string): boolean {
  return pw === (process.env.ADMIN_PASSWORD || 'admin');
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TTL}s`)
    .sign(SECRET);
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
  try { await jwtVerify(token, SECRET); return true; } catch { return false; }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
