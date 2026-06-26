'use client';

// Popup de captura "7 do Arsenal" — exibido na página de vendas.
// Gatilho: exit-intent (desktop) / scroll 55% ou 20s (mobile), 1x, anti-irritação por cookie.
import { useCallback, useEffect, useRef, useState } from 'react';
import { track, uuid, getAttribution, getGaClientId } from '@/lib/tracking';

const POPUP_COOKIE = 'arsenal_lead_popup';

const seen = () =>
  /arsenal_lead_popup=(closed|converted)/.test(document.cookie) || /arsenal_lead=/.test(document.cookie);

const setCookie = (v: string, days: number) => {
  const d = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${POPUP_COOKIE}=${v}; expires=${d}; path=/; SameSite=Lax`;
};

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const firedRef = useRef(false);
  const startedRef = useRef(false);
  const isOpenRef = useRef(false);
  const loadedAtRef = useRef(0);

  const openPopup = useCallback(() => {
    if (firedRef.current || seen() || Date.now() - loadedAtRef.current < 8000) return;
    firedRef.current = true;
    isOpenRef.current = true;
    setIsOpen(true);
    track('view_lead_popup', { surface: 'sales_page' });
  }, []);

  const closePopup = useCallback((converted = false) => {
    isOpenRef.current = false;
    setIsOpen(false);
    if (!converted) {
      setCookie('closed', 7);
      track('dismiss_lead_popup', { surface: 'sales_page' });
    }
  }, []);

  // gatilhos de abertura + Escape
  useEffect(() => {
    loadedAtRef.current = Date.now();
    const cleanups: Array<() => void> = [];

    const isMobile = matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const onScroll = () => {
        const pct = scrollY / (document.body.scrollHeight - innerHeight);
        if (pct >= 0.55) openPopup();
      };
      addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => removeEventListener('scroll', onScroll));
      const t = setTimeout(openPopup, 20000);
      cleanups.push(() => clearTimeout(t));
    } else {
      let armed = false;
      const onMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 0 && !e.relatedTarget) openPopup();
      };
      document.addEventListener('mouseout', onMouseOut);
      cleanups.push(() => document.removeEventListener('mouseout', onMouseOut));
      const t = setTimeout(() => {
        armed = true;
      }, 40000);
      cleanups.push(() => clearTimeout(t));
      const onWheel = (e: WheelEvent) => {
        if (armed && e.deltaY < 0) openPopup();
      };
      addEventListener('wheel', onWheel, { passive: true });
      cleanups.push(() => removeEventListener('wheel', onWheel));
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenRef.current) closePopup();
    };
    addEventListener('keydown', onKey);
    cleanups.push(() => removeEventListener('keydown', onKey));

    return () => cleanups.forEach((c) => c());
  }, [openPopup, closePopup]);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closePopup();
  };

  const onFormFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form_id: 'optin_popup', surface: 'sales_page' });
    }
  };

  const onSeeOffer = () => {
    closePopup(true);
    document.querySelector('[data-offer]')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const event_id = uuid();
    setBusy(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fd.get('email'),
          phone: fd.get('phone'),
          profissao: fd.get('profissao'),
          isca: 'arsenal-7',
          variant: 'A',
          source_surface: 'popup',
          sample: '7-do-arsenal',
          event_id,
          client_id: getGaClientId(),
          attribution: getAttribution(),
          fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1],
          fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1],
        }),
      });
    } catch {
      /* segue mesmo se a API falhar */
    }
    track('generate_lead', {
      value: 5,
      currency: 'BRL',
      lead_source: 'popup',
      form_id: 'optin_popup',
      method: 'email',
      event_id,
      sample: '7-do-arsenal',
      isca: 'arsenal-7',
      variant: 'A',
    });
    setCookie('converted', 180);
    setSuccess(true);
  };

  return (
    <div
      id="arsenal-popup"
      className={`popup-overlay${isOpen ? ' is-open' : ''}`}
      aria-hidden={!isOpen}
      onClick={onOverlayClick}
    >
      <div className="popup-card" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button
          id="popup-close-x"
          type="button"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"
          aria-label="Fechar"
          onClick={() => closePopup()}
        >
          ✕
        </button>

        {/* estado: oferta */}
        <div id="popup-offer" className={success ? 'hidden' : undefined}>
          <p className="eyebrow mb-3">Amostra grátis do arsenal</p>
          <h2 id="popup-title" className="font-display text-2xl font-extrabold leading-tight">
            Leva 7 peças do Arsenal pra testar. De graça, agora.
          </h2>
          <div className="prose-flow mt-3 text-[15px]">
            <p>São 7 assets que eu uso em produção — os mesmos do produto pago.</p>
            <p>Você copia, cola e roda hoje.</p>
          </div>
          <ul className="mt-4 space-y-2 text-[15px] text-ink/85">
            <li className="text-sage">✓ <span className="text-ink/85">3 templates da SUA profissão, prontos pra adaptar.</span></li>
            <li className="text-sage">✓ <span className="text-ink/85">2 fluxos que encadeiam IA (não é prompt solto).</span></li>
            <li className="text-sage">✓ <span className="text-ink/85">1 skill avançada + 1 página do Método P.R.O.©.</span></li>
          </ul>
          <form id="popup-form" className="mt-5 space-y-3" onSubmit={onSubmit} onFocus={onFormFocus}>
            <select name="profissao" className="select" required aria-label="Sua área">
              <option value="">Sua área…</option>
              <option>Vendas / Comercial</option>
              <option>Atendimento / Suporte</option>
              <option>Conteúdo / Social Media</option>
              <option>Escritório / Administrativo</option>
              <option>Freelancer / Serviços</option>
              <option>Estudo / Concurso / Carreira</option>
              <option>Outra</option>
            </select>
            <input name="email" type="email" autoComplete="email" placeholder="Seu melhor e-mail" className="input" required aria-label="E-mail" />
            <input name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp (com DDD)" className="input" required aria-label="WhatsApp" />
            <button type="submit" className="btn-amber w-full" disabled={busy} aria-busy={busy}>
              QUERO AS 7 PEÇAS GRÁTIS <span className="arrow">→</span>
            </button>
            <p id="popup-msg" className="field-error hidden text-center"></p>
            <p className="text-center text-xs text-ink/50">Sem cartão. Sem spam. Sai quando quiser.</p>
          </form>
          <button
            id="popup-close-link"
            type="button"
            className="mt-3 block w-full text-center text-sm text-ink/50 hover:text-ink/70"
            onClick={() => closePopup()}
          >
            Agora não, obrigado
          </button>
        </div>

        {/* estado: sucesso */}
        <div id="popup-success" className={success ? 'text-center' : 'hidden text-center'}>
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-sage/15 text-2xl">✅</div>
          <h2 className="font-display text-xl font-bold">Pronto. As 7 peças já estão indo.</h2>
          <div className="prose-flow mx-auto mt-3 text-center text-[15px]">
            <p>Confere seu e-mail e WhatsApp.</p>
            <p>Enquanto chega, dá uma olhada no Arsenal completo aqui embaixo.</p>
          </div>
          <button id="popup-see-offer" type="button" className="btn-ghost mt-5 w-full justify-center" onClick={onSeeOffer}>
            Ver o Arsenal completo →
          </button>
        </div>
      </div>
    </div>
  );
}
