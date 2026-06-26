import type { Metadata } from 'next';

/**
 * Landing do carro-chefe: Curso "Chatbot WhatsApp com IA" (ângulo: dono leigo, vendedor 24/7).
 * Ângulo: dono de negócio leigo monta um vendedor 24/7 sem depender de programador/agência.
 * Reusa o design system "Tinta Floresta" + tracking (data-checkout="curso", data-offer="697").
 */

const SITE = 'https://app.msc-academy.com.br';
const PRECO = 'R$697';
const PRECO_DE = 'R$997';

const antesDepois: [string, string[], string[]][] = [
  ['Cliente chama 22h', ['Hoje: você responde só de manhã.', 'Ele já comprou do concorrente que respondeu na hora.'], ['Com o bot: responde em segundos, qualifica e já oferece.', 'Você acorda com a venda encaminhada.']],
  ['As mesmas 10 perguntas', ['Hoje: você digita "qual o valor?" pela milésima vez.', 'O dia todo, todo dia.'], ['Com o bot: ele responde preço, horário e dúvidas comuns sozinho.', 'Você só entra quando é pra fechar.']],
  ['Fim de semana / feriado', ['Hoje: WhatsApp lotado e ninguém pra atender.', 'Lead esfria, some.'], ['Com o bot: atende, agenda e segura o cliente quente.', 'Sem você grudado no celular.']],
];

const modulos: [string, string, string][] = [
  ['01', 'O essencial (sem termo técnico)', 'O que é um agente de IA no WhatsApp, o que ele resolve no SEU negócio e por que não é "coisa de programador".'],
  ['02', 'Seu primeiro bot no ar', 'Montando passo a passo numa ferramenta no-code. Sem escrever código — você liga os blocos e ele já responde.'],
  ['03', 'Dando cabeça de IA ao bot', 'Respostas naturais, entender o que o cliente quer e responder com as informações do seu negócio (não no chute).'],
  ['04', 'Vender e agendar sozinho', 'Fluxos de venda, orçamento e agendamento — e a hora certa de passar pro humano com tudo mastigado.'],
  ['05', 'Publicar e não tomar ban', 'API oficial vs alternativas, o custo real (sem surpresa) e as boas práticas pra não tomar bloqueio do WhatsApp.'],
  ['+', 'Bônus: bots prontos por nicho', 'Templates pra clínica, loja/varejo, delivery e serviços. Você parte de um pronto e adapta pro seu caso.'],
];

const incluso: [string, string][] = [
  ['🎥 Aulas gravadas, passo a passo', 'Do zero ao bot rodando, no seu ritmo. Assiste quando dá, repete quando precisar.'],
  ['🧩 Templates de bot prontos', 'Fluxos por nicho pra copiar e adaptar — você sai com algo funcionando, não só teoria.'],
  ['👥 Comunidade de alunos', 'Grupo pra tirar dúvida, ver o que os outros estão montando e não travar sozinho.'],
  ['🎙️ Mentoria + aulas ao vivo', 'Encontros ao vivo pra destravar o seu caso específico, com quem opera IA de verdade.'],
];

