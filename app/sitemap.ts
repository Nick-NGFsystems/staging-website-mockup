import type { MetadataRoute } from 'next'
import { getNgfContent } from '@/lib/ngf'
import { getProjects } from '@/lib/projects'
import { getTeamMembers } from '@/lib/team'
import { DEFAULT_TEAM } from './team/team-data'
import { DEFAULT_PROJECTS } from './showcase/projects-data'

// Next auto-routes this to /sitemap.xml. Add an entry for every public page you
// create — a page missing here is effectively invisible to Google.
// Required by the SEO launch gate in NGF-STANDARDS.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'example.com'
  const base = `https://${raw.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/staging`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/showcase`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/consultations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/team`,          lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/shop`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Dynamic project pages. Falls back to the hardcoded portfolio if the portal
  // is unreachable, so the sitemap never silently empties out.
  let dynamicPages: MetadataRoute.Sitemap = []
  try {
    const content = await getNgfContent()
    dynamicPages = [
      ...getProjects(content, DEFAULT_PROJECTS).map(p => ({
        url: `${base}/showcase/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...getTeamMembers(content, DEFAULT_TEAM).map(m => ({
        url: `${base}/team/${m.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
    ]
  } catch {
    dynamicPages = []
  }

  return [...staticPages, ...dynamicPages]
}
