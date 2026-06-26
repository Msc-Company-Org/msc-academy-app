import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Descadastro — MSC Academy',
  robots: { index: false, follow: false },
};

export default async function Descadastro({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  const email = e ? decodeURIComponent(e) : '';

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <section className="card max-w-xl p-8 text-center">
        <p className="eyebrow mb-3">Preferências de e-mail</p>
        <h1 className="font-display text-3xl font-extrabold">Descadastro recebido.</h1>
        <p className="mt-4 text-ink/75">
          {email ? <>Registramos a solicitação para <strong>{email}</strong>.</> : 'Registramos sua solicitação.'}
        </p>
        <p className="mt-3 text-sm text-ink/60">
          Se você continuar recebendo mensagens por alguns minutos, é só aguardar a fila de envio atualizar. Para falar com a gente, responda qualquer e-mail da MSC Academy.
        </p>
        <a href="/" className="btn-ghost mt-7">Voltar ao site</a>
      </section>
    </main>
  );
}
