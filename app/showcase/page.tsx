import { getNgfContent, getItems } from '@/lib/ngf'
import ShowcaseGrid, { type GalleryPhoto } from './ShowcaseGrid'
import { getProjects } from '@/lib/projects'
import { DEFAULT_PROJECTS } from './projects-data'

export const metadata = {
  title: 'Staging Showcase',
  description: 'Browse our portfolio of professionally staged homes across West Michigan — living rooms, kitchens, bedrooms, and more.',
}

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

  const projects = getProjects(content, DEFAULT_PROJECTS)

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
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]" />
        <div className="relative z-10 mx-auto w-full max-w-[760px] px-4">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#ffffff] mb-3"
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
