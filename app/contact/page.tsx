import { getNgfContent } from '@/lib/ngf'
import { SocialLinks } from '@/components/Socials'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Request a staging proposal or book a home edit consultation with Perrine Interiors.',
}

export default async function ContactPage() {
  const content = await getNgfContent()
  const phone = content['brand.phone'] || '(616) 555-0100'
  const email = content['brand.email'] || 'hello@perineinteriors.com'

  return (
    <>
      {/* Hero (white, so the tinted form section below floats) */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-28 md:pb-16 text-center">
          <p className="eyebrow mb-5">Get In Touch</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight mb-5" data-ngf-field="contact.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['contact.heroHeadline'] || 'Let’s talk about your home'}
          </h1>
          <p className="text-muted max-w-[560px] mx-auto text-[1.05rem]" data-ngf-field="contact.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Page Hero">
            {content['contact.heroBody'] || 'Request a staging proposal or book a home edit consultation — we respond within 1–2 business days.'}
          </p>
        </div>
      </section>

      {/* Form + layered image */}
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1140px] px-5 py-16 md:py-24 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10 items-start">
          {/* Elevated form card */}
          <div className="bg-white rounded-[3px] border border-line/70 shadow-[var(--shadow-lg)] p-6 sm:p-9 md:p-11">
            <ContactForm />
          </div>

          {/* Image column — static stacked composition that fills the column height */}
          <div className="hidden lg:flex flex-col gap-3">
            {/* Main photo — fixed height; carries the direct-contact overlay */}
            <div className="relative h-[360px] rounded-[3px] overflow-hidden shadow-[var(--shadow-lg)]">
              <img src="/images/staged/staged-18.webp" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="eyebrow !text-white/70 mb-3">Prefer to talk?</p>
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                  className="font-serif text-[1.9rem] leading-none hover:opacity-80 transition-opacity"
                  data-ngf-field="brand.phone"
                  data-ngf-label="Phone"
                  data-ngf-type="text"
                  data-ngf-section="Brand"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block text-white/80 text-sm mt-3 hover:text-white transition-colors"
                  data-ngf-field="brand.email"
                  data-ngf-label="Email"
                  data-ngf-type="text"
                  data-ngf-section="Brand"
                >
                  {email}
                </a>
                <div className="mt-6">
                  <SocialLinks gap="gap-4" linkClass="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Secondary photo fills the lower space + a small overlaid line */}
            <div className="relative h-[210px] rounded-[3px] overflow-hidden shadow-[var(--shadow)]">
              <img src="/images/staged/staged-02.webp" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <p className="absolute bottom-5 left-6 font-serif text-white text-lg">Staging that sells.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
