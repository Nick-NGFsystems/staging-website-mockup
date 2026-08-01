import type { MetadataRoute } from 'next'

// Next auto-routes this to /sitemap.xml. Add an entry for every public page you
// create — a page missing here is effectively invisible to Google.
// Required by the SEO launch gate in NGF-STANDARDS.
export default function sitemap(): MetadataRoute.Sitemap {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'example.com'
  const base = `https://${raw.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
  const now = new Date()

  return [
    { url: `${base}/`,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/staging`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/showcase`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/consultations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/team`,          lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/shop`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
  ]
}
