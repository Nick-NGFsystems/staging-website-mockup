import { getNgfContent, getItems } from '@/lib/ngf'
import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel'
import Link from 'next/link'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')

const DEFAULT_HERO: HeroSlide[] = [
  { image: '/images/staged/staged-15.webp', alt: 'Staged living room' },
  { image: '/images/staged/staged-17.webp', alt: 'Staged kitchen' },
  { image: '/images/staged/staged-18.webp', alt: 'Staged lounge' },
  { image: '/images/staged/staged-02.webp', alt: 'Staged dining room' },
  { image: '/images/staged/staged-21.webp', alt: 'Staged bedroom' },
]

const DEFAULT_ENVIRONMENTS = [
  { image: '/images/staged/staged-15.webp', title: 'For Sale', blurb: 'Vacant and occupied listings staged to sell faster.' },
  { image: '/images/staged/staged-09.webp', title: 'Existing Space', blurb: 'Refreshing lived-in homes for a stronger first impression.' },
  { image: '/images/staged/staged-08.webp', title: 'New Construction', blurb: 'Helping buyers picture life in a brand-new build.' },
]

const DEFAULT_RECENT = [
  { image: '/images/staged/staged-01.webp' }, { image: '/images/staged/staged-17.webp' },
  { image: '/images/staged/staged-14.webp' }, { image: '/images/staged/staged-02.webp' },
  { image: '/images/staged/staged-09.webp' }, { image: '/images/staged/staged-18.webp' },
]

const DEFAULT_PROCESS = [
  { title: 'On-Site Visit & Quote', body: 'We walk the home, talk through goals and timeline, and provide a clear proposal.' },
  { title: 'Install Day', body: 'Our team stages the home — most installs are completed in a single day.' },
  { title: 'Listing-Ready', body: 'The home is photographed and ready to impress buyers from the very first showing.' },
]

const DEFAULT_REVIEWS = [
  { image: '/images/staged/staged-16.webp', quote: 'Client testimonial placeholder.', name: 'Client name' },
  { image: '/images/staged/staged-23.webp', quote: 'Client testimonial placeholder.', name: 'Client name' },
]