const faq: [string, string[]][] = [
  ['Preciso saber programar?', ['Não, nada.', 'O curso é feito pra quem nunca escreveu uma linha de código.', 'Você monta o bot ligando blocos prontos numa ferramenta visual.']],
  ['Dá pra fazer de graça?', ['Dá pra começar com as versões gratuitas das ferramentas — e eu te mostro até onde elas vão.', 'Quando vale a pena pagar (e quanto), eu explico sem enrolação.']],
  ['Quanto custa a "API do WhatsApp"?', ['Tem caminho oficial e caminhos alternativos, com custos diferentes.', 'Mostro as opções e o custo real de cada uma, pra você escolher o que cabe no seu bolso — sem pegadinha.']],
  ['Funciona pro meu tipo de negócio?', ['Clínica, loja, delivery, serviços, autônomo, infoproduto…', 'Você recebe templates por nicho e o método se adapta ao seu caso.']],
  ['O WhatsApp não vai me banir?', ['Esse é o medo nº1 — e por isso tem um módulo só sobre fazer do jeito certo.', 'Com a API oficial e as boas práticas, você roda tranquilo.']],
  ['O bot vende sozinho mesmo?', ['Ele atende na hora, responde dúvida, qualifica, agenda e encaminha.', 'Fecha o que dá pra fechar no automático e te entrega o resto pronto pra finalizar.', 'Não é mágica: é o seu atendimento funcionando 24h.']],
  ['Em quanto tempo eu coloco no ar?', ['O primeiro bot respondendo sai já na primeira semana.', 'Os fluxos de venda e agendamento você vai montando em cima disso.']],
  ['É gravado ou ao vivo?', ['As aulas são gravadas (você assiste no seu ritmo).', 'Além disso tem encontros ao vivo e a comunidade pra destravar o que for específico do seu negócio.']],
  ['Como funcionam as vagas e o acesso?', ['As matrículas ficam abertas por tempo limitado e as vagas são poucas por causa da mentoria ao vivo.', 'Assim que você entra, o acesso é liberado na hora — com as atualizações do curso inclusas.', 'Quando as vagas acabam, as inscrições fecham e o preço volta pra R$997.']],
  ['E se eu não gostar?', ['Garantia de 7 dias, incondicional.', 'Entrou, não era pra você, pediu — devolvo 100%. O risco é meu.']],
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, lines]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: lines.join(' ') } })),
};

export const metadata: Metadata = {
  title: 'Curso Chatbot WhatsApp com IA — seu vendedor 24/7 | MSC Academy',
  description:
    'Aprenda a montar um chatbot de IA que atende, qualifica e vende no seu WhatsApp 24/7 — sem programar e sem depender de agência. Aulas gravadas, templates prontos, comunidade e mentoria. Matrículas abertas, vagas limitadas.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/chatbot-whatsapp` },
  openGraph: {
    title: 'Curso Chatbot WhatsApp com IA — seu vendedor 24/7 | MSC Academy',
    description: 'Monte um chatbot de IA que atende e vende no seu WhatsApp 24/7, sem programar. Matrículas abertas, vagas limitadas.',
    url: `${SITE}/chatbot-whatsapp`,
    type: 'website',
    locale: 'pt_BR',
    images: ['/og.jpg'],
  },
};

