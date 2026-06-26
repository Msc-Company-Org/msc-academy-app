import type { MetadataRoute } from 'next';
import { getAllMeta } from '@/lib/blog';

const SITE = process.env.PUBLIC_SITE_URL || 'https://app.msc-academy.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/arsenal-gratis`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/quiz`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/termos`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const posts: MetadataRoute.Sitemap = getAllMeta().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00-03:00`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
