// Capa on-brand (Tinta Floresta), gerada por código — sem depender de imagem externa.
// Você troca por foto real / Nano Banana depois, só editando o frontmatter do post.

const THEMES: Record<string, { from: string; to: string; glow: string }> = {
  forest: { from: '#163300', to: '#2c4d12', glow: '#9FE870' },
  citrus: { from: '#1c3d04', to: '#3a5a16', glow: '#9FE870' },
  coral: { from: '#163300', to: '#3a1a14', glow: '#FF4F40' },
  sage: { from: '#27331c', to: '#4a5a30', glow: '#9FE870' },
};

export function BlogCover({ title, eyebrow, theme = 'forest', compact = false }: {
  title: string; eyebrow?: string; theme?: string; compact?: boolean;
}) {
  const t = THEMES[theme] || THEMES.forest;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${compact ? 'p-6' : 'p-8 sm:p-12'}`}
      style={{ background: `radial-gradient(120% 90% at 85% -10%, ${t.glow}33, transparent 55%), linear-gradient(135deg, ${t.from}, ${t.to})` }}
    >
      <div className="absolute right-5 top-5 opacity-90">
        <svg viewBox="0 0 32 32" className={compact ? 'h-7 w-7' : 'h-10 w-10'} aria-hidden>
          <rect width="32" height="32" rx="8" fill="#FAF7F0" fillOpacity="0.12" />
          <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill={t.glow} />
          <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
        </svg>
      </div>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: t.glow }}>{eyebrow}</p>
      )}
      <h1 className={`font-display font-extrabold leading-[1.08] text-[#FAF7F0] ${compact ? 'text-xl' : 'text-2xl sm:text-4xl'}`}>
        {title}
      </h1>
      <p className="mt-4 text-sm font-semibold text-[#FAF7F0]/70">Arsenal de IA · MSC Academy</p>
    </div>
  );
}
