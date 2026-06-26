'use client';
import { useState } from 'react';

/** Botão "Copiar" → clipboard. Recebe o texto explícito (Server Component passa o prompt/código). */
export function CopyButton({ text, className = 'copy-btn text-sm font-semibold text-amber' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      {copied ? 'Copiado ✓' : 'Copiar'}
    </button>
  );
}
