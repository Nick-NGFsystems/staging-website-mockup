import { getNgfContent, getItems } from '@/lib/ngf'
import ShowcaseGrid, { type GalleryPhoto } from './ShowcaseGrid'
import { getProjects } from '@/lib/projects'
import { DEFAULT_PROJECTS } from './projects-data'
import { PageHero } from '@/components/PageHero'

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
  const gallery: GalleryPhoto[] = galleryItems.length > 0
    ? galleryItems.map((g) => ({ image: g.image, caption: g.caption || '', alt: g.image_alt || '' }))
    : DEFAULT_GALLERY

  return (
    <main id="main-content">
      <PageHero
        prefix="showcase"
        content={content}
        defaultImage="/images/staged/staged-15.webp"
        defaultEyebrow={'Staging Showcase'}
        defaultHeadline={'Our Portfolio'}
      />

      <ShowcaseGrid projects={projects} gallery={gallery} />
    </main>
  )
}
