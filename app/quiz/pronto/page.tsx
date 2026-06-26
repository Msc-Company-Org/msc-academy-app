import type { Metadata } from 'next';
import { ProntoQuizClient } from './pronto-client';

export const metadata: Metadata = {
  title: 'Pronto! Seu superpoder está a caminho — MSC Academy',
  robots: { index: false, follow: false },
};

export default function ProntoQuizPage() {
  return <ProntoQuizClient />;
}
