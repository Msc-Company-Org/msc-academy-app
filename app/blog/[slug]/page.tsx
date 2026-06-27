import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { getPost, getSlugs } from '@/lib/blog';
import { BlogCover } from '@/components/BlogCover';
import { GateForm } from '@/components/GateForm';
import { SiteHeader } from '@/components/SiteHeader';

export const dynamic = 'force-dynamic'; // lê cookie do gate

const SITE = 'https://app.msc-academy.com.br';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE}/blog/${slug}`;
  const imageUrl = post.cover ? `${SITE}/img/${post.cover}` : `${SITE}/og.jpg`;
  return {
    title: `${post.title} | Arsenal de IA`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      locale: 'pt_BR',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const unlocked = (await cookies()).get('blog_unlock')?.value === '1';

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'MSC Academy' },
    publisher: { '@type': 'Organization', name: 'MSC Academy' },
    mainEntityOfPage: `${SITE}/blog/${slug}`,
    keywords: post.keywords.join(', '),
  };
  const faqLd = post.faq.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
    : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-8">
        <a href="/blog" className="text-sm text-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] hover:underline">← Blog</a>
        <article className="mt-4">
          <BlogCover title={post.title} eyebrow={post.keywords[0]} theme={post.cover} />
          <p className="mt-4 text-sm text-[color-mix(in_srgb,var(--color-ink)_55%,transparent)]">{post.readMin} min de leitura</p>

          <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: post.freeHtml }} />

          {post.hasGate && !unlocked && <GateForm titulo={post.title} />}
          {post.hasGate && unlocked && <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: post.gatedHtml }} />}

          {/* CTA de fundo → isca */}
          <div className="card card-cta mt-10 p-7 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-indigo)]">Da teoria pra prática</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Pega 7 superpoderes de IA prontos, de graça.</h3>
            <p className="mt-2 text-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]">Copia, cola e usa hoje — sem precisar programar.</p>
            <a href="/arsenal-gratis?utm_source=blog&utm_medium=cta&utm_campaign=blog_pilar" className="btn mt-5">QUERO OS 7 GRÁTIS →</a>
          </div>

          {post.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold">Perguntas frequentes</h2>
              <div className="mt-4 divide-y divide-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
                {post.faq.map((f) => (
                  <details key={f.q} className="py-3">
                    <summary className="cursor-pointer font-semibold">{f.q}</summary>
                    <p className="mt-2 text-[color-mix(in_srgb,var(--color-ink)_75%,transparent)]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  );
}

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}
