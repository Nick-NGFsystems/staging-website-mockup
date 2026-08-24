import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import NgfEditBridge from '@/components/NgfEditBridge'
import { getNgfContent } from '@/lib/ngf'
import { PageChrome } from '@/components/layout/PageChrome'
import { LocalBusinessSchema } from '@/app/local-business-schema'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://perineinteriors.com'),
  other: {
    'ngf-public-api': 'https://app.ngfsystems.com/api/public/content',
  },
  title: {
    default: 'Perrine Interiors | Home Staging & Consultations',
    template: '%s | Perrine Interiors',
  },
  description:
    'Professional home staging and home edit consultations across West Michigan.',
  keywords: [
    'home staging',
    'West Michigan home staging',
    'home edit consultation',
    'staging company Grand Rapids',
    'Perrine Interiors',
    'furniture for sale',
    'new construction staging',
  ],
  authors: [{ name: 'Perrine Interiors' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Perrine Interiors',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getNgfContent()
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[var(--bg)] text-[var(--ink)]`}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LocalBusinessSchema />
        <NgfEditBridge />
        <PageChrome content={content}>{children}</PageChrome>
      </body>
    </html>
  )
}
