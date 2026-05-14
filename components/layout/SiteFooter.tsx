import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'

interface Props {
  content: NgfSiteContent
}

const footerLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/team', label: 'Meet the Team' },
  { href: '/staging', label: 'Services' },
  { href: '/showcase', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://www.youtube.com', label: 'YouTube', abbr: 'YT' },
  { href: 'https://www.facebook.com', label: 'Facebook', abbr: 'FB' },
  { href: 'https://www.instagram.com', label: 'Instagram', abbr: 'IG' },
  { href: 'https://www.tiktok.com', label: 'TikTok', abbr: 'TT' },
  { href: 'https://www.zillow.com', label: 'Zillow', abbr: 'Z' },
]

export function SiteFooter({ content }: Props) {
  const businessName = content['brand.businessName'] || 'Perrine Interiors'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--line)] bg-[#f8f5f0] py-8">
      <div className="mx-auto max-w-[1120px] px-4 flex flex-col items-center gap-4">
        {/* Quick links */}
        <nav aria-label="Footer links" className="flex flex-wrap justify-center gap-2">
          {footerLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="border border-[var(--line)] rounded-full px-3 py-1.5 bg-white text-[0.88rem] text-[#2d3836] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex gap-2" aria-label="Social media links">
          {socialLinks.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-full border border-[var(--line)] bg-white flex items-center justify-center text-[0.78rem] font-bold text-[#2d3836] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors min-h-[44px] min-w-[44px]"
            >
              {s.abbr}
            </a>
          ))}
        </div>

        <p className="text-[0.9rem] text-[var(--muted)]">© {year} {businessName}</p>
      </div>
    </footer>
  )
}
