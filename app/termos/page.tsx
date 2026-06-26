import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso — MSC Academy',
  description: 'Termos de uso do Arsenal de IA da MSC Academy.',
  alternates: { canonical: 'https://app.msc-academy.com.br/termos' },
};

export default function Termos() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-3xl font-extrabold">Termos de Uso</h1>
      <div className="mt-8 space-y-6 text-ink/85">
        <p>Ao adquirir o <strong>Arsenal de IA</strong>, você concorda com os termos abaixo. [SUP] Revisar com apoio jurídico.</p>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">1. O produto</h2>
          <p className="mt-2">Produto digital: biblioteca de assets de IA (templates, fluxos, hooks e superpowers) + o Método P.R.O.©, com acesso online vitalício à área de membros após confirmação do pagamento via Stripe.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">2. Garantia e reembolso</h2>
          <p className="mt-2">Garantia incondicional de 7 dias a partir da compra: solicite o reembolso pelo e-mail de suporte e devolvemos 100% do valor, conforme o Código de Defesa do Consumidor.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">3. Sem promessa de renda</h2>
          <p className="mt-2">Este produto entrega uma habilidade e ferramentas (engenharia de prompt). Não garantimos resultados financeiros — eles dependem da aplicação individual de cada aluno.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">4. Propriedade intelectual</h2>
          <p className="mt-2">O conteúdo é de uso pessoal e intransferível. É proibida a redistribuição, cópia ou revenda sem autorização.</p>
        </section>
      </div>
      <p className="mt-10"><a href="/" className="text-indigo underline">← Voltar</a></p>
    </article>
  );
}
