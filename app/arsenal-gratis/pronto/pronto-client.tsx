'use client';
import { track, goToCheckout } from '@/lib/tracking';
import { useState } from 'react';

export function ProntoArsenalClient() {
  const [pending, setPending] = useState(false);

  async function handleCheckout() {
    setPending(true);
    track('bridge_cta_click', { from: 'arsenal_gratis', action: 'checkout_upsell' });
    await goToCheckout({ produto: 'arsenal' });
    setPending(false);
  }

  return (
    <section>
      <div className="shell section">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-2xl">✅</div>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Tá indo. As 7 peças já estão no seu e-mail e WhatsApp.</h1>
          <div className="prose-flow mx-auto mt-5 text-center">
            <p>Confere a caixa de entrada — e o spam, por garantia.</p>
            <p>Começa pelos 3 templates da sua área.</p>
          </div>

          <div className="card mt-9 p-7 text-left">
            <p className="eyebrow mb-2">Enquanto as peças chegam</p>
            <div className="prose-flow">
              <p className="lead">Você acabou de provar uma fatia do Arsenal.</p>
              <p>O Arsenal completo são os 3 níveis — templates, fluxos, skills e superpowers — + o Método P.R.O.©.</p>
              <p>Tudo o que eu rodo em produção, por R$97.</p>
            </div>
            <button
              type="button"
              disabled={pending}
              className="btn-amber mt-6 w-full justify-center"
              id="bridge-cta"
              onClick={handleCheckout}
            >
              {pending ? 'CARREGANDO CHECKOUT...' : 'QUERO O ARSENAL COMPLETO — R$97'} <span className="arrow">→</span>
            </button>
            <p className="mt-3 text-center text-sm text-ink/55">Sem pressa: as 7 peças são suas de qualquer jeito.</p>
          </div>

          <a href="/" className="mt-8 inline-block text-sm text-ink/50 hover:text-ink">← Voltar ao início</a>
        </div>
      </div>
    </section>
  );
}
