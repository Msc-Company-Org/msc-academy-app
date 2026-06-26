import type { Metadata } from 'next';
import { ArsenalGratisClient } from './arsenal-gratis-client';

const desc =
  '7 superpoderes de IA prontos, grátis: 3 templates da sua profissão + 2 fluxos + 1 skill + o Método P.R.O.©. Copia, cola e usa hoje, sem codar. Amostra do Arsenal de IA.';

export const metadata: Metadata = {
  title: '7 superpoderes de IA prontos, grátis (sem codar) | MSC Academy',
  description: desc,
};

export default function ArsenalGratisPage() {
  return <ArsenalGratisClient />;
}