export default function CursoChatbotWhatsapp() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="fixed top-0 left-0 z-50 h-1 bg-indigo/90" id="read-progress" style={{ width: '0%' }} />

      {/* Banner: escassez moderada + âncora de preço (sem destaque de "fundadores") */}
      <div className="bg-ink px-4 py-2 text-center text-[13px] text-sand sm:text-sm">
        <span className="font-semibold">Matrículas abertas · vagas limitadas</span> · de <span className="line-through opacity-70">{PRECO_DE}</span> por <span className="text-citrus font-semibold">{PRECO}</span> · o preço volta a {PRECO_DE} quando as vagas acabarem.
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-sand/85 backdrop-blur">
        <div className="shell flex items-center justify-between py-3">
          <a href="/chatbot-whatsapp" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Curso Chatbot WhatsApp com IA — MSC Academy">
            <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#163300" />
              <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
              <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
            </svg>
            <span className="font-display text-lg">Chatbot <span className="text-sage">WhatsApp</span></span>
          </a>
          <button data-checkout="curso" className="hidden sm:inline-flex items-center gap-1.5 rounded-[10px] bg-amber px-4 py-2 text-sm font-semibold text-[#FFF7F0] hover:bg-amber-deep">
            Quero minha vaga — {PRECO} <span className="arrow">→</span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-aura">
        <div className="shell pt-16 pb-12 sm:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="max-w-[34rem]">
              <p className="eyebrow mb-4">Pra quem perde venda no WhatsApp por não dar conta de responder</p>
              <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-tight sm:text-[3.4rem]">Monte um vendedor que atende no WhatsApp <span className="hl">24 horas por dia</span> — sem contratar programador.</h1>
              <div className="prose-flow mt-7 max-w-[30rem]">
                <p className="lead">O curso que ensina você — mesmo sem saber nada de tecnologia — a criar um chatbot de IA no seu WhatsApp.</p>
                <p>Ele atende na hora, responde as dúvidas de sempre, qualifica o cliente, agenda e encaminha a venda. No piloto automático.</p>
                <p>Sem programar. Sem depender de agência cobrando mensalidade. Com templates prontos pra você partir de algo que já funciona.</p>
              </div>
              <div className="mt-9">
                <button data-checkout="curso" className="btn-amber">QUERO MEU VENDEDOR 24/7 — {PRECO} <span className="arrow">→</span></button>
                <p className="mt-3 text-sm text-ink/55">De <span className="line-through">{PRECO_DE}</span> por <strong className="text-ink">{PRECO}</strong> · acesso imediato · Pix ou 12x · garantia de 7 dias</p>
              </div>
            </div>

            <aside className="card-lit p-7">
              <p className="eyebrow mb-4 text-sage">No fim do curso você sai sabendo</p>
              <ul className="space-y-4 text-[15px] text-ink/85">
                <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-amber"></span><span><strong>Montar o bot do zero</strong> numa ferramenta visual — sem código.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-amber"></span><span><strong>Fazer ele atender e vender</strong> com as informações do seu negócio.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-amber"></span><span><strong>Publicar com segurança</strong> — sem tomar ban e sabendo o custo real.</span></li>
              </ul>
              <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-sage">
                <span>✓ Sem programar</span><span>✓ Templates prontos</span><span>✓ 7 dias de garantia</span>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 01 · ANTES E DEPOIS (texto honesto, sem screenshot fake) */}
      <section className="bg-ink text-sand">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4 text-sand/60">01 · O antes e o depois</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-sand">Não é sobre tecnologia. É sobre parar de perder venda enquanto você dorme.</h2>
            <p className="mt-5 text-lg text-sand/75">O mesmo dia a dia do seu WhatsApp — antes e depois de ter um bot trabalhando por você.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {antesDepois.map(([t, hoje, depois]) => (
              <figure key={t} className="card-dark overflow-hidden p-6">
                <h3 className="font-display text-lg font-semibold text-sand">{t}</h3>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber">Hoje</p>
                  <div className="mt-1.5 space-y-1 text-sm text-sand/70">{hoje.map((l, i) => <p key={i}>{l}</p>)}</div>
                </div>
                <div className="mt-4 border-t border-sand/10 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-citrus">Com seu bot</p>
                  <div className="mt-1.5 space-y-1 text-sm text-sand/85">{depois.map((l, i) => <p key={i}>{l}</p>)}</div>
                </div>
              </figure>
            ))}
          </div>
          <div className="mt-9 text-center">
            <button data-checkout="curso" className="btn-amber">QUERO ISSO NO MEU WHATSAPP <span className="arrow">→</span></button>
            <p className="mt-3 text-sm text-sand/55">De {PRECO_DE} por {PRECO} · vagas limitadas · garantia de 7 dias</p>
          </div>
        </div>
      </section>

      {/* 02 · DOR */}
      <section className="reveal">
        <div className="shell section">
          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-3">
              <span className="deck-no">02</span>
              <p className="eyebrow mt-2 lg:mt-4">Você já vive isto</p>
            </div>
            <div className="prose-flow col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="lead">Seu WhatsApp não para. E nem por isso você vende mais.</p>
              <p>Cliente manda mensagem e quer resposta <em>na hora</em> — senão vai no concorrente.</p>
              <p>Você responde as mesmas perguntas o dia inteiro: preço, horário, "ainda tem?".</p>
              <p>Fora do expediente, ninguém atende. O lead esfria.</p>
              <p>Contratar mais gente é caro. Agência de automação cobra <strong>mensalidade salgada</strong> e te deixa refém.</p>
              <p>E no fim do mês fica a sensação: <strong>quanta venda passou batido só porque ninguém respondeu a tempo?</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · AGITAÇÃO */}
      <section className="sec-line sec-sage reveal">
        <div className="shell section">
          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-3">
              <span className="deck-no">03</span>
              <p className="eyebrow mt-2 lg:mt-4">O que está em jogo</p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-5">
              <h2 className="font-display text-2xl font-bold leading-snug sm:text-3xl">Responder rápido deixou de ser diferencial. Virou o mínimo pra não perder a venda.</h2>
              <ul className="mt-7 space-y-5 text-lg text-ink/85">
                <li><strong className="font-semibold text-ink">Quem responde primeiro, fecha.</strong><br />Enquanto você digita, o cliente já está conversando com outro.</li>
                <li><strong className="font-semibold text-ink">Você é refém do horário.</strong><br />Não pode viajar, dormir ou almoçar sem o caixa parar junto.</li>
                <li><strong className="font-semibold text-ink">A IA já chegou no seu concorrente.</strong><br />O vizinho que automatizou atende 24h com uma pessoa a menos na folha.</li>
              </ul>
              <div className="prose-flow mt-7">
                <p>A boa notícia: montar isso <strong>não é coisa de programador</strong> — não mais.</p>
                <p>Hoje você liga blocos prontos, dá as informações do seu negócio e o bot está no ar.</p>
                <p>O que falta é alguém te mostrar o caminho certo, sem enrolação técnica.</p>
              </div>
            </div>
            <aside className="col-span-3 col-start-10 hidden self-start lg:block lg:sticky lg:top-28">
              <p className="border-l-2 border-sage pl-4 font-display text-lg italic leading-snug text-ink/70">"Quem responde primeiro, fecha. O resto fica vendo a venda ir embora."</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 04 · O QUE VOCÊ VAI CONSTRUIR */}
      <section className="sec-line sec-citrus reveal">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3">04 · O que você vai construir</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Do zero ao bot vendendo — um passo de cada vez.</h2>
            <div className="prose-flow mt-4">
              <p>Cada módulo te deixa um pedaço pronto. No fim, está tudo conectado e rodando no seu WhatsApp.</p>
            </div>
            <div className="mt-9 divide-y divide-ink/12">
              {modulos.map(([n, t, d]) => (
                <div key={n} className="flex gap-5 py-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-citrus/30 font-display text-lg font-bold text-ink shadow-sm">{n}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                    <p className="mt-1.5 text-ink/75">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 · O QUE ESTÁ INCLUSO */}
      <section className="reveal">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3 text-center">05 · Tudo que você leva</p>
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">Não é só vídeo-aula. É o pacote pra você sair com o bot no ar.</h2>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {incluso.map(([t, d]) => (
                <div key={t} className="card p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-2 text-ink/75">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-ink/10 bg-sand-dark p-4 text-[15px] text-ink/80"><strong className="text-ink">Acesso imediato + atualizações inclusas:</strong> você entra, libera o conteúdo na hora e recebe as melhorias do curso sem pagar a mais. As vagas desta turma são limitadas pela mentoria ao vivo.</p>
          </div>
        </div>
      </section>

      {/* 06 · É / NÃO É */}
      <section className="reveal">
        <div className="shell section">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow mb-3 text-center">06 · Pra não ter dúvida</p>
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">O que você leva — e o que isto não é.</h2>
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2">
              <div className="bg-sand p-7">
                <h3 className="mb-4 font-display text-lg font-semibold text-sage">✓ O que É</h3>
                <ul className="space-y-3 text-ink/85">
                  <li>Um curso prático pra montar um chatbot de IA no SEU WhatsApp</li>
                  <li>Pra <strong>dono de negócio leigo</strong> — sem código</li>
                  <li>Com templates prontos por nicho pra acelerar</li>
                  <li>Com comunidade e mentoria pra você não travar</li>
                  <li>Feito por quem opera IA em produção de verdade</li>
                </ul>
              </div>
              <div className="bg-sand p-7">
                <h3 className="mb-4 font-display text-lg font-semibold text-ink/45">✕ O que NÃO é</h3>
                <ul className="space-y-3 text-ink/55">
                  <li>Curso técnico de programação ou de "virar dev"</li>
                  <li>Promessa de "ganhar dinheiro dormindo" sem fazer nada</li>
                  <li>Aula solta de YouTube que para na metade</li>
                  <li>Ferramenta que você assina e ninguém te ensina a usar</li>
                  <li>Macete que toma ban na primeira semana</li>
                </ul>
              </div>
            </div>
            <div className="prose-flow mx-auto mt-7 text-center">
              <p><strong className="text-ink">No fim:</strong> você sai com a habilidade e a ferramenta de atender e vender no automático — e garante sua vaga pelo preço de lançamento antes de as inscrições fecharem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · PRA QUEM É */}
      <section className="border-y border-ink/10 bg-sand-dark reveal">
        <div className="shell section">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow mb-2 text-center">07 · É pra você?</p>
            <p className="mb-8 text-center font-display text-xl italic text-ink/70">Não é pra todo mundo. E tudo bem.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 font-display text-lg font-semibold text-sage">É pra você se…</h3>
                <ul className="space-y-2.5 text-ink/85">
                  <li>Vende ou atende pelo WhatsApp e não dá conta do volume.</li>
                  <li>Perde cliente fora do horário ou por demora pra responder.</li>
                  <li>Tem clínica, loja, delivery, serviço ou é autônomo.</li>
                  <li>Quer automatizar sem contratar gente nem pagar agência.</li>
                  <li>Topa seguir um passo a passo — mesmo sem saber nada de tecnologia.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-display text-lg font-semibold text-ink/45">NÃO é pra você se…</h3>
                <ul className="space-y-2.5 text-ink/55">
                  <li>Procura botão mágico de enriquecer sem trabalhar.</li>
                  <li>Não tem WhatsApp no centro do seu atendimento/venda.</li>
                  <li>Não vai aplicar nem montar o primeiro fluxo.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 · OFERTA */}
      <section className="reveal bg-aura" data-offer="697">
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3 text-center">08 · A oferta</p>
            <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">Preço normal <span className="line-through opacity-60">{PRECO_DE}</span>. Na promoção de lançamento, você entra por <span className="hl">{PRECO}</span>.</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-ink/75">Tudo que você vê abaixo vale mais de R$2.400. O curso completo sai por {PRECO_DE} — e quem entra agora leva por {PRECO}, com o preço travado.</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink/12 bg-sand-dark">
              <table className="w-full text-left text-[15px]">
                <tbody className="divide-y divide-ink/10">
                  <tr><td className="p-4">✅ <strong>Curso completo</strong> — 5 módulos, do zero ao bot vendendo</td><td className="p-4 text-right text-ink/40 line-through">R$1.497</td></tr>
                  <tr><td className="p-4">✅ <strong>Templates de bot prontos</strong> por nicho</td><td className="p-4 text-right text-ink/40 line-through">R$297</td></tr>
                  <tr><td className="p-4">✅ <strong>Comunidade de alunos</strong></td><td className="p-4 text-right text-ink/40 line-through">R$197</td></tr>
                  <tr><td className="p-4">✅ <strong>Mentoria + aulas ao vivo</strong></td><td className="p-4 text-right text-ink/40 line-through">R$497</td></tr>
                  <tr><td className="p-4">🎁 Atualizações do curso, inclusas</td><td className="p-4 text-right text-sage">incluso</td></tr>
                </tbody>
              </table>
            </div>
            <div className="card-lit mt-8 p-8 text-center">
              <p className="text-ink/60">Tudo junto vale <span className="line-through">R$2.488</span> · preço normal <span className="line-through">{PRECO_DE}</span></p>
              <p className="mt-1 text-ink/80">Na promoção de lançamento, à vista ou em até 12x:</p>
              <p className="mt-2 font-display text-6xl font-extrabold text-ink">{PRECO}</p>
              <p className="mt-1 text-sm text-ink/55">Preço de lançamento. Volta pra {PRECO_DE} quando as vagas acabarem.</p>
              <div className="mt-7">
                <button data-checkout="curso" className="btn-amber">QUERO MINHA VAGA — {PRECO} <span className="arrow">→</span></button>
                <p className="mt-3 text-sm text-ink/55">Acesso imediato ao que já saiu · Pix ou 12x · garantia de 7 dias</p>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-xl rounded-xl border border-ink/12 bg-sand-dark p-4 text-center text-sm text-ink/75"><strong className="text-ink">Vagas limitadas:</strong> esta turma é pequena por causa da mentoria ao vivo. Quando as vagas acabam, as inscrições fecham e o preço volta pra {PRECO_DE}.</p>
          </div>
        </div>
      </section>

      {/* 09 · GARANTIA */}
      <section className="sec-line sec-sage reveal">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4 text-center">09 · Garantia</p>
            <svg viewBox="0 0 24 24" className="mx-auto h-14 w-14 text-sage" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" /><path d="M9 12l2 2 4-4" /></svg>
            <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">Entra, assiste, monta. Se não for pra você, eu devolvo.</h2>
            <div className="prose-flow mx-auto mt-5 text-center">
              <p>Você tem 7 dias pra ver as aulas e começar a montar o seu bot.</p>
              <p>Se sentir que não valeu, é só pedir — sem justificar, por qualquer motivo.</p>
              <p>Devolvo 100%. O risco é meu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section className="reveal">
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow mb-3 text-center">10 · Perguntas frequentes</p>
            <div className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
              {faq.map(([q, lines]) => (
                <details key={q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink marker:hidden">
                    <span>{q}</span>
                    <span className="text-xl text-indigo transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="space-y-1.5 pb-4 text-ink/75">{lines.map((l, i) => <p key={i}>{l}</p>)}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11 · CTA FINAL */}
      <section className="reveal bg-aura">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Última parada. Recapitulando o que você leva hoje.</h2>
            <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-ink/85">
              <li className="text-sage">✓ <span className="text-ink/85">Curso completo — do zero ao bot vendendo no WhatsApp</span></li>
              <li className="text-sage">✓ <span className="text-ink/85">Templates de bot prontos por nicho</span></li>
              <li className="text-sage">✓ <span className="text-ink/85">Comunidade de alunos + mentoria ao vivo</span></li>
              <li className="text-sage">✓ <span className="text-ink/85">Atualizações do curso inclusas, sem pagar a mais</span></li>
              <li className="text-sage">✓ <span className="text-ink/85">Garantia de 7 dias · {PRECO} à vista ou 12x</span></li>
            </ul>
            <div className="prose-flow mx-auto mt-7 text-center">
              <p>Cada dia sem responder a tempo é venda indo pro concorrente.</p>
              <p>Você pode montar seu vendedor 24/7 esta semana — e nunca mais perder lead por demora.</p>
            </div>
            <div className="mt-8">
              <button data-checkout="curso" className="btn-amber">QUERO MEU VENDEDOR 24/7 — {PRECO} <span className="arrow">→</span></button>
              <p className="mt-3 text-sm text-ink/55">Acesso imediato · Pix ou 12x · garantia de 7 dias</p>
            </div>
            <div className="prose-flow mx-auto mt-9 text-left font-display text-[15px] italic text-ink/70">
              <p>P.S. — Você não precisa virar técnico. Precisa de um caminho claro.</p>
              <p>Entrar agora é o melhor preço do curso: {PRECO} em vez de {PRECO_DE}.</p>
              <p>Quando as vagas desta turma acabarem, o preço volta pra {PRECO_DE}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 pb-20 sm:pb-0">
        <div className="shell py-10 text-sm text-ink/55">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© 2026 MSC Academy · Curso Chatbot WhatsApp com IA</p>
            <div className="flex gap-5">
              <a href="/" className="hover:text-ink">Arsenal de IA</a>
              <a href="/privacidade" className="hover:text-ink">Privacidade</a>
              <a href="/termos" className="hover:text-ink">Termos</a>
              <a href="#" data-checkout="curso" className="hover:text-ink">Quero minha vaga</a>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-xs text-ink/45">Este curso ensina a montar e operar um chatbot de atendimento/vendas no WhatsApp. Não garantimos resultado financeiro: o retorno depende da aplicação de cada aluno no seu próprio negócio. WhatsApp é marca da Meta, sem vínculo com este curso. Pagamento processado com segurança pela Stripe.</p>
        </div>
      </footer>

      {/* BARRA STICKY MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-sand/95 p-3 backdrop-blur sm:hidden">
        <button data-checkout="curso" className="btn-amber w-full">QUERO MINHA VAGA — {PRECO} <span className="arrow">→</span></button>
      </div>
    </>
  );
}
