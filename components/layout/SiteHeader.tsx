'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { NgfSiteContent } from '@/lib/ngf'

interface Props {
  content: NgfSiteContent
}

const aboutLinks = [
  { href: '/team', label: 'Our Team' },
  { href: '/showcase', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
]

/** Scroll distance (px) ignored before we start hiding, so small nudges don't flicker. */
const HIDE_THRESHOLD = 8
/**
 * Never hide the nav tier while within this distance of the top.
 *
 * Must stay comfortably above COLLAPSE_AT + the utility tier's height (80 + 48),
 * otherwise the scroll jump caused by that tier collapsing reads as a large
 * downward delta and yanks the nav out of view.
 */
const TOP_ZONE = 160
/**
 * The utility tier uses hysteresis — two thresholds with a dead zone between
 * them — rather than a single cutoff.
 *
 * The tier sits in the layout flow, so expanding it makes the document ~40px
 * taller and the browser compensates the scroll offset. With one threshold that
 * compensation pushes the offset straight back across the line, collapsing the
 * tier, which shifts the layout back again: the bar visibly flickers. Requiring
 * a return to the very top to expand, but a decent scroll to collapse, means no
 * layout shift can ever bounce it across both thresholds.
 */
const EXPAND_AT = 8
const COLLAPSE_AT = 80

export function SiteHeader({ content }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const lastY = useRef(0)

  const brandName = content['brand.businessName'] || 'Perrine Interiors'
  const email = content['brand.email'] || 'perrinematerials@gmail.com'

  // The two tiers behave independently:
  //   • utility tier — visible only while at the very top of the page
  //   • nav tier     — hides on scroll down, returns on any scroll up
  // Uses a ref (not state) for the previous offset so the listener never reads
  // a stale value, and rAF-throttles to stay off the scroll path.
  useEffect(() => {
    lastY.current = window.scrollY
    setAtTop(window.scrollY <= EXPAND_AT)
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY.current

      // Hysteresis: once expanded, stay expanded until well clear of the top;
      // once collapsed, only re-expand at the very top. Functional update so we
      // read the live value without re-subscribing the listener.
      setAtTop(prev => (prev ? y <= COLLAPSE_AT : y <= EXPAND_AT))

      if (Math.abs(delta) > HIDE_THRESHOLD) {
        // Any upward scroll reveals immediately; near the top always reveals.
        if (delta < 0 || y < TOP_ZONE) setHidden(false)
        else setHidden(true)
        lastY.current = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // An open mobile menu must never scroll out of reach.
  useEffect(() => {
    if (mobileOpen) setHidden(false)
  }, [mobileOpen])

  const navLinkClass = (href: string) =>
    `py-1 text-[0.78rem] uppercase tracking-[0.14em] border-b transition-colors ${
      pathname === href
        ? 'border-[var(--ink)] text-[var(--ink)]'
        : 'border-transparent text-[var(--ink)] hover:border-[var(--ink)]'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--line)] bg-white transition-transform duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Utility tier — shown only while at the very top of the page */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          atTop ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-end gap-5 px-4 h-10">
          <a
            href={`mailto:${email}`}
            className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            data-ngf-field="brand.email"
            data-ngf-label="Email Address"
            data-ngf-type="text"
            data-ngf-section="Brand"
          >
            {email}
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-[var(--line)]" />
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-4">
        {/* Wordmark row — centred; the mobile Menu button is positioned out of
            flow so the wordmark stays optically centred on every breakpoint. */}
        <div className="relative flex h-[62px] items-center justify-center">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-xl text-[var(--ink)] whitespace-nowrap"
          data-ngf-field="brand.businessName"
          data-ngf-label="Business Name"
          data-ngf-type="text"
          data-ngf-section="Brand"
        >
          {brandName}
        </Link>

        {/* Mobile toggle — word, not a hamburger icon */}
        <button
          className="md:hidden absolute right-0 border border-[var(--line)] bg-white text-[var(--ink)] px-4 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px]"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
        </div>

        {/* Desktop nav — centred beneath the wordmark */}
        <nav className="hidden md:flex items-center justify-center gap-7 pb-4" aria-label="Primary">
          <Link href="/" className={navLinkClass('/')}>Home</Link>
          <Link href="/staging" className={navLinkClass('/staging')}>Services</Link>
          <Link href="/consultations" className={navLinkClass('/consultations')}>Consultations</Link>

          {/* About dropdown — text only, no icon */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 py-1 text-[0.78rem] uppercase tracking-[0.14em] border-b border-transparent text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
              aria-haspopup="true"
            >
              About
              {/* Caret drawn in CSS (a rotated corner), not an icon asset.
                  Flips to point up while the menu is open. */}
              <span
                aria-hidden="true"
                className="inline-block w-[5px] h-[5px] border-r border-b border-current -translate-y-[2px] rotate-45 transition-transform duration-200 group-hover:translate-y-[1px] group-hover:rotate-[225deg]"
              />
            </button>
            <div className="hidden group-hover:grid absolute top-full left-1/2 -translate-x-1/2 min-w-[190px] bg-white border border-[var(--line)] p-2 z-50 gap-1">
              {aboutLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 text-[0.78rem] uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                    pathname === l.href
                      ? 'bg-[#f4f4f4] text-[var(--ink)]'
                      : 'text-[var(--ink)] hover:bg-[#f4f4f4]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
        </nav>

      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute right-4 top-[calc(100%+6px)] w-[min(360px,calc(100%-2rem))] bg-white border border-[var(--line)] p-2 flex flex-col gap-1 z-50"
        >
          {[
            { href: '/', label: 'Home' },
            { href: '/staging', label: 'Services' },
            { href: '/consultations', label: 'Consultations' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px] flex items-center transition-colors ${
                pathname === l.href ? 'bg-[#f4f4f4]' : 'hover:bg-[#f4f4f4]'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* About accordion — text state, no chevron */}
          <button
            className="px-3 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px] flex items-center justify-between text-left hover:bg-[#f4f4f4] transition-colors"
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen(v => !v)}
          >
            <span>About</span>
            <span
              aria-hidden="true"
              className={`inline-block w-[5px] h-[5px] border-r border-b border-current mr-1 transition-transform duration-200 ${
                aboutOpen ? 'translate-y-[1px] rotate-[225deg]' : '-translate-y-[2px] rotate-45'
              }`}
            />
          </button>
          {aboutOpen && (
            <div className="pl-4 flex flex-col gap-1">
              {aboutLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px] flex items-center transition-colors ${
                    pathname === l.href ? 'bg-[#f4f4f4]' : 'hover:bg-[#f4f4f4]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className={`px-3 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px] flex items-center transition-colors ${
              pathname === '/contact' ? 'bg-[#f4f4f4]' : 'hover:bg-[#f4f4f4]'
            }`}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
