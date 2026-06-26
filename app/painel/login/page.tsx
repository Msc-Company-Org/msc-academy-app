'use client';
import { useActionState } from 'react';
import { loginAction, type LoginState } from '../actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="card w-full max-w-sm p-7">
        <div className="mb-1 flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#163300" />
            <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
            <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
          </svg>
          <span className="font-display text-lg font-bold">Painel · Arsenal</span>
        </div>
        <p className="mb-5 text-sm text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]">Acesso restrito ao administrador.</p>
        <form action={action} className="space-y-3">
          <input
            name="password" type="password" placeholder="Senha do painel" autoComplete="current-password"
            className="input" required autoFocus
          />
          {state.error && <p className="text-sm font-medium text-[var(--color-amber)]">{state.error}</p>}
          <button type="submit" className="btn w-full" disabled={pending}>
            {pending ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
