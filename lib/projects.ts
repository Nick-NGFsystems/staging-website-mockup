import { getItems, type NgfSiteContent } from './ngf'

/** A staged project, as shown on /showcase and its own /showcase/[slug] page. */
export type Project = {
  /** Position in the showcase.projects group — the canonical NGF index. */
  index: number
  slug: string
  title: string
  description: string
  category: string
  image: string
  /** Editable alt text (NGF `<field>_alt` convention). */
  imageAlt: string
  /** Detail-page fields. Blank by default — the client fills these in. */
  location: string
  stats: string
  designer: string
  salesContact: string
  photographer: string
  agent: string
  /** Extra photographs shown in the detail-page gallery. */
  photos: string[]
}

/** Number of gallery photo slots offered per project in the portal editor. */
export const PROJECT_PHOTO_SLOTS = 4

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Slugs are suffixed with the project's position because titles repeat
 * ("Living Room" appears more than once) and would otherwise collide.
 *
 * Trade-off: reordering projects in the portal changes their URLs. Acceptable
 * while the portfolio is placeholder content; if these ever get linked
 * externally, give each project an explicit, stable `slug` field instead.
 */
export function projectSlug(title: string, index: number): string {
  return `${slugify(title) || 'project'}-${index + 1}`
}

/**
 * Resolve the showcase projects from published NGF content, falling back to the
 * supplied defaults. Both /showcase and /showcase/[slug] call this so the grid
 * and the detail pages can never disagree about indices or slugs.
 */
export function getProjects(
  content: NgfSiteContent,
  defaults: Array<Partial<Project>>,
): Project[] {
  const published = getItems(content, 'showcase.projects')
  const rows: Array<Record<string, string>> =
    published.length > 0
      ? published
      : (defaults as Array<Record<string, string>>)

  return rows.map((row, index) => {
    const title = row.title || `Project ${index + 1}`
    const photos: string[] = []
    for (let n = 1; n <= PROJECT_PHOTO_SLOTS; n++) {
      const photo = row[`photo${n}`]
      if (photo) photos.push(photo)
    }
    return {
      index,
      slug: projectSlug(title, index),
      title,
      description: row.description || '',
      category: row.category || '',
      image: row.image || '/images/staged/staged-15.webp',
      imageAlt: row.image_alt || '',
      location: row.location || '',
      stats: row.stats || '',
      designer: row.designer || '',
      salesContact: row.salesContact || '',
      photographer: row.photographer || '',
      agent: row.agent || '',
      photos,
    }
  })
}

/** The item-fields contract advertised to the portal editor. Shared so the grid
 *  and any future surface stay in sync. */
export const PROJECT_ITEM_FIELDS = JSON.stringify([
  { key: 'image', label: 'Cover Photo', type: 'image', aspect: '3:2' },
  { key: 'title', label: 'Project Title', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'stats', label: 'Property Details (e.g. 3,200 sq ft | 4 Beds | 3 Baths)', type: 'text' },
  { key: 'designer', label: 'Staged / Designed By', type: 'text' },
  { key: 'salesContact', label: 'Sales Contact', type: 'text' },
  { key: 'photographer', label: 'Photographer Credit', type: 'text' },
  { key: 'agent', label: 'Listing Agent Credit', type: 'text' },
  { key: 'photo1', label: 'Gallery Photo 1', type: 'image' },
  { key: 'photo2', label: 'Gallery Photo 2', type: 'image' },
  { key: 'photo3', label: 'Gallery Photo 3', type: 'image' },
  { key: 'photo4', label: 'Gallery Photo 4', type: 'image' },
])
