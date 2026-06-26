import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <Link href="/blog" className="flex items-center gap-2.5 font-semibold" aria-label="Arsenal de IA — MSC Academy">
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#163300" />
            <path d="M7.6 24.2 L16 7.2 L24.4 24.2" fill="none" stroke="#FAF7F0" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10.8" y="17.2" width="10.4" height="2.7" rx="1.35" fill="#9FE870" />
            <circle cx="16" cy="7.2" r="2.5" fill="#FF4F40" />
          </svg>
          <span className="font-display text-lg">Arsenal <span className="text-[var(--color-sage)]">de IA</span></span>
        </Link>
        <a href="https://arsenal.msc-academy.com.br/arsenal-gratis" className="btn text-sm">Pega 7 grátis →</a>
      </div>
    </header>
  );
}
