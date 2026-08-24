import { getNgfContent } from '@/lib/ngf'
import ContactTabs from './ContactTabs'

export const metadata = {
  title: 'Contact',
  description: 'Request a staging proposal or book a home edit consultation with Perrine Interiors.',
}

export default async function ContactPage() {
  const content = await getNgfContent()

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: `url('${content['contact.heroImage'] || '/images/staged/staged-18.webp'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#ffffff] mb-3"
            data-ngf-field="contact.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['contact.heroEyebrow'] || 'Contact'}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="contact.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['contact.heroHeadline'] || 'Get In Touch'}
          </h1>
        </div>
      </section>

      <ContactTabs />
    </main>
  )
}
