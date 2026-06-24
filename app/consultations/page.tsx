import { getNgfContent } from '@/lib/ngf'
import Link from 'next/link'

export const metadata = {
  title: 'Home Edit Consultations',
  description: 'Expert advice for sellers still living in their home and getting ready to list.',
}

export default async function ConsultationsPage() {
  const content = await getNgfContent()
  const included = (content['consultations.includedList'] ||
    'Room-by-room walk-through\nPrioritized list of recommended changes\nFurniture arrangement advice\nDeclutter and depersonalization guidance\nPaint color recommendations\nWritten action plan delivered afterward').split('\n')

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5">Home Edit Consultations</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="consultations.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['consultations.heroHeadline'] || 'Still living in your home?'}
          </h1>
          <p className="text-muted max-w-[620px] mx-auto mt-5 text-[1.05rem]" data-ngf-field="consultations.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Page Hero">
            {content['consultations.heroBody'] || 'For sellers getting ready to list: expert eyes, a clear action plan, and honest advice on what will actually move the needle on your sale.'}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1000px] px-5 grid md:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow mb-4">What&rsquo;s Included</p>
            <ul className="space-y-3">
              {included.map((line, i) => (
                <li key={i} className="flex gap-3 text-ink-soft">
                  <span className="text-muted mt-1">—</span><span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-alt p-10">
            <p className="eyebrow mb-4">How It Works</p>
            <ol className="space-y-5">
              {[
                ['Book', 'Submit the contact form and select a time that works.'],
                ['Walk-Through', 'Melissa tours the home and shares real-time feedback.'],
                ['Action Plan', 'You receive a written, prioritized plan to work through on your timeline.'],
              ].map(([t, d], i) => (
                <li key={i}>
                  <span className="block w-8 h-px bg-ink mb-3" aria-hidden="true" />
                  <p className="font-serif text-lg">{t}</p>
                  <p className="text-muted text-[0.95rem] mt-1">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[860px] px-5 py-24 text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] mb-6 text-white">Get a clear plan before you list</h2>
          <Link href="/contact#home-edit" className="btn btn-solid !bg-white !text-ink !border-white">Book a Consultation</Link>
        </div>
      </section>
    </>
  )
}
