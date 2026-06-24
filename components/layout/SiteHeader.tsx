'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { NgfSiteContent } from '@/lib/ngf'
import { SocialLinks } from '@/components/Socials'

interface Props {
  content: NgfSiteContent
}

/* Grouped, Vesta-style navigation: hover dropdowns + a full-width Shop mega-menu.
   Sticky; clean white bar that gains a hairline + shadow on scroll. */

type MenuKey = 'staging' | 'shop' | 'about' | null

const stagingLinks = [
  { href: '/staging', label: 'Home Staging' },
  { href: '/consultations', label: 'Home Edit Consultations' },
  { href: '/staging#process', label: 'Our Process' },
  { href: '/staging#faq', label: 'FAQ' },
]

const aboutLinks = [
  { href: '/team', label: 'Meet the Team' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/blog', label: 'Blog' },
]

const shopColumns = [
  { heading: 'Living', links: ['Sofas & Seating', 'Accent Chairs', 'Coffee Tables', 'Consoles'] },
  { heading: 'Dining', links: ['Tables', 'Dining Chairs', 'Bar Stools'] },
  { heading: 'Bedroom', links: ['Beds', 'Nightstands', 'Dressers'] },
  { heading: 'Decor', links: ['Lighting', 'Art & Mirrors', 'Rugs', 'Accessories'] },
]
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')

export function SiteHeader({ content }: Props) {
  const pathname = usePathname()
  const [menu, setMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSub, setMobileSub] = useState<MenuKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const [topHidden, setTopHidden] = useState(false) // collapses the utility bar on scroll-down
  const lastY = useRef(0)

  const brandName = content['brand.businessName'] || 'Perrine Interiors'
  const phone = content['brand.phone'] || '(616) 555-0100'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (y < 80) setTopHidden(false)            // always show the utility bar near the top
      else if (y > lastY.current + 4) setTopHidden(true)   // scrolling down → collapse
      else if (y < lastY.current - 4) setTopHidden(false)  // scrolling up → reveal
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setMenu(null) }, [pathname])

  const topLink = (href: string, label: string) => (
    <Link
      href={href}
      data-active={pathname === href}
      className="nav-link text-[0.8rem] font-semibold uppercase tracking-[0.13em] text-ink hover:text-accent transition-colors py-2"
    >
      {label}
    </Link>
  )

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-[box-shadow,border-color] duration-300 ${
        scrolled ? 'border-b border-line shadow-[0_1px_20px_rgba(0,0,0,0.05)]' : 'border-b border-transparent'
      }`}
      onMouseLeave={() => setMenu(null)}
    >
      {/* Utility bar — collapses on scroll-down, returns on scroll-up */}
      <div className={`overflow-hidden bg-ink text-white/65 transition-[max-height,opacity] duration-300 ${topHidden ? 'max-h-0 opacity-0' : 'max-h-[40px] opacity-100'}`}>
        <div className="mx-auto max-w-[1200px] px-5 h-[40px] flex items-center justify-between text-[0.72rem]">
          {/* href uses the default number; the displayed text stays portal-editable */}
          <a
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            className="tracking-[0.04em] hover:text-white transition-colors"
            data-ngf-field="brand.phone"
            data-ngf-label="Phone"
            data-ngf-type="text"
            data-ngf-section="Brand"
          >
            {phone}
          </a>
          <SocialLinks gap="gap-3.5" linkClass="w-[16px] h-[16px] text-white/55 hover:text-white transition-colors" />
        </div>
      </div>

      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-6 px-5">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-[1.45rem] tracking-[0.02em] text-ink whitespace-nowrap"
          data-ngf-field="brand.businessName"
          data-ngf-label="Business Name"
          data-ngf-type="text"
          data-ngf-section="Brand"
        >
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {/* Staging dropdown */}
          <div className="relative" onMouseEnter={() => setMenu('staging')}>
            <button
              className="nav-link flex items-center gap-1 text-[0.8rem] font-semibold uppercase tracking-[0.13em] text-ink hover:text-accent py-2"
              aria-haspopup="true"
              aria-expanded={menu === 'staging'}
            >
              Staging <Chevron open={menu === 'staging'} />
            </button>
            {menu === 'staging' && (
              <Dropdown>
                {stagingLinks.map((l) => (
                  <DropLink key={l.href} href={l.href} label={l.label} />
                ))}
              </Dropdown>
            )}
          </div>

          <div onMouseEnter={() => setMenu(null)}>{topLink('/showcase', 'Showcase')}</div>

          {/* Shop mega-menu */}
          <div onMouseEnter={() => setMenu('shop')}>
            <button
              className="nav-link flex items-center gap-1 text-[0.8rem] font-semibold uppercase tracking-[0.13em] text-ink hover:text-accent py-2"
              aria-haspopup="true"
              aria-expanded={menu === 'shop'}
            >
              Shop <Chevron open={menu === 'shop'} />
            </button>
          </div>

          {/* About dropdown */}
          <div className="relative" onMouseEnter={() => setMenu('about')}>
            <button
              className="nav-link flex items-center gap-1 text-[0.8rem] font-semibold uppercase tracking-[0.13em] text-ink hover:text-accent py-2"
              aria-haspopup="true"
              aria-expanded={menu === 'about'}
            >
              About <Chevron open={menu === 'about'} />
            </button>
            {menu === 'about' && (
              <Dropdown>
                {aboutLinks.map((l) => (
                  <DropLink key={l.href} href={l.href} label={l.label} />
                ))}
              </Dropdown>
            )}
          </div>

          <div onMouseEnter={() => setMenu(null)}>{topLink('/contact', 'Contact')}</div>

          <Link href="/contact" onMouseEnter={() => setMenu(null)} className="btn btn-solid !min-h-[42px] !text-[0.72rem] !px-5">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden inline-flex flex-col gap-[5px] p-2 -mr-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block h-[1.5px] w-6 bg-ink transition-transform ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block h-[1.5px] w-6 bg-ink transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-6 bg-ink transition-transform ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Full-width Shop mega-menu */}
      {menu === 'shop' && (
        <div className="absolute left-0 right-0 top-full hidden lg:block bg-white border-t border-line shadow-[0_24px_40px_rgba(0,0,0,0.07)]">
          <div className="mx-auto max-w-[1200px] px-5 py-10 grid grid-cols-5 gap-8">
            {shopColumns.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href={`/shop#${slug(l)}`} className="text-[0.92rem] text-ink-soft hover:text-accent transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-bg-alt p-6 flex flex-col justify-between">
              <div>
                <p className="font-serif text-xl mb-2">Shop With Us</p>
                <p className="text-sm text-muted leading-relaxed">Brand-new furniture and accessories from our staging inventory.</p>
              </div>
              <Link href="/shop" className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink hover:text-accent mt-5">
                Browse all →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-white max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="px-5 py-4 flex flex-col" aria-label="Mobile">
            <MobileGroup label="Staging" open={mobileSub === 'staging'} onToggle={() => setMobileSub(mobileSub === 'staging' ? null : 'staging')} links={stagingLinks} />
            <MobileLink href="/showcase" label="Showcase" />
            <MobileGroup label="Shop" open={mobileSub === 'shop'} onToggle={() => setMobileSub(mobileSub === 'shop' ? null : 'shop')}
              links={[{ href: '/shop', label: 'Shop With Us' }, ...shopColumns.map((c) => ({ href: `/shop#${slug(c.heading)}`, label: c.heading }))]} />
            <MobileGroup label="About" open={mobileSub === 'about'} onToggle={() => setMobileSub(mobileSub === 'about' ? null : 'about')} links={aboutLinks} />
            <MobileLink href="/contact" label="Contact" />
            <Link href="/contact" className="btn btn-solid w-full mt-4">Get a Quote</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-full min-w-[230px] bg-white border border-line shadow-[0_20px_36px_rgba(0,0,0,0.08)] py-2">
      {children}
    </div>
  )
}

function DropLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-5 py-2.5 text-[0.9rem] text-ink-soft hover:bg-bg-alt hover:text-accent transition-colors">
      {label}
    </Link>
  )
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="py-3.5 border-b border-line text-[0.95rem] font-medium uppercase tracking-[0.1em]">
      {label}
    </Link>
  )
}

function MobileGroup({ label, open, onToggle, links }: { label: string; open: boolean; onToggle: () => void; links: { href: string; label: string }[] }) {
  return (
    <div className="border-b border-line">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-3.5 text-[0.95rem] font-medium uppercase tracking-[0.1em]" aria-expanded={open}>
        {label} <Chevron open={open} />
      </button>
      {open && (
        <div className="pb-3 pl-3 flex flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-2.5 text-[0.9rem] text-ink-soft">{l.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}
