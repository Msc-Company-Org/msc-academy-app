import type { Metadata } from 'next';
import { ProntoArsenalClient } from './pronto-client';

export const metadata: Metadata = {
  title: 'Pronto! Suas 7 peças estão a caminho — MSC Academy',
  robots: { index: false, follow: false },
};

export default function ProntoArsenalPage() {
  return <ProntoArsenalClient />;
}
