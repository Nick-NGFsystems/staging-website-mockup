import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'

interface Props {
  content: NgfSiteContent
}

const footerLinks = [
  { href: '/staging', label: 'Services' },
  { href: '/consultations', label: 'Consultations' },
  { href: '/showcase', label: 'Portfolio' },
  { href: '/team', label: 'Our Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://www.instagram.com', label: 'Instagram' },
  { href: 'https://www.facebook.com', label: 'Facebook' },
  { href: 'https://www.youtube.com', label: 'YouTube' },
  { href: 'https://www.tiktok.com', label: 'TikTok' },
  { href: 'https://www.zillow.com', label: 'Zillow' },
]

export function SiteFooter({ content }: Props) {
  const businessName = content['brand.businessName'] || 'Perrine Interiors'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--line)] bg-white py-14">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Wordmark */}
          <div>
            <p className="font-serif text-xl text-[var(--ink)]">{businessName}</p>
            <p className="mt-2 text-[0.85rem] text-[var(--muted)] max-w-[28ch]">
              Home staging and home edit consultations across West Michigan.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer links">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-4">
              Explore
            </p>
            <ul className="grid gap-2.5">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.85rem] text-[var(--ink)] hover:underline underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social — plain text links, no badges or icons */}
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-4">
              Follow
            </p>
            <ul className="grid gap-2.5">
              {socialLinks.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-[var(--ink)] hover:underline underline-offset-4"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 pt-6 border-t border-[var(--line)] text-[0.78rem] text-[var(--muted)]">
          © {year} {businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
