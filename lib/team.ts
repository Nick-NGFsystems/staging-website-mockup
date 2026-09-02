import { getItems, type NgfSiteContent } from './ngf'
import { slugify } from './projects'

export type TeamMember = {
  /** Position in the team.members group — the canonical NGF index. */
  index: number
  slug: string
  photo: string
  photoAlt: string
  name: string
  role: string
  bio: string
}

/**
 * Slugs are suffixed with position because two people can share a first name
 * and the default rows are all "Team Member". Same trade-off as projects:
 * reordering changes the URL, which is fine while this is placeholder content.
 */
export function memberSlug(name: string, index: number): string {
  return `${slugify(name) || 'team-member'}-${index + 1}`
}

export function getTeamMembers(
  content: NgfSiteContent,
  defaults: Array<Record<string, string>>,
): TeamMember[] {
  const published = getItems(content, 'team.members')
  const rows = published.length > 0 ? published : defaults

  return rows.map((row, index) => {
    const name = row.name || 'Team Member'
    return {
      index,
      slug: memberSlug(name, index),
      photo: row.photo || '/placeholder-person.svg',
      photoAlt: row.photo_alt || '',
      name,
      role: row.role || '',
      bio: row.bio || '',
    }
  })
}

export const TEAM_ITEM_FIELDS = JSON.stringify([
  { key: 'photo', label: 'Photo', type: 'image', aspect: '3:4' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
])

/** Trusted partners — vendors and collaborators shown on the team page. */
export type Partner = {
  index: number
  logo: string
  name: string
  company: string
  phone: string
  website: string
}

export function getPartners(
  content: NgfSiteContent,
  defaults: Array<Record<string, string>>,
): Partner[] {
  const published = getItems(content, 'partners.items')
  const rows = published.length > 0 ? published : defaults
  return rows.map((row, index) => ({
    index,
    logo: row.logo || '/placeholder-person.svg',
    name: row.name || '',
    company: row.company || '',
    phone: row.phone || '',
    website: row.website || '',
  }))
}

export const PARTNER_ITEM_FIELDS = JSON.stringify([
  { key: 'logo', label: 'Logo / Photo', type: 'image', aspect: '1:1' },
  { key: 'name', label: 'Contact Name', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'phone', label: 'Phone Number', type: 'text' },
  { key: 'website', label: 'Website (https://…)', type: 'text' },
])
