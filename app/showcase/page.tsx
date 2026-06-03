import { getNgfContent, getItems } from '@/lib/ngf'
import ShowcaseGrid, { type ShowcaseProject, type GalleryPhoto } from './ShowcaseGrid'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Staging Showcase',
  description: 'Browse our portfolio of professionally staged homes across West Michigan — living rooms, kitchens, bedrooms, and more.',
}

// Titles describe what is actually in each photo; categories are left blank for
// the client to set real values in the portal, and descriptions are generic
// placeholders (no invented project details).
const DEFAULT_PROJECTS: ShowcaseProject[] = [
  { image: '/images/staged/staged-15.webp', title: 'Living Room', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-02.webp', title: 'Dining Space', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-17.webp', title: 'Kitchen', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-09.webp', title: 'Bedroom', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-18.webp', title: 'Living Room', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-14.webp', title: 'Bathroom', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-01.webp', title: 'Great Room', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-23.webp', title: 'Bedroom', category: '', description: 'Add a description of this project here.' },
  { image: '/images/staged/staged-08.webp', title: 'Entryway', category: '', description: 'Add a description of this project here.' },
]

const GALLERY_FILES = [
  '03', '04', '05', '06', '07', '10', '11', '12', '13',
  '16', '19', '20', '21', '22', '24', '25', '26',
]
const DEFAULT_GALLERY: GalleryPhoto[] = GALLERY_FILES.map((n) => ({
  image: `/images/staged/staged-${n}.webp`,
  caption: '',
}))

export default async function ShowcasePage() {
  const content = await getNgfContent()

  const projectItems = getItems(content, 'showcase.projects')
  const projects = projectItems.length > 0
    ? (projectItems as ShowcaseProject[])
    : DEFAULT_PROJECTS

  const galleryItems = getItems(content, 'showcase.gallery')
  const gallery = galleryItems.length > 0
    ? (galleryItems as GalleryPhoto[])
    : DEFAULT_GALLERY

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: `url('${content['showcase.heroImage'] || '/images/staged/staged-15.webp'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,28,25,0.8)] to-[rgba(12,28,25,0.25)]" />
        <div className="relative z-10 mx-auto w-full max-w-[760px] px-4">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#f5d9a6] mb-3"
            data-ngf-field="showcase.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['showcase.heroEyebrow'] || 'Staging Showcase'}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="showcase.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['showcase.heroHeadline'] || 'Our Portfolio'}
          </h1>
        </div>
      </section>

      <ShowcaseGrid projects={projects} gallery={gallery} />
    </main>
  )
}
