import type { Metadata } from 'next';
import { PECAS as pecas, METODO as metodo } from '@/lib/superpoderes';
import { PROFILES, type Segment } from '@/lib/quiz';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = {
  title: 'Seu superpoder de IA — arsenal personalizado | MSC Academy',
  description: 'Seu arsenal de IA personalizado pelo seu perfil, pronto pra copiar e usar.',
  robots: { index: false, follow: false },
};

// Entrega da Isca B (Quiz) — personalizada por perfil (?seg=). Gated (noindex).
const checkoutHref = '/?utm_source=email&utm_medium=crm&utm_campaign=arsenal_entrega&utm_content=entrega_quiz_bridge';

export default async function QuizEntrega({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const seg = (sp.seg && (PROFILES as Record<string, unknown>)[sp.seg] ? sp.seg : 'conteudo') as Segment;
  const p = PROFILES[seg];

  const nome = p.nome.replace(/^O /, '').replace(/^A /, '');

  // marca os superpoderes recomendados e os põe no topo, na ordem do perfil
  const recSet = new Set(p.recomendados);
  const recPecas = p.recomendados.map((id) => pecas.find((x) => x.id === id)).filter((x): x is (typeof pecas)[number] => !!x);
  const rest = pecas.filter((x) => !recSet.has(x.id));
  const ordered = [...recPecas, ...rest];

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
          <span className="text-sm text-ink/45">Seu arsenal</span>
        </div>
      </header>

      <section>
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3">Seu perfil · arsenal personalizado</p>
            <h1 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.8rem]">
              Você é <span className="text-sage">{nome}</span>.
            </h1>
            <p className="mt-3 font-display text-xl font-medium leading-snug text-ink/85">{p.tagline}</p>
            <div className="prose-flow mt-4">
              <p>{p.desc}</p>
            </div>
            <div className="card card-lit mt-7 p-5">
              <p className="font-display text-lg font-semibold">Instala em 3 passos</p>
              <ol className="mt-3 space-y-2 text-ink/85">
                <li className="flex gap-3"><span className="section-no">1.</span> Abre o ChatGPT, Claude ou Gemini.</li>
                <li className="flex gap-3"><span className="section-no">2.</span> Começa pelos superpoderes marcados <span className="text-amber font-semibold">★ do seu perfil</span>.</li>
                <li className="flex gap-3"><span className="section-no">3.</span> Copia, cola e troca o que está [entre colchetes]. Roda.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-citrus border-y border-ink/10">
        <div className="shell section">
          <div className="mx-auto max-w-2xl space-y-6">
            {ordered.map((x) => (
              <article key={x.id} className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{x.tag}</p>
                  <div className="flex items-center gap-3">
                    {recSet.has(x.id) && (
                      <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-bold text-amber">★ do seu perfil</span>
                    )}
                    <CopyButton text={x.prompt} />
                  </div>
                </div>
                <h2 className="mt-2 font-display text-xl font-bold">{x.titulo}</h2>
                <p className="mt-1 text-ink/80">{x.oque}</p>
                <pre className="asset-pre mt-4"><code>{x.prompt}</code></pre>
                <p className="mt-3 text-sm text-ink/60"><strong className="text-ink/75">Como usar:</strong> {x.comoUsar}</p>
              </article>
            ))}

            <article className="card-dark p-6">
              <p className="eyebrow-light">Peça-bônus · o guia</p>
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
          <p className="eyebrow mb-3">Seu perfil é o começo</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">O Arsenal completo vai além do seu perfil.</h2>
          <div className="prose-flow mx-auto mt-4 max-w-xl">
            <p>{p.bridge}</p>
            <p>E cresce toda semana.</p>
          </div>
          <a href={checkoutHref} className="btn-amber mt-7" data-checkout>VER O ARSENAL COMPLETO <span className="arrow">→</span></a>
        </div>
      </section>
    </>
  );
}
