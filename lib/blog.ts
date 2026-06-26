import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'blog');

export type Faq = { q: string; a: string };
export type PostMeta = {
  slug: string; title: string; description: string; keywords: string[];
  date: string; cover: string; readMin: number; faq: Faq[];
};
export type Post = PostMeta & { freeHtml: string; gatedHtml: string; hasGate: boolean };

marked.setOptions({ gfm: true, breaks: false });

export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export function getPost(slug: string): Post | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const parts = content.split(/<!--\s*gate\s*-->/);
  const free = parts[0];
  const gated = parts.slice(1).join('\n');
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    keywords: data.keywords || [],
    date: data.date || '2026-01-01',
    cover: data.cover || 'forest',
    readMin: Math.max(2, Math.round(words / 200)),
    faq: data.faq || [],
    freeHtml: marked.parse(free) as string,
    gatedHtml: gated ? (marked.parse(gated) as string) : '',
    hasGate: parts.length > 1,
  };
}

export function getAllMeta(): PostMeta[] {
  return getSlugs()
    .map((s) => getPost(s))
    .filter((p): p is Post => !!p)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ freeHtml: _f, gatedHtml: _g, hasGate: _h, ...meta }) => meta);
}
