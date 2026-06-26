'use client';
import { useEffect, useState } from 'react';
import { track } from '@/lib/tracking';

export function ProntoQuizClient() {
  const [arsenalHref, setArsenalHref] = useState('/entrega/quiz');

  useEffect(() => {
    const seg = new URLSearchParams(location.search).get('seg');
    if (seg) setArsenalHref(`/entrega/quiz?seg=${encodeURIComponent(seg)}`);
  }, []);

  return (
    <section>
      <div className="shell section">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-2xl">✅</div>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Pronto! Seu arsenal personalizado já tá indo.</h1>
          <div className="prose-flow mx-auto mt-5 text-center">
            <p>Mandei pro seu e-mail (confere o spam, por garantia).</p>
            <p>Mas você não precisa esperar — abre agora:</p>
          </div>

          <a href={arsenalHref} id="ver-arsenal" className="btn-amber mt-6">VER MEU ARSENAL AGORA <span className="arrow">→</span></a>

          <div className="card mt-9 p-7 text-left">
            <p className="eyebrow mb-2">Seu perfil é uma porta de entrada</p>
            <div className="prose-flow">
              <p className="lead">O quiz te deu os superpoderes do seu perfil.</p>
              <p>O Arsenal completo tem os 12 + memória, conectores, RAG e o Método P.R.O.©.</p>
              <p>E cresce toda semana — por R$97.</p>
            </div>
            <a href="/?utm_source=quiz&utm_medium=bridge" className="btn-ghost mt-6 w-full justify-center" id="bridge-cta" onClick={() => track('bridge_cta_click', { from: 'quiz' })}>VER O ARSENAL COMPLETO <span className="arrow">→</span></a>
            <p className="mt-3 text-center text-sm text-ink/55">Sem pressa: seu arsenal é seu de qualquer jeito.</p>
          </div>

          <a href="/" className="mt-8 inline-block text-sm text-ink/50 hover:text-ink">← Voltar ao início</a>
        </div>
      </div>
    </section>
  );
}
