import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { TrackingInit } from "@/components/TrackingInit";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-P4P7R35C";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-C2HZX6SQ9Q";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.msc-academy.com.br"),
  title: "Arsenal de IA — superpoderes de IA prontos, sem programar | MSC Academy",
  description:
    "Arsenal de IA: superpoderes, templates, fluxos e skills de IA prontos e testados, do básico ao avançado, + o Método P.R.O.© pra adaptar tudo. Sem codar.",
};

const consentDefault = `
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;
gtag('consent', 'default', { ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied', functionality_storage:'granted', security_storage:'granted', wait_for_update:500 });`;

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const gaInit = `window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${GA_ID}');`;

const fbPixel = FB_PIXEL_ID
  ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`
  : "";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#163300" />
        <script dangerouslySetInnerHTML={{ __html: consentDefault }} />
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaInit }} />
        {fbPixel && <script dangerouslySetInnerHTML={{ __html: fbPixel }} />}
      </head>
      <body className="min-h-full">
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {children}

        {/* Banner de consentimento (LGPD) — initPage() liga os botões */}
        <div id="consent-banner" className="hidden fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-[color-mix(in_srgb,var(--color-sand-dark)_97%,#fff)] backdrop-blur border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm text-[color-mix(in_srgb,var(--color-ink)_80%,transparent)]">
            <p className="flex-1">Usamos cookies para medir e melhorar sua experiência. Veja a <a href="/privacidade" className="underline text-[var(--color-indigo)]">Política de Privacidade</a>.</p>
            <div className="flex gap-2 shrink-0">
              <button id="consent-decline" className="px-4 py-2 rounded-lg border border-[color-mix(in_srgb,var(--color-ink)_15%,transparent)]">Recusar</button>
              <button id="consent-accept" className="px-4 py-2 rounded-lg bg-[var(--color-ink)] text-[var(--color-sand)] font-semibold">Aceitar</button>
            </div>
          </div>
        </div>

        <TrackingInit />
      </body>
    </html>
  );
}
