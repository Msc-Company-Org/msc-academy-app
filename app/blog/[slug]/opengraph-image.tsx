import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';

export const runtime = 'nodejs'; // getPost lê arquivos
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Arsenal de IA — MSC Academy';

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title || 'Arsenal de IA';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '72px', color: '#FAF7F0', fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(120% 90% at 85% -10%, rgba(159,232,112,0.22), transparent 55%), linear-gradient(135deg, #163300, #2c4d12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 700 }}>Arsenal de IA · MSC Academy</div>
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, lineHeight: 1.12, maxWidth: 980 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#9FE870' }}>superpoderes de IA — sem programar</div>
      </div>
    ),
    size,
  );
}
