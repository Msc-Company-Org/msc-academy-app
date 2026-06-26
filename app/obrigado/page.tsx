import type { Metadata } from 'next';
import { PurchaseTracker } from '@/components/PurchaseTracker';

export const metadata: Metadata = {
  title: 'Obrigado! — MSC Academy',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://app.msc-academy.com.br/obrigado' },
};

export default function Obrigado() {
  return (
    <>
      <PurchaseTracker />
      <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 text-center">
        <div>
          <svg viewBox="0 0 24 24" className="mx-auto h-14 w-14 text-sage" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
          <h1 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">Compra confirmada. Bem-vindo!</h1>
          <p className="mt-4 text-lg text-ink/80">Seu acesso ao <strong className="text-ink">Arsenal de IA</strong> foi liberado. Verifique seu e-mail e WhatsApp — enviamos o link da área de membros.</p>
          <p className="mt-2 text-sm text-ink/55">Não chegou em 5 min? Olhe o spam ou fale com a gente.</p>
          <a href="/" className="btn-ghost mt-8">Voltar ao início</a>
        </div>
      </section>
    </>
  );
}
