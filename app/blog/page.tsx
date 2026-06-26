import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllMeta } from '@/lib/blog';
import { BlogCover } from '@/components/BlogCover';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Blog do Arsenal de IA — superpoderes de IA sem programar | MSC Academy',
  description: 'Guias práticos pra usar IA no trabalho sem saber programar: superpoderes, prompts prontos, agentes, MCP, memória e RAG explicados pra gente normal.',
  alternates: { canonical: 'https://app.msc-academy.com.br/blog' },
};

const fmtDate = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export default function BlogIndex() {
  const posts = getAllMeta();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-indigo)]">Blog</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Superpoderes de IA, explicados sem enrolação.</h1>
        <p className="mt-3 max-w-xl text-lg text-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]">
          Como usar IA no trabalho de verdade — sem precisar programar. Direto ao ponto, pra copiar e usar hoje.
        </p>

        <div className="mt-10 space-y-8">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <BlogCover title={p.title} eyebrow={p.keywords[0]} theme={p.cover} compact />
              <div className="mt-3">
                <p className="text-sm text-[color-mix(in_srgb,var(--color-ink)_55%,transparent)]">{fmtDate(p.date)} · {p.readMin} min de leitura</p>
                <p className="mt-1 text-[color-mix(in_srgb,var(--color-ink)_80%,transparent)]">{p.description}</p>
                <span className="mt-2 inline-block font-semibold text-[var(--color-amber)] group-hover:underline">Ler →</span>
              </div>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-[color-mix(in_srgb,var(--color-ink)_55%,transparent)]">Em breve, os primeiros guias.</p>}
        </div>
      </main>
    </>
  );
}
