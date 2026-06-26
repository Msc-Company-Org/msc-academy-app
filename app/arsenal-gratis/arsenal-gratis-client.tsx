'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { track, uuid, getAttribution, getGaClientId } from '@/lib/tracking';

export function ArsenalGratisClient() {
  const [pending, setPending] = useState(false);
  const startedRef = useRef(false);

  function onFocus() {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form_id: 'optin_arsenal_gratis', surface: 'lead_lp' });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const event_id = uuid();
    setPending(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fd.get('email'), phone: fd.get('phone'), profissao: fd.get('profissao'),
          isca: 'arsenal-7', variant: 'A', source_surface: 'lead_lp',
          sample: '7-do-arsenal', event_id, client_id: getGaClientId(), attribution: getAttribution(),
          fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1], fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1],
        }),
      });
    } catch { /* segue */ }
    document.cookie = `arsenal_lead=1; max-age=${180 * 864e2}; path=/; SameSite=Lax`;
    track('generate_lead', { value: 5, currency: 'BRL', lead_source: 'arsenal_gratis', form_id: 'optin_arsenal_gratis', method: 'email', event_id, sample: '7-do-arsenal', isca: 'arsenal-7', variant: 'A' });
    location.href = '/arsenal-gratis/pronto';
  }

  return (
    <>
      <header className="border-b border-ink/10">
        <div className="shell flex items-center justify-between py-3">
          <a href="/" className="flex items-center gap-2.5 font-semibold" aria-label="Arsenal de IA — MSC Academy">
            <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#163300" />
              <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
              <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
            </svg>
            <span className="font-display text-lg">Arsenal <span className="text-sage">de IA</span></span>
          </a>
          <span className="text-sm text-ink/45">Amostra grátis</span>
        </div>
      </header>

      <section>
        <div className="shell section">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="eyebrow mb-4">Amostra grátis · superpoderes de IA prontos</p>
              <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-tight sm:text-[3.2rem]">Pega 7 superpoderes de IA prontos.</h1>
              <p className="mt-3 font-display text-xl font-medium leading-snug text-ink/85 sm:text-2xl"><span className="hl">Grátis</span>, pra sua profissão — sem codar.</p>
              <div className="prose-flow mt-6 max-w-[30rem]">
                <p className="lead">Cada um é um arquivo que você cola na IA — e ela passa a fazer o trabalho por você.</p>
                <p>São 7 superpoderes da biblioteca que eu rodo nos meus sistemas, em produção.</p>
                <p>Você escolhe sua área e recebe os 7 prontos na hora. De graça.</p>
              </div>
              <Image src="/img/free_sample_7pieces.jpg" alt="As 7 peças grátis do Arsenal de IA — templates, fluxos e skills prontos" width={560} height={560} priority className="mt-9 w-full max-w-[26rem] rounded-2xl" />
            </div>

            <div className="card p-7" id="form-card">
              <h2 className="font-display text-xl font-semibold">Receba as 7 peças agora</h2>
              <form id="lead-form" className="mt-4 space-y-4" onFocus={onFocus} onSubmit={onSubmit}>
                <div className="field">
                  <label className="field-label" htmlFor="lf-area">Sua área</label>
                  <select id="lf-area" name="profissao" className="select" required defaultValue="">
                    <option value="">Selecione…</option>
                    <option>Vendas / Comercial</option>
                    <option>Atendimento / Suporte</option>
                    <option>Conteúdo / Social Media</option>
                    <option>Escritório / Administrativo</option>
                    <option>Freelancer / Serviços</option>
                    <option>Estudo / Concurso / Carreira</option>
                    <option>Outra</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="lf-email">E-mail</label>
                  <input id="lf-email" name="email" type="email" autoComplete="email" placeholder="Seu melhor e-mail" className="input" required />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="lf-phone">WhatsApp (com DDD)</label>
                  <input id="lf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(21) 9 0000-0000" className="input" required />
                </div>
                <button type="submit" className="btn-amber w-full" aria-busy={pending} disabled={pending}>QUERO AS 7 PEÇAS GRÁTIS <span className="arrow">→</span></button>
                <p id="lead-msg" className="field-error hidden text-center"></p>
                <p className="text-center text-xs text-ink/50">Sem cartão. Entrega por e-mail e WhatsApp. Cancela quando quiser.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand-dark">
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3">O que cai no seu e-mail</p>
            <ul className="space-y-3 text-lg text-ink/85">
              <li className="text-sage">✓ <span className="text-ink/85"><strong>3 templates da sua profissão</strong> — pra resolver tarefa real, não exemplo de blog.</span></li>
              <li className="text-sage">✓ <span className="text-ink/85"><strong>2 fluxos prontos</strong> — onde uma IA puxa a outra e o trabalho anda sozinho.</span></li>
              <li className="text-sage">✓ <span className="text-ink/85"><strong>1 skill avançada</strong> — uma das que separam quem brinca de quem entrega.</span></li>
              <li className="text-sage">✓ <span className="text-ink/85"><strong>1 página do Método P.R.O.©</strong> — pra você adaptar e criar os seus, não só copiar.</span></li>
            </ul>
            <div className="prose-flow mt-6">
              <p>É uma fatia do Arsenal completo.</p>
              <p>Se as 7 já te ajudam, imagina as outras dezenas.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3">Quem tá do outro lado</p>
            <div className="prose-flow">
              <p className="lead">Meu nome é Moisés.</p>
              <p>Eu não vendo curso de IA pra quem nunca abriu a IA.</p>
              <p>Eu coloco agentes de WhatsApp e modelos sob medida pra rodar em produção, todo dia.</p>
              <p>Essas 7 peças saíram de lá de dentro — do que realmente funciona, não do que é bonito no print.</p>
            </div>
            <p className="seal-real mt-5">● Testado em produção</p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand-dark">
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-6">Depois que você se cadastrar</p>
            <ol className="space-y-5">
              <li className="flex gap-4"><span className="section-no text-2xl">1.</span><p className="text-lg text-ink/85">As 7 peças chegam no seu e-mail em segundos.</p></li>
              <li className="flex gap-4"><span className="section-no text-2xl">2.</span><p className="text-lg text-ink/85">Mando o mesmo link no WhatsApp, pra não se perder.</p></li>
              <li className="flex gap-4"><span className="section-no text-2xl">3.</span><p className="text-lg text-ink/85">Você testa as 3 da sua área hoje e me conta se entregou.</p></li>
            </ol>
            <p className="mt-6 font-display text-lg italic text-ink/70">Sem ligação. Sem enrolação. Sem pegadinha.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-2xl divide-y divide-ink/12 border-y border-ink/12">
            <details className="group py-1"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold marker:hidden">É grátis mesmo ou tem cobrança escondida?<span className="text-xl text-indigo transition group-open:rotate-45">+</span></summary><p className="pb-4 text-ink/75">Grátis de verdade. Sem cartão, sem trial, sem letra miúda.</p></details>
            <details className="group py-1"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold marker:hidden">Preciso saber programar ou entender de IA?<span className="text-xl text-indigo transition group-open:rotate-45">+</span></summary><p className="pb-4 text-ink/75">Não. Você copia, cola e adapta. As 7 peças vêm com instrução de uso.</p></details>
            <details className="group py-1"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold marker:hidden">Pra que vocês querem meu WhatsApp?<span className="text-xl text-indigo transition group-open:rotate-45">+</span></summary><p className="pb-4 text-ink/75">Só pra entregar as peças e avisar quando sair coisa nova. Você cancela com uma palavra.</p></details>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-sand-dark">
        <div className="shell section text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">7 peças. Grátis. Hoje.</h2>
          <a href="#form-card" className="btn-amber mt-7">QUERO AS 7 PEÇAS GRÁTIS <span className="arrow">→</span></a>
          <p className="mt-6 text-sm text-ink/50"><a href="/privacidade" className="underline hover:text-ink">Política de privacidade</a></p>
        </div>
      </section>
    </>
  );
}
