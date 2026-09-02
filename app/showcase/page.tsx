import { getNgfContent } from '@/lib/ngf'
import ShowcaseGrid from './ShowcaseGrid'
import { getProjects } from '@/lib/projects'
import { DEFAULT_PROJECTS } from './projects-data'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Staging Showcase',
  description: 'Browse our portfolio of professionally staged homes across West Michigan — living rooms, kitchens, bedrooms, and more.',
}

export default async function ShowcasePage() {
  const content = await getNgfContent()

  const projects = getProjects(content, DEFAULT_PROJECTS)


  return (
    <main id="main-content">
      <PageHero
        prefix="showcase"
        content={content}
        defaultImage="/images/staged/staged-15.webp"
        defaultEyebrow={'Staging Showcase'}
        defaultHeadline={'Our Portfolio'}
      />

      <ShowcaseGrid projects={projects} />
    </main>
  )
}
