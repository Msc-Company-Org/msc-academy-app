import type { Metadata } from 'next';
import { PECAS, PECAS_AVANCADAS, HARNESS, METODO } from '@/lib/superpoderes';
import { verifyAccess } from '@/lib/access';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = {
  title: 'Sua área de membros — Arsenal de IA | MSC Academy',
  description: 'Sua biblioteca completa de superpoderes de IA.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic'; // server: valida o token de acesso

export default async function Membros({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const email = verifyAccess(sp.t);
  const liberado = !!email;

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
          <span className="text-sm text-ink/45">Área de membros</span>
        </div>
      </header>

      {!liberado && (
        <section>
          <div className="shell section">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-amber/15 text-2xl">🔒</div>
              <h1 className="font-display text-3xl font-extrabold">Acesso restrito</h1>
              <div className="prose-flow mx-auto mt-4 text-center">
                <p>Esta é a área de membros do Arsenal de IA.</p>
                <p>O link de acesso chega no seu e-mail assim que você entra.</p>
                <p>Se você já comprou, confere o e-mail (e o spam) ou responde que eu reenvio.</p>
              </div>
              <a href="/" className="btn-amber mt-7" data-checkout>QUERO O ARSENAL <span className="arrow">→</span></a>
            </div>
          </div>
        </section>
      )}

      {liberado && (
        <>
          <section>
            <div className="shell section">
              <div className="mx-auto max-w-2xl">
                <p className="eyebrow mb-3">Sua biblioteca · acesso vitalício</p>
                <h1 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.8rem]">Bem-vindo ao seu Arsenal completo.</h1>
                <div className="prose-flow mt-5">
                  <p className="lead">Tudo aqui é seu pra sempre — e cresce toda semana.</p>
                  <p>Não tenta ver tudo de uma vez. Instala 1 superpoder hoje, sente o resultado, volta amanhã pro próximo.</p>
                </div>
                <div className="card card-lit mt-7 p-5">
                  <p className="font-display text-lg font-semibold">Como navegar</p>
                  <ul className="mt-3 space-y-2 text-ink/85">
                    <li className="flex gap-3"><span className="text-amber">●</span> <strong>Plug &amp; Play</strong> — cola e usa, sem instalar nada.</li>
                    <li className="flex gap-3"><span className="text-amber">●</span> <strong>Conecta &amp; Orquestra</strong> — passo a passo guiado (memória, MCP, RAG, hooks).</li>
                    <li className="flex gap-3"><span className="text-amber">●</span> <strong>Método P.R.O.©</strong> — pra criar e consertar os seus.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="sec-citrus border-y border-ink/10">
            <div className="shell section">
              <div className="mx-auto max-w-2xl">
                <p className="eyebrow mb-1">Nível 1</p>
                <h2 className="font-display text-2xl font-bold">Plug &amp; Play — cola e usa</h2>
                <div className="mt-6 space-y-6">
                  {PECAS.map((p) => (
                    <article key={p.id} className="card p-6">
                      <div className="flex items-center justify-between gap-3">
                        <p className="eyebrow">{p.tag}</p>
                        <CopyButton text={p.prompt} />
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold">{p.titulo}</h3>
                      <p className="mt-1 text-ink/80">{p.oque}</p>
                      <pre className="asset-pre mt-4"><code>{p.prompt}</code></pre>
                      <p className="mt-3 text-sm text-ink/60"><strong className="text-ink/75">Como usar:</strong> {p.comoUsar}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-ink/10">
            <div className="shell section">
              <div className="mx-auto max-w-2xl">
                <p className="eyebrow mb-1">Níveis 2 e 3</p>
                <h2 className="font-display text-2xl font-bold">Conecta &amp; Orquestra — passo a passo</h2>
                <p className="mt-2 text-ink/70">Sem programar: você cola comandos e configs prontas. Faça na ordem — cada um destrava o próximo.</p>
                <div className="mt-6 space-y-6">
                  {PECAS_AVANCADAS.map((p) => (
                    <article key={p.id} className="card p-6">
                      <p className="eyebrow">{p.nivel}</p>
                      <h3 className="mt-2 font-display text-xl font-bold">{p.titulo}</h3>
                      <p className="mt-1 text-ink/80">{p.oque}</p>
                      <ol className="mt-4 space-y-2">
                        {p.passos.map((s, i) => (
                          <li key={i} className="flex gap-3 text-ink/85"><span className="section-no">{i + 1}.</span><span>{s}</span></li>
                        ))}
                      </ol>
                      {p.codigo && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-ink/70">{p.codigo.label}</p>
                            <CopyButton text={p.codigo.texto} />
                          </div>
                          <pre className="asset-pre mt-2"><code>{p.codigo.texto}</code></pre>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="sec-sage border-b border-ink/10">
            <div className="shell section">
              <div className="mx-auto max-w-2xl space-y-6">
                <article className="card-lit p-6">
                  <p className="eyebrow">Bônus</p>
                  <h2 className="mt-2 font-display text-xl font-bold">{HARNESS.titulo}</h2>
                  <p className="mt-1 text-ink/80">{HARNESS.oque}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">molde do agente-funcionário</p>
                    <CopyButton text={HARNESS.codigo} />
                  </div>
                  <pre className="asset-pre mt-2"><code>{HARNESS.codigo}</code></pre>
                </article>

                <article className="card-dark p-6">
                  <p className="eyebrow-light">O guia</p>
                  <h2 className="mt-2 font-display text-xl font-bold text-sand">{METODO.titulo}</h2>
                  <p className="mt-2 text-sand/80">{METODO.intro}</p>
                  <div className="mt-5 space-y-4">
                    {METODO.itens.map((m) => (
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

                <p className="text-center text-ink/60">📅 A biblioteca cresce toda semana. Quando entrar superpoder novo, ele aparece aqui — de graça pra você.</p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
