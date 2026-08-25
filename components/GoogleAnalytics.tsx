'use client'
import Script from 'next/script'
import { hasCookieConsent } from '@/components/CookieConsent'

/**
 * GA4, gated on cookie consent.
 *
 * GA4 sets cookies, so it must not load until the visitor accepts — mounting
 * gtag unconditionally is a compliance problem regardless of how the banner
 * behaves. CookieConsent reloads the page on Accept, so this re-evaluates and
 * GA loads on the next render.
 *
 * Requires BOTH env vars (see .env.local.example):
 *   NEXT_PUBLIC_GA_ID            — the client's own GA4 measurement ID
 *   NEXT_PUBLIC_COOKIE_ANALYTICS — must be "1", or the banner never renders,
 *                                  consent can never be granted, and analytics
 *                                  silently never load.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id || !hasCookieConsent()) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</Script>
    </>
  )
}
