import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel · Arsenal de IA",
  robots: { index: false, follow: false },
};

export default function PainelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
