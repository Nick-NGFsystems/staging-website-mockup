'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NgfSiteContent } from '@/lib/ngf'

interface Props {
  content: NgfSiteContent
}

const aboutLinks = [
  { href: '/consultations', label: 'Consultations' },
  { href: '/team', label: 'Our Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
]

export function SiteHeader({ content }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const brandName = content['brand.businessName'] || 'Perrine Interiors'

  const navLinkClass = (href: string) =>
    `py-1 px-0.5 text-[0.95rem] border-b-2 transition-colors ${
      pathname === href
        ? 'border-[var(--brand)] text-[var(--brand)]'
        : 'border-transparent text-[#2e2e2e] hover:text-[var(--brand)] hover:border-[var(--brand)]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/96 backdrop-blur-sm">
      <div className="mx-auto flex h-[78px] w-full max-w-[1120px] items-center justify-between gap-4 px-4">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-xl text-[var(--brand-dark)] whitespace-nowrap"
          data-ngf-field="brand.businessName"
          data-ngf-label="Business Name"
          data-ngf-type="text"
          data-ngf-section="Brand"
        >
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4" aria-label="Primary">
          <Link href="/" className={navLinkClass('/')}>Home</Link>
          <Link href="/showcase" className={navLinkClass('/showcase')}>Portfolio</Link>
          <Link href="/staging" className={navLinkClass('/staging')}>Services</Link>

          {/* About dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 py-1 px-0.5 text-[0.95rem] border-b-2 border-transparent text-[#2e2e2e] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors"
              aria-haspopup="true"
            >
              About
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="hidden group-hover:grid absolute top-full left-0 min-w-[180px] bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow)] p-2 z-50 gap-1">
              {aboutLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-lg text-[0.92rem] whitespace-nowrap transition-colors ${
                    pathname === l.href
                      ? 'bg-[#eef4f2] text-[var(--brand)]'
                      : 'text-[#2e2e2e] hover:bg-[#eef4f2] hover:text-[var(--brand)]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden border border-[var(--line)] bg-white text-[var(--brand-dark)] px-3 py-2 rounded-lg font-semibold text-sm min-h-[44px]"
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
          className="md:hidden absolute right-4 top-[calc(100%+6px)] w-[min(360px,calc(100%-2rem))] bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow)] p-2 flex flex-col gap-1 z-50"
        >
          {[
            { href: '/', label: 'Home' },
            { href: '/showcase', label: 'Portfolio' },
            { href: '/staging', label: 'Services' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-3 rounded-lg text-[0.95rem] min-h-[44px] flex items-center transition-colors ${
                pathname === l.href ? 'bg-[#eef4f2] text-[var(--brand)]' : 'hover:bg-[#eef4f2] hover:text-[var(--brand)]'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* About accordion */}
          <button
            className="px-3 py-3 rounded-lg text-[0.95rem] min-h-[44px] flex items-center justify-between text-left hover:bg-[#eef4f2] hover:text-[var(--brand)] transition-colors"
            onClick={() => setAboutOpen(v => !v)}
          >
            About
            <svg className={`w-3 h-3 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {aboutOpen && (
            <div className="pl-4 flex flex-col gap-1">
              {aboutLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-[0.92rem] min-h-[44px] flex items-center transition-colors ${
                    pathname === l.href ? 'bg-[#eef4f2] text-[var(--brand)]' : 'hover:bg-[#eef4f2] hover:text-[var(--brand)]'
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
            className={`px-3 py-3 rounded-lg text-[0.95rem] min-h-[44px] flex items-center transition-colors ${
              pathname === '/contact' ? 'bg-[#eef4f2] text-[var(--brand)]' : 'hover:bg-[#eef4f2] hover:text-[var(--brand)]'
            }`}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
