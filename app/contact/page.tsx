import { getNgfContent } from '@/lib/ngf'
import ContactTabs from './ContactTabs'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Contact',
  description: 'Request a staging proposal or book a home edit consultation with Perrine Interiors.',
}

export default async function ContactPage() {
  const content = await getNgfContent()

  return (
    <main id="main-content">
      <PageHero
        prefix="contact"
        content={content}
        defaultImage="/images/staged/staged-18.webp"
        defaultEyebrow={'Contact'}
        defaultHeadline={'Get In Touch'}
      />

      <ContactTabs />
    </main>
  )
}
