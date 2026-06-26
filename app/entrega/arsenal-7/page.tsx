import type { Metadata } from 'next';
import { PECAS as pecas, METODO as metodo } from '@/lib/superpoderes';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = {
  title: 'Seu Arsenal — 7 superpoderes liberados | MSC Academy',
  description: 'Suas 7 peças do Arsenal de IA, prontas pra copiar e usar.',
  robots: { index: false, follow: false },
};

// Entrega da Isca A — "7 Superpoderes prontos, sem codar". Página gated (noindex), linkada no e-mail.
const checkoutHref = '/?utm_source=email&utm_medium=crm&utm_campaign=arsenal_entrega&utm_content=entrega_bridge';

export default async function ArsenalSeteEntrega({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  // saudação por profissão (?p=)
  const prof = sp.p ? `, ${sp.p.replace(/\s*\/.*$/, '')}` : '';

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
          <span className="text-sm text-ink/45">Seu acesso</span>
        </div>
      </header>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3">Liberado · 7 superpoderes</p>
            <h1 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.8rem]">
              Bem-vindo ao seu arsenal{prof}.
            </h1>
            <div className="prose-flow mt-5">
              <p className="lead">Tudo aqui é pra copiar, colar e usar hoje.</p>
              <p>Funciona no ChatGPT, no Claude ou no Gemini — não precisa instalar nada.</p>
              <p>Começa pelos templates da sua área. Pega uma tarefa real e roda.</p>
            </div>
            <div className="card card-lit mt-7 p-5">
              <p className="font-display text-lg font-semibold">Instala em 3 passos</p>
              <ol className="mt-3 space-y-2 text-ink/85">
                <li className="flex gap-3"><span className="section-no">1.</span> Abre o ChatGPT, Claude ou Gemini.</li>
                <li className="flex gap-3"><span className="section-no">2.</span> Clica em “Copiar” num superpoder abaixo e cola lá.</li>
                <li className="flex gap-3"><span className="section-no">3.</span> Troca o que está [entre colchetes] pelo seu caso. Roda.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-citrus border-y border-ink/10">
        <div className="shell section">
          <div className="mx-auto max-w-2xl space-y-6">
            {pecas.map((p) => (
              <article key={p.id} className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{p.tag}</p>
                  <CopyButton text={p.prompt} />
                </div>
                <h2 className="mt-2 font-display text-xl font-bold">{p.titulo}</h2>
                <p className="mt-1 text-ink/80">{p.oque}</p>
                <pre className="asset-pre mt-4"><code>{p.prompt}</code></pre>
                <p className="mt-3 text-sm text-ink/60"><strong className="text-ink/75">Como usar:</strong> {p.comoUsar}</p>
              </article>
            ))}

            <article className="card-dark p-6">
              <p className="eyebrow-light">Peça 7 · o guia</p>
              <h2 className="mt-2 font-display text-xl font-bold text-sand">{metodo.titulo}</h2>
              <p className="mt-2 text-sand/80">{metodo.intro}</p>
              <div className="mt-5 space-y-4">
                {metodo.itens.map((m) => (
                  <div key={m.letra} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-citrus/20 font-display text-lg font-bold text-citrus">{m.letra}</span>
                    <div>
                      <p className="font-semibold text-sand">{m.nome}</p>
                      <p className="text-sand/75">{m.txt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="sec-coral border-t border-ink/10">
        <div className="shell section text-center">
          <p className="eyebrow mb-3">Isto é uma fatia</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Você instalou 7 de dezenas.</h2>
          <div className="prose-flow mx-auto mt-4 max-w-xl">
            <p>O Arsenal completo tem memória, conectores, RAG e o Método P.R.O.© inteiro.</p>
            <p>E cresce toda semana.</p>
          </div>
          <a href={checkoutHref} className="btn-amber mt-7" data-checkout>VER O ARSENAL COMPLETO <span className="arrow">→</span></a>
        </div>
      </section>
    </>
  );
}
