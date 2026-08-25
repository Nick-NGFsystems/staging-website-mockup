import { getNgfContent } from '@/lib/ngf'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Staging Services',
  description: 'Professional home staging services for occupied, vacant, and new construction homes in West Michigan.',
}

export default async function StagingPage() {
  const content = await getNgfContent()

  return (
    <main id="main-content">
      <PageHero
        prefix="staging"
        content={content}
        defaultImage="/images/staged/staged-11.webp"
        defaultEyebrow={'Staging'}
        defaultHeadline={'Why Staging Matters'}
      />

      {/* ── Intro + 3 Info Cards ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <p
            className="text-[1.05rem] text-[var(--muted)] max-w-[680px] mx-auto text-center mb-16 leading-relaxed"
            data-ngf-field="staging.overviewCopy"
            data-ngf-label="Overview Copy"
            data-ngf-type="textarea"
            data-ngf-section="Staging Overview"
          >
            {content['staging.overviewCopy'] || 'Staging is one of the most powerful tools sellers have. Professionally staged homes photograph better, show better, and sell faster — often for more money. Whether your home is occupied, vacant, or brand-new construction, Perrine Interiors brings expertise, inventory, and vision to every listing.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Why Staging */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-3"
                data-ngf-field="staging.card1Title"
                data-ngf-label="Card 1 Title"
                data-ngf-type="text"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card1Title'] || 'Why Stage?'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="staging.card1Body"
                data-ngf-label="Card 1 Body"
                data-ngf-type="textarea"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card1Body'] || 'A well-presented home helps buyers form an emotional connection to the space — and that connection translates directly into stronger offers.'}
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-3"
                data-ngf-field="staging.card2Title"
                data-ngf-label="Card 2 Title"
                data-ngf-type="text"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card2Title'] || 'Our Timeline'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="staging.card2Body"
                data-ngf-label="Card 2 Body"
                data-ngf-type="textarea"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card2Body'] || 'Consultation, then planning and sourcing, install day, listing photos, and results. Most installs are completed in one day. We work around your photographer\'s schedule and listing timeline.'}
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-3"
                data-ngf-field="staging.card3Title"
                data-ngf-label="Card 3 Title"
                data-ngf-type="text"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card3Title'] || 'What To Expect'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="staging.card3Body"
                data-ngf-label="Card 3 Body"
                data-ngf-type="textarea"
                data-ngf-section="Staging Info Cards"
              >
                {content['staging.card3Body'] || 'Clear communication at every step, detailed proposals before any work begins, and a team that respects your home and your timeline. We handle the heavy lifting — you focus on the move.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Watch Staging Videos ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-12"
            data-ngf-field="staging.videosHeadline"
            data-ngf-label="Videos Section Headline"
            data-ngf-type="text"
            data-ngf-section="Watch Staging Videos"
          >
            {content['staging.videosHeadline'] || 'Watch Staging Videos'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white border border-[var(--line)] rounded-[14px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="aspect-video bg-[var(--brand)]/10 border-2 border-dashed border-[var(--brand)]/40 rounded-[10px] flex items-center justify-center mb-3">
                  <span className="text-[var(--brand)] text-sm font-medium">Video Embed Placeholder</span>
                </div>
                <p
                  className="font-serif text-base text-center"
                  data-ngf-field={`staging.videos.${i}.title`}
                  data-ngf-label="Video Title"
                  data-ngf-type="text"
                  data-ngf-section="Watch Staging Videos"
                >
                  {content[`staging.videos.${i}.title`] || `Staging Video ${i + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-[var(--brand)]">
        <div className="mx-auto max-w-[1120px] px-4 text-center text-white">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] mb-4"
            data-ngf-field="staging.ctaHeadline"
            data-ngf-label="CTA Headline"
            data-ngf-type="text"
            data-ngf-section="Staging CTA"
          >
            {content['staging.ctaHeadline'] || 'Let\'s Stage Your Home for Success'}
          </h2>
          <p
            className="text-white/80 text-[1.05rem] max-w-[480px] mx-auto mb-8"
            data-ngf-field="staging.ctaBody"
            data-ngf-label="CTA Body"
            data-ngf-type="textarea"
            data-ngf-section="Staging CTA"
          >
            {content['staging.ctaBody'] || 'Ready to get started? Fill out a quick staging inquiry and we\'ll be in touch within one business day.'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[var(--brand)] font-semibold hover:bg-[#f4f4f4] transition-colors min-h-[44px]"
          >
            Book a Staging Inquiry
          </a>
        </div>
      </section>
    </main>
  )
}
