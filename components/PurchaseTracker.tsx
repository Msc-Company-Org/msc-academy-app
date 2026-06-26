'use client';
import { useEffect } from 'react';
import { track } from '@/lib/tracking';

/**
 * Dispara o evento de compra (purchase) na página de obrigado.
 * Stripe manda session_id no success_url; usamos como transaction_id/event_id
 * (mesmo id do webhook → dedup no GA4 e no Meta). Value padrão = lote de fundador.
 */
export function PurchaseTracker() {
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const sid = sp.get('session_id') || sp.get('order_id') || sp.get('transaction_id');
    const value = Number(sp.get('value') || 97);
    if (sid) {
      track('purchase', {
        transaction_id: sid, value, currency: 'BRL', event_id: sid,
        items: [{ item_id: 'arsenal-de-ia-97', item_name: 'Arsenal de IA', price: value, quantity: 1 }],
      });
    }
  }, []);
  return null;
}