export default async function HomePage() {
  const content = await getNgfContent()

  const heroItems = getItems(content, 'home.hero')
  const slides: HeroSlide[] = heroItems.length > 0
    ? heroItems.map((h, i) => ({ image: h.image || DEFAULT_HERO[i % DEFAULT_HERO.length].image, alt: h.image_alt || 'Staged home' }))
    : DEFAULT_HERO

  const envItems = getItems(content, 'home.environments')
  const environments = (envItems.length > 0 ? envItems : DEFAULT_ENVIRONMENTS) as Record<string, string>[]

  const recentRaw = getItems(content, 'home.recent')
  const recent = (recentRaw.length > 0 ? recentRaw : DEFAULT_RECENT) as Record<string, string>[]

  const processRaw = getItems(content, 'home.process')
  const process = (processRaw.length > 0 ? processRaw : DEFAULT_PROCESS) as Record<string, string>[]

  const reviewsRaw = getItems(content, 'home.reviews')
  const reviews = (reviewsRaw.length > 0 ? reviewsRaw : DEFAULT_REVIEWS) as Record<string, string>[]

  return (
    <>
      {/* ── Hero ── */}
      <HeroCarousel slides={slides}>
        <div className="max-w-[680px] text-white">
          <p className="eyebrow !text-white/70 mb-5" data-ngf-field="home.heroEyebrow" data-ngf-label="Eyebrow" data-ngf-type="text" data-ngf-section="Hero">
            {content['home.heroEyebrow'] || 'West Michigan Home Staging'}
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.05] mb-6" data-ngf-field="home.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Hero">
            {content['home.heroHeadline'] || 'Staging that helps homes sell.'}
          </h1>
          <p className="text-lg text-white/80 max-w-[520px] mb-9" data-ngf-field="home.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Hero">
            {content['home.heroBody'] || 'Professional home staging and home edit consultations for listings from $250K to $2M and new construction.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/showcase" className="btn btn-ghost-light">View Our Work</Link>
            <Link href="/contact" className="btn btn-solid !bg-white !text-ink !border-white">Get a Quote</Link>
          </div>
        </div>
      </HeroCarousel>

      {/* ── Intro ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[860px] px-5 text-center">
          <p className="eyebrow mb-5">Who We Serve</p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)] leading-tight mb-6" data-ngf-field="home.introHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Intro">
            {content['home.introHeadline'] || 'We help homeowners, agents, and builders present every listing at its best.'}
          </h2>
          <p className="text-[1.05rem] text-muted leading-relaxed max-w-[640px] mx-auto" data-ngf-field="home.introBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Intro">
            {content['home.introBody'] || 'From first-time listings to luxury new construction, our goal is to showcase a home so buyers connect with it — and make stronger offers, faster.'}
          </p>
        </div>
      </section>

      {/* ── Environments ── */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5">
          <div
            className="grid md:grid-cols-3 gap-px bg-line"
            data-ngf-group="home.environments"
            data-ngf-item-label="Environment"
            data-ngf-min-items="1"
            data-ngf-max-items="6"
            data-ngf-item-fields='[{"key":"image","label":"Image","type":"image","aspect":"4:5"},{"key":"title","label":"Title","type":"text"},{"key":"blurb","label":"Blurb","type":"textarea"}]'
          >
            {environments.map((env, i) => (
              <Link key={i} href={`/showcase#${slug(env.title || `env-${i}`)}`} className="group relative bg-white block">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={env.image || DEFAULT_ENVIRONMENTS[i % 3].image}
                    alt={env.image_alt || env.title || 'Staged environment'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ngf-field={`home.environments.${i}.image`}
                    data-ngf-label="Image"
                    data-ngf-type="image"
                    data-ngf-section="Environments"
                    data-ngf-aspect="4:5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <h3 className="font-serif text-2xl mb-1.5" data-ngf-field={`home.environments.${i}.title`} data-ngf-label="Title" data-ngf-type="text" data-ngf-section="Environments">
                    {env.title || 'Environment'}
                  </h3>
                  <p className="text-sm text-white/80 max-w-[240px]" data-ngf-field={`home.environments.${i}.blurb`} data-ngf-label="Blurb" data-ngf-type="textarea" data-ngf-section="Environments">
                    {env.blurb || ''}
                  </p>
                  <span className="inline-block mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">View Work →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent work ── */}
      <section className="py-24 md:py-32 bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow mb-4">Recent Staging</p>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)]">Selected work</h2>
            </div>
            <Link href="/showcase" className="btn btn-outline">Full Portfolio</Link>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            data-ngf-group="home.recent"
            data-ngf-item-label="Photo"
            data-ngf-min-items="0"
            data-ngf-max-items="12"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"3:4"}]'
          >
            {recent.map((item, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden bg-white framed">
                <img
                  src={item.image || DEFAULT_RECENT[i % DEFAULT_RECENT.length].image}
                  alt={item.image_alt || `Staged space ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  data-ngf-field={`home.recent.${i}.image`}
                  data-ngf-label="Photo"
                  data-ngf-type="image"
                  data-ngf-section="Recent Staging"
                  data-ngf-aspect="3:4"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">How It Works</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)]">A simple, guided process</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <div
            className="grid md:grid-cols-3 gap-12"
            data-ngf-group="home.process"
            data-ngf-item-label="Step"
            data-ngf-min-items="1"
            data-ngf-max-items="6"
            data-ngf-item-fields='[{"key":"title","label":"Title","type":"text"},{"key":"body","label":"Body","type":"textarea"}]'
          >
            {process.map((s, i) => (
              <div key={i}>
                <span className="block w-10 h-px bg-ink mb-5" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-[0.06em]" data-ngf-field={`home.process.${i}.title`} data-ngf-label="Title" data-ngf-type="text" data-ngf-section="Process">
                  {s.title || `Step ${i + 1}`}
                </h3>
                <p className="text-muted leading-relaxed text-[0.95rem]" data-ngf-field={`home.process.${i}.body`} data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Process">
                  {s.body || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-24 md:py-32 bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="eyebrow text-center mb-4">Kind Words</p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)] text-center mb-14">What clients say</h2>
          <div
            className="grid md:grid-cols-2 gap-3"
            data-ngf-group="home.reviews"
            data-ngf-item-label="Review"
            data-ngf-min-items="1"
            data-ngf-max-items="8"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"1:1"},{"key":"quote","label":"Quote","type":"textarea"},{"key":"name","label":"Name","type":"text"}]'
          >
            {reviews.map((r, i) => (
              <div key={i} className="grid grid-cols-[40%_1fr] bg-white elevate overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={r.image || DEFAULT_REVIEWS[i % DEFAULT_REVIEWS.length].image}
                    alt={r.image_alt || ''}
                    className="w-full h-full object-cover min-h-[220px]"
                    data-ngf-field={`home.reviews.${i}.image`}
                    data-ngf-label="Photo"
                    data-ngf-type="image"
                    data-ngf-section="Reviews"
                    data-ngf-aspect="1:1"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="font-serif text-xl leading-snug mb-4" data-ngf-field={`home.reviews.${i}.quote`} data-ngf-label="Quote" data-ngf-type="textarea" data-ngf-section="Reviews">
                    &ldquo;{r.quote || 'Client testimonial placeholder.'}&rdquo;
                  </p>
                  <p className="eyebrow !text-ink" data-ngf-field={`home.reviews.${i}.name`} data-ngf-label="Name" data-ngf-type="text" data-ngf-section="Reviews">
                    {r.name || 'Client name'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop teaser ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] overflow-hidden order-2 md:order-1 framed">
            <img
              src={content['home.shopImage'] || '/images/staged/staged-20.webp'}
              alt={content['home.shopImage_alt'] || 'Furniture and decor for sale'}
              className="w-full h-full object-cover"
              data-ngf-field="home.shopImage"
              data-ngf-label="Shop Image"
              data-ngf-type="image"
              data-ngf-section="Shop Teaser"
              data-ngf-aspect="4:3"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="eyebrow mb-4">Shop With Us</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.9rem)] mb-5" data-ngf-field="home.shopHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Shop Teaser">
              {content['home.shopHeadline'] || 'Furniture & decor for sale'}
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-[440px]" data-ngf-field="home.shopBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Shop Teaser">
              {content['home.shopBody'] || 'Brand-new pieces from our staging inventory — available for your own home. Browse what’s currently available.'}
            </p>
            <Link href="/shop" className="btn btn-outline">Browse the Shop</Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[860px] px-5 py-24 md:py-28 text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] mb-6 text-white" data-ngf-field="home.ctaHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Final CTA">
            {content['home.ctaHeadline'] || 'Ready to stage your listing?'}
          </h2>
          <p className="text-white/70 max-w-[480px] mx-auto mb-9" data-ngf-field="home.ctaBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Final CTA">
            {content['home.ctaBody'] || 'Tell us about the property and we’ll get back to you within 1–2 business days.'}
          </p>
          <Link href="/contact" className="btn btn-solid !bg-white !text-ink !border-white">Get a Quote</Link>
        </div>
      </section>
    </>
  )
}
