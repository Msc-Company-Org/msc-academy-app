import Image from 'next/image';

// Capa do blog: imagem (se `theme` for um caminho /img/...) OU gradiente on-brand gerado por código.
const THEMES: Record<string, { from: string; to: string; glow: string }> = {
  forest: { from: '#163300', to: '#2c4d12', glow: '#9FE870' },
  citrus: { from: '#1c3d04', to: '#3a5a16', glow: '#9FE870' },
  coral: { from: '#163300', to: '#3a1a14', glow: '#FF4F40' },
  sage: { from: '#27331c', to: '#4a5a30', glow: '#9FE870' },
};

export function BlogCover({ title, eyebrow, theme = 'forest', compact = false }: {
  title: string; eyebrow?: string; theme?: string; compact?: boolean;
}) {
  const isImage = theme.startsWith('/');
  const t = THEMES[theme] || THEMES.forest;
  const pad = compact ? 'p-6' : 'p-8 sm:p-12';
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${pad}`}
      style={isImage ? undefined : { background: `radial-gradient(120% 90% at 85% -10%, ${t.glow}33, transparent 55%), linear-gradient(135deg, ${t.from}, ${t.to})` }}
    >
      {isImage && (
        <>
          <Image src={theme} alt="" fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority={!compact} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f00f2] via-[#0d1f00aa] to-[#0d1f0055]" />
        </>
      )}
      <div className="relative">
        <div className="absolute right-1 top-1 opacity-90">
          <svg viewBox="0 0 32 32" className={compact ? 'h-7 w-7' : 'h-10 w-10'} aria-hidden>
            <rect width="32" height="32" rx="8" fill="#FAF7F0" fillOpacity="0.12" />
            <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
            <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
          </svg>
        </div>
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#9FE870]">{eyebrow}</p>}
        <h1 className={`font-display font-extrabold leading-[1.08] text-[#FAF7F0] ${compact ? 'text-xl' : 'text-2xl sm:text-4xl'}`}>{title}</h1>
        <p className="mt-4 text-sm font-semibold text-[#FAF7F0]/70">Arsenal de IA · MSC Academy</p>
      </div>
    </div>
  );
}
