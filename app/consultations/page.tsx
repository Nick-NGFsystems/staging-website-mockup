import { getNgfContent } from '@/lib/ngf'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Home Edit Consultations',
  description: 'Home edit consultations for sellers who want expert advice on changes to improve sale price and speed.',
}

export default async function ConsultationsPage() {
  const content = await getNgfContent()

  return (
    <main id="main-content">
      <PageHero
        prefix="consultations"
        content={content}
        defaultImage="/images/staged/staged-21.webp"
        defaultEyebrow={'Consultations'}
        defaultHeadline={'Home Edit Consultations'}
      />

      {/* ── Intro ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="max-w-[680px] mx-auto text-center mb-16">
            <h2
              className="font-serif text-[clamp(1.6rem,3vw,2.25rem)] mb-5"
              data-ngf-field="consultations.introHeadline"
              data-ngf-label="Intro Headline"
              data-ngf-type="text"
              data-ngf-section="Consultations Intro"
            >
              {content['consultations.introHeadline'] || 'Still Living in Your Home? This Is for You.'}
            </h2>
            <p
              className="text-[1.05rem] text-[var(--muted)] leading-relaxed"
              data-ngf-field="consultations.introCopy"
              data-ngf-label="Intro Copy"
              data-ngf-type="textarea"
              data-ngf-section="Consultations Intro"
            >
              {content['consultations.introCopy'] || 'A home edit consultation is designed for sellers who are still living in their home and getting ready to list. You don\'t need full staging — you need expert eyes, a clear action plan, and honest advice on what changes will actually move the needle on your sale price and days on market. That\'s exactly what Melissa provides.'}
            </p>
          </div>

          {/* Two-column: What's Included + Who Benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-5"
                data-ngf-field="consultations.includedTitle"
                data-ngf-label="What's Included Title"
                data-ngf-type="text"
                data-ngf-section="Consultation Details"
              >
                {content['consultations.includedTitle'] || "What's Included"}
              </h3>
              <div
                className="text-sm text-[var(--muted)] leading-relaxed space-y-2 whitespace-pre-line"
                data-ngf-field="consultations.includedList"
                data-ngf-label="What's Included (bullet list)"
                data-ngf-type="textarea"
                data-ngf-section="Consultation Details"
              >
                {(content['consultations.includedList'] || '• Room-by-room walk-through with Melissa\n• Prioritized list of recommended changes\n• Furniture arrangement advice\n• Declutter and depersonalization guidance\n• Paint color recommendations\n• Minor repair and refresh suggestions\n• Written action plan delivered after the consultation').split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[var(--line)] rounded-[14px] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-5"
                data-ngf-field="consultations.benefitsTitle"
                data-ngf-label="Who Benefits Title"
                data-ngf-type="text"
                data-ngf-section="Consultation Details"
              >
                {content['consultations.benefitsTitle'] || 'Who Benefits'}
              </h3>
              <p
                className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line"
                data-ngf-field="consultations.benefitsCopy"
                data-ngf-label="Who Benefits Copy"
                data-ngf-type="textarea"
                data-ngf-section="Consultation Details"
              >
                {content['consultations.benefitsCopy'] || 'This service is ideal for homeowners who:\n\n• Are listing within the next 1–6 months\n• Want to maximize sale price without a full staging investment\n• Need direction on where to focus their time and budget\n• Are overwhelmed by where to start\n• Want an objective, professional opinion on their home\'s presentation\n\nA consultation pays for itself many times over in stronger offers and faster sales.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-12"
            data-ngf-field="consultations.processHeadline"
            data-ngf-label="Process Headline"
            data-ngf-type="text"
            data-ngf-section="Consultation Process"
          >
            {content['consultations.processHeadline'] || 'How It Works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--brand)] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3
                className="font-serif text-lg mb-3"
                data-ngf-field="consultations.step1Title"
                data-ngf-label="Step 1 Title"
                data-ngf-type="text"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step1Title'] || 'Book a Consultation'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="consultations.step1Body"
                data-ngf-label="Step 1 Body"
                data-ngf-type="textarea"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step1Body'] || 'Fill out the contact form and select "Consultation." Melissa will follow up to schedule a convenient time to visit your home.'}
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--brand)] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3
                className="font-serif text-lg mb-3"
                data-ngf-field="consultations.step2Title"
                data-ngf-label="Step 2 Title"
                data-ngf-type="text"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step2Title'] || 'Walk-Through & Assessment'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="consultations.step2Body"
                data-ngf-label="Step 2 Body"
                data-ngf-type="textarea"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step2Body'] || 'Melissa tours your home room by room, taking notes and sharing real-time feedback on what buyers will notice and how to address it.'}
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--brand)] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3
                className="font-serif text-lg mb-3"
                data-ngf-field="consultations.step3Title"
                data-ngf-label="Step 3 Title"
                data-ngf-type="text"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step3Title'] || 'Your Action Plan'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="consultations.step3Body"
                data-ngf-label="Step 3 Body"
                data-ngf-type="textarea"
                data-ngf-section="Consultation Process"
              >
                {content['consultations.step3Body'] || 'You receive a written, prioritized action plan within 48 hours. Work through it on your own timeline — or ask us about follow-up staging services.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-[var(--brand)]">
        <div className="mx-auto max-w-[1120px] px-4 text-center text-white">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] mb-4"
            data-ngf-field="consultations.ctaHeadline"
            data-ngf-label="CTA Headline"
            data-ngf-type="text"
            data-ngf-section="Consultations CTA"
          >
            {content['consultations.ctaHeadline'] || 'Ready to Get a Clear Plan?'}
          </h2>
          <p
            className="text-white/80 text-[1.05rem] max-w-[480px] mx-auto mb-8"
            data-ngf-field="consultations.ctaBody"
            data-ngf-label="CTA Body"
            data-ngf-type="textarea"
            data-ngf-section="Consultations CTA"
          >
            {content['consultations.ctaBody'] || 'Book a home edit consultation and walk away knowing exactly what to do before your listing goes live.'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[var(--brand)] font-semibold hover:bg-[#f4f4f4] transition-colors min-h-[44px]"
          >
            Book a Consultation
          </a>
        </div>
      </section>
    </main>
  )
}
