import Link from 'next/link'
import type { NgfSiteContent } from '@/lib/ngf'
import { SocialLinks } from '@/components/Socials'

interface Props {
  content: NgfSiteContent
}

const columns = [
  {
    heading: 'Explore',
    links: [
      { href: '/staging', label: 'Home Staging' },
      { href: '/consultations', label: 'Consultations' },
      { href: '/showcase', label: 'Showcase' },
      { href: '/shop', label: 'Shop With Us' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/team', label: 'Meet the Team' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

// Real affiliations / designations (per client notes). Logos TBD — text for now.
const featuredIn = [
  'Grand Rapids Real Producers',
  'GRAR',
  'Guild Mortgage',
  'GRI',
  'Bella Bay Realty',
  'Top 10 Producer',
]

export function SiteFooter({ content }: Props) {
  const businessName = content['brand.businessName'] || 'Perrine Interiors'

  return (
    <footer className="bg-ink text-white/70">
      {/* Featured In */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 py-10 text-center">
          <p className="eyebrow !text-white/45 mb-6">Featured In &amp; Affiliated With</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {featuredIn.map((f) => (
              <span key={f} className="text-[0.8rem] uppercase tracking-[0.12em] text-white/55">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1200px] px-5 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-serif text-2xl text-white mb-3">{businessName}</p>
          <p className="text-sm leading-relaxed max-w-[260px] text-white/55">
            Professional home staging and home edit consultations across West Michigan.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="eyebrow !text-white/45 mb-4">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow !text-white/45 mb-4">Follow Along</p>
          <SocialLinks gap="gap-4" linkClass="w-5 h-5 text-white/55 hover:text-white transition-colors" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.78rem] text-white/40">
          <p>© {businessName}. All rights reserved.</p>
          <p data-ngf-field="footer.photoCredit" data-ngf-label="Photo Credit" data-ngf-type="text" data-ngf-section="Footer">
            {content['footer.photoCredit'] || 'Photography by [Photographer Name]'}
          </p>
        </div>
      </div>
    </footer>
  )
}
