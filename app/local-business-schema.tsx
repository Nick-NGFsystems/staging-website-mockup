/**
 * LocalBusiness structured data (schema.org JSON-LD).
 *
 * NOTE: Only verified facts belong in here. Incorrect NAP (name/address/phone) data
 * in structured markup actively hurts local SEO, so fields we don't have
 * confirmed yet are intentionally omitted rather than guessed. Fill in the
 * TODOs below once Melissa confirms them, then delete the TODO comments.
 */
import { siteBaseUrl } from '@/lib/ngf'

export function LocalBusinessSchema() {
  // One host for the whole site: NEXT_PUBLIC_SITE_URL, else the Vercel
  // production URL. A second fallback chain here is how this file came to
  // advertise a domain the sitemap never used.
  const siteUrl = siteBaseUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    additionalType: 'https://en.wikipedia.org/wiki/Home_staging',
    name: 'Perrine Interiors',
    description:
      'Professional home staging and home edit consultations across West Michigan — ' +
      'occupied homes, vacant listings, and new construction.',
    url: siteUrl,
    email: 'perrinematerials@gmail.com',
    areaServed: [
      'Grand Rapids, MI',
      'Hudsonville, MI',
      'Jenison, MI',
      'Zeeland, MI',
      'Byron Center, MI',
      'West Michigan',
    ],
    knowsAbout: [
      'Home staging',
      'Occupied home staging',
      'Vacant home staging',
      'New construction staging',
      'Home edit consultation',
    ],

    // TODO — confirm with client, then uncomment:
    // telephone: '+1616XXXXXXX',
    // address: {
    //   '@type': 'PostalAddress',
    //   streetAddress: '',
    //   addressLocality: '',
    //   addressRegion: 'MI',
    //   postalCode: '',
    //   addressCountry: 'US',
    // },
    // sameAs: [ /* real Facebook / Instagram / YouTube profile URLs */ ],
    // priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
