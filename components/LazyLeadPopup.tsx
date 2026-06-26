'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LeadPopup = dynamic(() => import('./LeadPopup'), { ssr: false });

/**
 * Adia o popup de captura para depois do primeiro paint/idle.
 * O gatilho real do popup já espera 8s+, então não precisa entrar no bundle inicial da landing.
 */
export function LazyLeadPopup() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const schedule = window.requestIdleCallback || ((cb: IdleRequestCallback) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback || ((id: number) => window.clearTimeout(id));
    const id = schedule(() => setReady(true), { timeout: 2500 });
    return () => cancel(id);
  }, []);

  return ready ? <LeadPopup /> : null;
}
