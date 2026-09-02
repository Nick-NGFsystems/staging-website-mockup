/**
 * Fallback team and partner rows, used until the client publishes their own.
 * Names beyond Melissa's are deliberately generic and bios are placeholders —
 * nothing here should invent a real person or a real business.
 */
export const DEFAULT_TEAM: Array<Record<string, string>> = [
  {
    photo: '/placeholder-person.svg',
    name: 'Melissa Perrine',
    role: 'Founder',
    bio: 'Add a short bio for this team member here.',
  },
  {
    photo: '/placeholder-person.svg',
    name: 'Team Member',
    role: 'Role',
    bio: 'Add a short bio for this team member here.',
  },
  {
    photo: '/placeholder-person.svg',
    name: 'Team Member',
    role: 'Role',
    bio: 'Add a short bio for this team member here.',
  },
]

export const DEFAULT_PARTNERS: Array<Record<string, string>> = [
  { logo: '/placeholder-person.svg', name: '', company: 'Partner Company', phone: '', website: '' },
  { logo: '/placeholder-person.svg', name: '', company: 'Partner Company', phone: '', website: '' },
  { logo: '/placeholder-person.svg', name: '', company: 'Partner Company', phone: '', website: '' },
  { logo: '/placeholder-person.svg', name: '', company: 'Partner Company', phone: '', website: '' },
]
