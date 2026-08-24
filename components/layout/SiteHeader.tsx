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
/** Never hide while within this distance of the top of the page. */
const TOP_ZONE = 120

export function SiteHeader({ content }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  const brandName = content['brand.businessName'] || 'Perrine Interiors'

  // Hide the bar when scrolling down, bring it straight back on any upward
  // movement. Uses a ref (not state) for the previous offset so the listener
  // never reads a stale value, and rAF-throttles to stay off the scroll path.
  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY.current

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
      <div className="mx-auto flex h-[78px] w-full max-w-[1120px] items-center justify-between gap-4 px-4">
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          <Link href="/" className={navLinkClass('/')}>Home</Link>
          <Link href="/staging" className={navLinkClass('/staging')}>Services</Link>
          <Link href="/consultations" className={navLinkClass('/consultations')}>Consultations</Link>

          {/* About dropdown — text only, no icon */}
          <div className="relative group">
            <button
              className="py-1 text-[0.78rem] uppercase tracking-[0.14em] border-b border-transparent text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
              aria-haspopup="true"
            >
              About
            </button>
            <div className="hidden group-hover:grid absolute top-full left-0 min-w-[190px] bg-white border border-[var(--line)] p-2 z-50 gap-1">
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

        {/* Mobile toggle — word, not a hamburger icon */}
        <button
          className="md:hidden border border-[var(--line)] bg-white text-[var(--ink)] px-4 text-[0.78rem] uppercase tracking-[0.14em] min-h-[44px]"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
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
            <span className="text-[var(--muted)] normal-case tracking-normal text-[0.72rem]">
              {aboutOpen ? 'Hide' : 'Show'}
            </span>
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
