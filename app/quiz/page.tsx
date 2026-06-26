import type { Metadata } from 'next';
import { QuizClient } from './quiz-client';

const desc =
  'Responda 6 perguntas (1 min) e descubra qual superpoder de IA vai destravar o seu trabalho — com um mini-arsenal personalizado, grátis. Sem precisar programar.';

export const metadata: Metadata = {
  title: 'Quiz: descubra seu superpoder de IA | MSC Academy',
  description: desc,
  alternates: { canonical: 'https://app.msc-academy.com.br/quiz' },
  openGraph: {
    title: 'Quiz: descubra seu superpoder de IA | MSC Academy',
    description: desc,
    url: 'https://app.msc-academy.com.br/quiz',
    images: ['/og.jpg'],
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
