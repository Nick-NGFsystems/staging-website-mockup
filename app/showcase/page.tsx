import { getNgfContent, getItems } from '@/lib/ngf'
import ShowcaseGrid, { type Project, type GalleryPhoto } from './ShowcaseGrid'

export const metadata = {
  title: 'Showcase',
  description: 'A portfolio of professionally staged homes across West Michigan — for-sale listings, existing spaces, and new construction.',
}

const DEFAULT_PROJECTS: Project[] = [
  { image: '/images/staged/staged-15.webp', title: 'Bright Living Room', environment: 'For Sale', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-02.webp', title: 'Dining Space', environment: 'For Sale', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-17.webp', title: 'Open Kitchen', environment: 'New Construction', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-09.webp', title: 'Primary Bedroom', environment: 'Existing Space', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-18.webp', title: 'Fireplace Lounge', environment: 'For Sale', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-14.webp', title: 'Spa Bath', environment: 'New Construction', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-01.webp', title: 'Great Room', environment: 'Existing Space', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-23.webp', title: 'Guest Bedroom', environment: 'For Sale', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-08.webp', title: 'Welcoming Entry', environment: 'New Construction', description: 'Add a description of this project here.' },
]

const GALLERY_NUMS = ['03', '04', '05', '06', '07', '10', '11', '12', '13', '16', '19', '20', '21', '22', '24', '25', '26']
const DEFAULT_GALLERY: GalleryPhoto[] = GALLERY_NUMS.map((n) => ({ image: `/images/staged/staged-${n}.webp` }))

export default async function ShowcasePage() {
  const content = await getNgfContent()

  const projItems = getItems(content, 'showcase.projects')
  const projects = projItems.length > 0 ? (projItems as Project[]) : DEFAULT_PROJECTS

  const galItems = getItems(content, 'showcase.gallery')
  const gallery = galItems.length > 0 ? (galItems as GalleryPhoto[]) : DEFAULT_GALLERY

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5" data-ngf-field="showcase.heroEyebrow" data-ngf-label="Eyebrow" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['showcase.heroEyebrow'] || 'Our Work'}
          </p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="showcase.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['showcase.heroHeadline'] || 'Staging Showcase'}
          </h1>
          <p className="text-muted max-w-[560px] mx-auto mt-5 text-[1.05rem]" data-ngf-field="showcase.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Page Hero">
            {content['showcase.heroBody'] || 'From $250K listings to luxury new construction — a look at homes we’ve staged across West Michigan.'}
          </p>
        </div>
      </section>

      <ShowcaseGrid projects={projects} gallery={gallery} />
    </>
  )
}
