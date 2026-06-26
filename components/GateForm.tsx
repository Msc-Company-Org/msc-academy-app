'use client';
import { useState } from 'react';

/** Soft-gate: libera o resto do post em troca do e-mail (grava lead source=blog). */
export function GateForm({ titulo }: { titulo: string }) {
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true); setError('');
    try {
      const sp = new URLSearchParams(location.search);
      const res = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, isca: 'blog', source_surface: 'blog',
          gclid: sp.get('gclid') || undefined, utm_source: sp.get('utm_source') || undefined, utm_campaign: sp.get('utm_campaign') || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) { setError('Confere o e-mail e tenta de novo.'); setPending(false); return; }
      // cookie blog_unlock setado pela API → recarrega pra renderizar o conteúdo completo
      location.reload();
    } catch {
      setError('Deu um erro aqui. Tenta de novo em instantes.');
      setPending(false);
    }
  }

  return (
    <div className="card relative mt-2 p-7">
      <div className="pointer-events-none absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-sand)] to-transparent" />
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-indigo)]">Continua de graça</p>
      <h3 className="mt-2 font-display text-2xl font-bold">Lê o resto agora — só com seu e-mail.</h3>
      <p className="mt-2 text-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]">
        Libera este e <strong>todos</strong> os outros guias do Arsenal. Sem cartão, sai quando quiser.
      </p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail" autoComplete="email"
          className="input flex-1"
        />
        <button type="submit" className="btn whitespace-nowrap" disabled={pending}>
          {pending ? 'Liberando…' : 'Ler o resto →'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-[var(--color-amber)]">{error}</p>}
      <p className="mt-3 text-xs text-[color-mix(in_srgb,var(--color-ink)_50%,transparent)]">
        Ao continuar, você entra pra lista do Arsenal de IA. Leia nossa política de privacidade.
      </p>
    </div>
  );
}
