'use client';
import { useRef, useState } from 'react';
import { QUESTIONS, score, PROFILES, type Segment } from '@/lib/quiz';
import { track, uuid, getAttribution, getGaClientId } from '@/lib/tracking';

type Stage = 'intro' | 'quiz' | 'result';

export function QuizClient() {
  const [stage, setStage] = useState<Stage>('intro');
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [seg, setSeg] = useState<Segment>('conteudo');
  const [pending, setPending] = useState(false);
  const startedRef = useRef(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[cur];
  const pct = Math.round(((cur + 1) / total) * 100);
  const p = PROFILES[seg];

  function start() {
    setStage('quiz');
    track('quiz_start', { lead_source: 'quiz', variant: 'B' });
    setCur(0);
  }

  function choose(idx: number) {
    const next = answers.slice();
    next[cur] = idx;
    setAnswers(next);
    if (cur + 1 < total) renderQuestion(cur + 1);
    else showResult(next);
  }

  function renderQuestion(i: number) {
    setCur(i);
  }

  function showResult(finalAnswers: number[]) {
    const s = score(finalAnswers);
    setSeg(s);
    setStage('result');
    track('quiz_complete', { lead_source: 'quiz', quiz_result: s, variant: 'B' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function back() {
    if (cur > 0) setCur(cur - 1);
  }

  function onFocus() {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form_id: 'optin_quiz', surface: 'quiz' });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const event_id = uuid();
    const profissao = QUESTIONS[0].opcoes[answers[0]]?.label || null;
    setPending(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fd.get('email'), phone: fd.get('phone'), profissao,
          isca: 'quiz', variant: 'B', quiz_result: seg, source_surface: 'quiz',
          sample: 'quiz', event_id, client_id: getGaClientId(), attribution: getAttribution(),
          fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1], fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1],
        }),
      });
    } catch { /* segue */ }
    document.cookie = `arsenal_lead=1; max-age=${180 * 864e2}; path=/; SameSite=Lax`;
    track('generate_lead', { value: 5, currency: 'BRL', lead_source: 'quiz', form_id: 'optin_quiz', method: 'email', event_id, isca: 'quiz', variant: 'B', quiz_result: seg });
    location.href = `/quiz/pronto?seg=${encodeURIComponent(seg)}`;
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
          <span className="text-sm text-ink/45">Quiz · 1 min</span>
        </div>
      </header>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-xl">

            {/* INTRO */}
            <div id="q-intro" className={stage === 'intro' ? undefined : 'hidden'}>
              <p className="eyebrow mb-3">Grátis · 1 minuto · sem codar</p>
              <h1 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.9rem]">Qual superpoder de IA vai destravar o SEU trabalho?</h1>
              <p className="mt-4 font-display text-xl font-medium leading-snug text-ink/85">Responde 6 perguntas e recebe seu <span className="hl">mini-arsenal</span> personalizado.</p>
              <div className="prose-flow mt-5">
                <p>Não é teste de personalidade.</p>
                <p>No fim, você sai com superpoderes prontos pra copiar e usar hoje — os do seu perfil.</p>
              </div>
              <button id="q-start" className="btn-amber mt-7" onClick={start}>COMEÇAR O QUIZ <span className="arrow">→</span></button>
            </div>

            {/* QUIZ */}
            <div id="q-quiz" className={stage === 'quiz' ? undefined : 'hidden'}>
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-ink/55">
                  <span id="q-counter">Pergunta {cur + 1} de {total}</span>
                  <span id="q-pct">{pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                  <div id="q-bar" className="h-full rounded-full bg-sage transition-[width] duration-300" style={{ width: pct + '%' }}></div>
                </div>
              </div>
              <h2 id="q-question" className="font-display text-2xl font-bold leading-tight sm:text-3xl">{q.pergunta}</h2>
              <div id="q-options" className="mt-6 space-y-3">
                {q.opcoes.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={'q-opt w-full text-left' + (answers[cur] === idx ? ' is-sel' : '')}
                    onClick={() => choose(idx)}
                  >{opt.label}</button>
                ))}
              </div>
              <button id="q-back" className="mt-6 text-sm text-ink/50 hover:text-ink/80" style={{ visibility: cur === 0 ? 'hidden' : 'visible' }} onClick={back}>← voltar</button>
            </div>

            {/* RESULTADO + CAPTURA */}
            <div id="q-result" className={stage === 'result' ? undefined : 'hidden'}>
              <p className="eyebrow mb-3">Seu resultado</p>
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-indigo">Seu superpoder de IA é</h2>
              <p id="r-nome" className="mt-1 font-display text-[2rem] font-extrabold leading-tight sm:text-[2.6rem]">{p.nome}</p>
              <p id="r-tagline" className="mt-2 font-display text-xl font-medium text-ink/85">{p.tagline}</p>
              <div id="r-desc" className="prose-flow mt-4"><p>{p.desc}</p></div>

              <div className="card card-lit mt-7 p-6">
                <p className="font-display text-lg font-semibold">Você desbloqueou <span id="r-count">{p.recomendados.length}</span> dos 12 superpoderes.</p>
                <p className="mt-1 text-ink/75">Pra onde mando seu arsenal personalizado + 1 bônus do seu perfil?</p>
                <form id="quiz-form" className="mt-5 space-y-4" onFocus={onFocus} onSubmit={onSubmit}>
                  <div className="field">
                    <label className="field-label" htmlFor="qf-email">E-mail</label>
                    <input id="qf-email" name="email" type="email" autoComplete="email" placeholder="Seu melhor e-mail" className="input" required />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="qf-phone">WhatsApp (com DDD)</label>
                    <input id="qf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(21) 9 0000-0000" className="input" required />
                  </div>
                  <button type="submit" className="btn-amber w-full" aria-busy={pending} disabled={pending}>QUERO MEU ARSENAL <span className="arrow">→</span></button>
                  <p id="quiz-msg" className="field-error hidden text-center"></p>
                  <p className="text-center text-xs text-ink/50">Sem cartão. Entrega por e-mail. Sai quando quiser.</p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
