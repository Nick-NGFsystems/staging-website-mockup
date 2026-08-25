'use client'
import { resetCookieConsent } from '@/components/CookieConsent'

/**
 * Lets a visitor change a stored cookie choice. Required by NGF-STANDARDS:
 * consent must be as easy to withdraw as it is to give, so this has to be
 * reachable from every page (it lives in the footer).
 *
 * Renders nothing unless cookie-based analytics are actually enabled —
 * otherwise the site would offer settings for a banner that never appears.
 */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  if (process.env.NEXT_PUBLIC_COOKIE_ANALYTICS !== '1') return null

  return (
    <button type="button" onClick={resetCookieConsent} className={className}>
      Cookie Settings
    </button>
  )
}
