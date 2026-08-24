import type { Project } from '@/lib/projects'

/**
 * Fallback portfolio, used until the client publishes their own projects.
 *
 * Titles describe what is actually in each photograph. Location, property
 * details and credits are deliberately left blank rather than invented — the
 * client fills those in from the portal. Gallery photos are drawn from the
 * existing staged-photo set so each project page has something to show.
 */
const GALLERY_POOL = [
  '03', '04', '05', '06', '07', '10', '11', '12',
  '13', '16', '19', '20', '21', '22', '24', '25', '26',
]

function galleryFor(n: number): Record<string, string> {
  const a = GALLERY_POOL[(n * 2) % GALLERY_POOL.length]
  const b = GALLERY_POOL[(n * 2 + 1) % GALLERY_POOL.length]
  return {
    photo1: `/images/staged/staged-${a}.webp`,
    photo2: `/images/staged/staged-${b}.webp`,
  }
}

const COVERS: Array<{ image: string; title: string }> = [
  { image: '/images/staged/staged-15.webp', title: 'Living Room' },
  { image: '/images/staged/staged-02.webp', title: 'Dining Space' },
  { image: '/images/staged/staged-17.webp', title: 'Kitchen' },
  { image: '/images/staged/staged-09.webp', title: 'Bedroom' },
  { image: '/images/staged/staged-18.webp', title: 'Lounge' },
  { image: '/images/staged/staged-14.webp', title: 'Bathroom' },
  { image: '/images/staged/staged-01.webp', title: 'Great Room' },
  { image: '/images/staged/staged-23.webp', title: 'Guest Bedroom' },
  { image: '/images/staged/staged-08.webp', title: 'Entryway' },
]

export const DEFAULT_PROJECTS: Array<Partial<Project> & Record<string, string | undefined>> =
  COVERS.map((cover, n) => ({
    image: cover.image,
    title: cover.title,
    category: '',
    description: 'Add a description of this project here.',
    location: '',
    stats: '',
    photographer: '',
    agent: '',
    ...galleryFor(n),
  }))
