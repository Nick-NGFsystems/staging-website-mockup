import { getNgfContent, getItems } from '@/lib/ngf'
import Link from 'next/link'

export const metadata = {
  title: 'Home Staging',
  description: 'Professional home staging for for-sale listings, existing spaces, and new construction across West Michigan.',
}

const DEFAULT_PROCESS = [
  { title: 'On-Site Visit & Quote', body: 'We walk the home, discuss goals and timeline, and provide a clear, written proposal.' },
  { title: 'Planning & Sourcing', body: 'We design the look and pull furniture and accessories from our inventory.' },
  { title: 'Install Day', body: 'Our team stages the home — most installs are completed in a single day.' },
  { title: 'Listing-Ready', body: 'The home is ready for photos and showings, looking its absolute best.' },
]

const DEFAULT_FAQ = [
  { q: 'How long does staging take?', a: 'Add your answer here.' },
  { q: 'What does staging cost?', a: 'Add your answer here.' },
  { q: 'Do you stage occupied homes?', a: 'Add your answer here.' },
]

export default async function StagingPage() {
  const content = await getNgfContent()
  const process = (() => { const i = getItems(content, 'staging.process'); return i.length > 0 ? i : DEFAULT_PROCESS })()
  const faq = (() => { const i = getItems(content, 'staging.faq'); return i.length > 0 ? i : DEFAULT_FAQ })()

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5">Home Staging</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="staging.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['staging.heroHeadline'] || 'Why staging works'}
          </h1>
          <p className="text-muted max-w-[620px] mx-auto mt-5 text-[1.05rem]" data-ngf-field="staging.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Page Hero">
            {content['staging.heroBody'] || 'A well-presented home helps buyers form an emotional connection — and that connection translates into stronger offers.'}
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-5 grid md:grid-cols-3 gap-10">
          {[
            { t: 'Sell Faster', d: 'Staged homes photograph better and show better, helping listings move sooner.' },
            { t: 'Stronger Offers', d: 'Buyers connect with a home they can picture themselves living in.' },
            { t: 'Every Price Point', d: 'Packages tailored to the home — from first listings to luxury new construction.' },
          ].map((c) => (
            <div key={c.t}>
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] mb-3">{c.t}</h3>
              <p className="text-muted leading-relaxed text-[0.95rem]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 md:py-32 bg-bg-alt scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">What to Expect</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)]">Our staging process</h2>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
            data-ngf-group="staging.process"
            data-ngf-item-label="Step"
            data-ngf-min-items="1"
            data-ngf-max-items="8"
            data-ngf-item-fields='[{"key":"title","label":"Title","type":"text"},{"key":"body","label":"Body","type":"textarea"}]'
          >
            {process.map((s, i) => (
              <div key={i}>
                <span className="block w-10 h-px bg-ink mb-4" aria-hidden="true" />
                <h3 className="text-[0.95rem] font-semibold uppercase tracking-[0.06em] mb-2" data-ngf-field={`staging.process.${i}.title`} data-ngf-label="Title" data-ngf-type="text" data-ngf-section="Process">
                  {s.title || `Step ${i + 1}`}
                </h3>
                <p className="text-muted leading-relaxed text-[0.9rem]" data-ngf-field={`staging.process.${i}.body`} data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Process">
                  {s.body || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 scroll-mt-20">
        <div className="mx-auto max-w-[760px] px-5">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)]">Frequently asked</h2>
          </div>
          <div
            className="divide-y divide-line border-y border-line"
            data-ngf-group="staging.faq"
            data-ngf-item-label="Question"
            data-ngf-min-items="1"
            data-ngf-max-items="20"
            data-ngf-item-fields='[{"key":"q","label":"Question","type":"text"},{"key":"a","label":"Answer","type":"textarea"}]'
          >
            {faq.map((item, i) => (
              <div key={i} className="py-6">
                <h3 className="font-serif text-lg mb-2" data-ngf-field={`staging.faq.${i}.q`} data-ngf-label="Question" data-ngf-type="text" data-ngf-section="FAQ">
                  {item.q || 'Question'}
                </h3>
                <p className="text-muted leading-relaxed" data-ngf-field={`staging.faq.${i}.a`} data-ngf-label="Answer" data-ngf-type="textarea" data-ngf-section="FAQ">
                  {item.a || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[860px] px-5 py-24 text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] mb-6 text-white">Let&rsquo;s stage your home</h2>
          <Link href="/contact" className="btn btn-solid !bg-white !text-ink !border-white">Get a Quote</Link>
        </div>
      </section>
    </>
  )
}
