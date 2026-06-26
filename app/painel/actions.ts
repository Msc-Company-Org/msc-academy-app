'use server';
import { redirect } from 'next/navigation';
import { checkPassword, createSession, destroySession } from '@/lib/auth';

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const pw = String(formData.get('password') || '');
  if (!checkPassword(pw)) return { error: 'Senha incorreta.' };
  await createSession();
  redirect('/painel');
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/painel/login');
}
