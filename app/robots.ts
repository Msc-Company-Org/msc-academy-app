import type { MetadataRoute } from 'next';

const SITE = process.env.PUBLIC_SITE_URL || 'https://app.msc-academy.com.br';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/painel', '/obrigado'],
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
