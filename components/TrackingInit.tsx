'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initPage } from '@/lib/tracking';

/** Roda o initPage() (atribuição, page_view, consent, reveal, CTAs de checkout, scroll) por rota. */
export function TrackingInit() {
  const pathname = usePathname();
  useEffect(() => { initPage(); }, [pathname]);
  return null;
}
