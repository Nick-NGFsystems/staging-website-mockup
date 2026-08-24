import { getNgfContent, getItems } from '@/lib/ngf'
import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel'
import { TeamGrid } from '@/components/TeamGrid'

const DEFAULT_HERO: HeroSlide[] = [
  { image: '/images/hero.webp', alt: 'Staged living room' },
  { image: '/images/staged/staged-15.webp', alt: 'Staged interior' },
  { image: '/images/staged/staged-17.webp', alt: 'Staged kitchen' },
  { image: '/images/staged/staged-02.webp', alt: 'Staged dining room' },
  { image: '/images/staged/staged-21.webp', alt: 'Staged bedroom' },
]

export default async function HomePage() {
  const content = await getNgfContent()

  const heroItems = getItems(content, 'home.hero')
  const heroSlides: HeroSlide[] = heroItems.length > 0
    ? heroItems.map((it, i) => ({
        image: it.image || DEFAULT_HERO[i % DEFAULT_HERO.length].image,
        alt: it.alt || 'Staged interior',
      }))
    : DEFAULT_HERO

  const recentItems = getItems(content, 'home.recent')
  const defaultRecent = recentItems.length > 0
    ? recentItems
    : [
        { title: 'Bright Living Room', image: '/images/staged/staged-15.webp' },
        { title: 'Open-Concept Kitchen', image: '/images/staged/staged-17.webp' },
        { title: 'Serene Primary Suite', image: '/images/staged/staged-09.webp' },
      ]

  const videoItems = getItems(content, 'home.videos')
  const defaultVideos = videoItems.length > 0
    ? videoItems
    : [
        { title: 'Staging video title' },
        { title: 'Staging video title' },
      ]

  const teamMembers = getItems(content, 'team.members')
  const defaultTeam = teamMembers.length > 0
    ? teamMembers
    : [
        { photo: '/placeholder-person.svg', name: 'Melissa Perrine', role: 'Founder' },
        { photo: '/placeholder-person.svg', name: 'Team Member', role: 'Role' },
        { photo: '/placeholder-person.svg', name: 'Team Member', role: 'Role' },
      ]

  const blogItems = getItems(content, 'blog.posts')
  const defaultBlog = blogItems.length > 0
    ? blogItems
    : [
        {
          image: '/images/staged/staged-06.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '/blog',
        },
        {
          image: '/images/staged/staged-13.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '/blog',
        },
        {
          image: '/images/staged/staged-19.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '/blog',
        },
      ]

  const reviews = [
    'Client testimonial placeholder',
    'Client testimonial placeholder',
    'Client testimonial placeholder',
    'Client testimonial placeholder',
    'Client testimonial placeholder',
    'Client testimonial placeholder',
  ]

  const featuredIn = [
    'Logo placeholder',
    'Logo placeholder',
    'Logo placeholder',
    'Logo placeholder',
    'Logo placeholder',
  ]

  return (
    <main id="main-content">
      {/* ── 1. Hero ── */}
      <HeroCarousel slides={heroSlides} className="min-h-[80vh]">
        <div className="max-w-[700px] text-white">
          <p
            className="inline-block text-[0.72rem] tracking-[0.16em] uppercase text-white/75 mb-5"
            data-ngf-field="home.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Hero"
          >
            {content['home.heroEyebrow'] || 'Staging & Home Edit'}
          </p>
          <h1
            className="font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] mb-6"
            data-ngf-field="home.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Hero"
          >
            {content['home.heroHeadline'] || 'Transform Your Space. Elevate Your Sale.'}
          </h1>
          <p
            className="text-[1.05rem] text-white/80 mb-9 max-w-[560px]"
            data-ngf-field="home.heroBody"
            data-ngf-label="Body Copy"
            data-ngf-type="textarea"
            data-ngf-section="Hero"
          >
            {content['home.heroBody'] || 'Professional home staging and home edit consultations to help your listing show its very best.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/showcase"
              className="inline-flex items-center justify-center px-7 min-h-[48px] bg-white text-[var(--ink)] text-[0.72rem] uppercase tracking-[0.16em] hover:bg-white/90 transition-colors"
            >
              See Staging Showcase
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 min-h-[48px] border border-white/60 text-white text-[0.72rem] uppercase tracking-[0.16em] hover:bg-white hover:text-[var(--ink)] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </HeroCarousel>

      {/* ── 2. Who We Serve ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-4"
            data-ngf-field="home.whoWeServeHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Who We Serve"
          >
            {content['home.whoWeServeHeadline'] || 'Who We Serve'}
          </h2>
          <p
            className="text-center text-[var(--muted)] max-w-[560px] mx-auto mb-12 text-[1.05rem]"
            data-ngf-field="home.whoWeServeIntro"
            data-ngf-label="Intro Paragraph"
            data-ngf-type="textarea"
            data-ngf-section="Who We Serve"
          >
            {content['home.whoWeServeIntro'] || 'We partner with homeowners, real estate agents, and builders to maximize every listing\'s visual potential and drive stronger offers.'}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Price Band */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-2"
                data-ngf-field="home.serveCard1Title"
                data-ngf-label="Card 1 Title"
                data-ngf-type="text"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard1Title'] || 'Every Price Point'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="home.serveCard1Body"
                data-ngf-label="Card 1 Body"
                data-ngf-type="textarea"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard1Body'] || 'We tailor staging packages to your home\'s price point and the expectations of buyers at that level.'}
              </p>
            </div>
            {/* Card 2 — Property Types */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-2"
                data-ngf-field="home.serveCard2Title"
                data-ngf-label="Card 2 Title"
                data-ngf-type="text"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard2Title'] || 'Property Types'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="home.serveCard2Body"
                data-ngf-label="Card 2 Body"
                data-ngf-type="textarea"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard2Body'] || 'Occupied homes, vacant properties, and new construction — each with a customized approach that reflects the unique staging needs of that property type.'}
              </p>
            </div>
            {/* Card 3 — Outcome */}
            <div className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h3
                className="font-serif text-xl mb-2"
                data-ngf-field="home.serveCard3Title"
                data-ngf-label="Card 3 Title"
                data-ngf-type="text"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard3Title'] || 'Outcome'}
              </h3>
              <p
                className="text-[var(--muted)] text-sm leading-relaxed"
                data-ngf-field="home.serveCard3Body"
                data-ngf-label="Card 3 Body"
                data-ngf-type="textarea"
                data-ngf-section="Who We Serve"
              >
                {content['home.serveCard3Body'] || 'Stronger listing photos, increased buyer engagement, faster sales, and higher offers — staging is one of the best ROI investments a seller can make.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Recent Staging ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-4"
            data-ngf-field="home.recentHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Recent Staging"
          >
            {content['home.recentHeadline'] || 'Recent Staging'}
          </h2>
          <p
            className="text-center text-[var(--muted)] max-w-[480px] mx-auto mb-12"
            data-ngf-field="home.recentIntro"
            data-ngf-label="Intro"
            data-ngf-type="textarea"
            data-ngf-section="Recent Staging"
          >
            {content['home.recentIntro'] || 'See the difference professional staging makes.'}
          </p>
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ngf-group="home.recent"
            data-ngf-item-label="Project"
            data-ngf-min-items="1"
            data-ngf-max-items="9"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"3:2"},{"key":"title","label":"Project Title","type":"text"}]'
          >
            {defaultRecent.map((item, i) => (
              <div key={i} className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <img
                  src={item.image || '/images/staged/staged-15.webp'}
                  alt={item.title || `Staged project ${i + 1}`}
                  className="w-full aspect-[3/2] object-cover"
                  data-ngf-field={`home.recent.${i}.image`}
                  data-ngf-label="Photo"
                  data-ngf-type="image"
                  data-ngf-section="Recent Staging"
                  data-ngf-aspect="3:2"
                />
                <h3
                  className="font-serif text-lg p-4"
                  data-ngf-field={`home.recent.${i}.title`}
                  data-ngf-label="Project Title"
                  data-ngf-type="text"
                  data-ngf-section="Recent Staging"
                >
                  {item.title || `Project ${i + 1}`}
                </h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/showcase"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--brand)] text-white font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px]"
            >
              View Full Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. Watch Staging Videos ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-12"
            data-ngf-field="home.videosHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Watch Staging Videos"
          >
            {content['home.videosHeadline'] || 'Watch Staging Videos'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {defaultVideos.map((item, i) => (
              <div key={i} className="bg-white border border-[var(--line)] rounded-[14px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="aspect-video bg-[var(--brand)]/10 border-2 border-dashed border-[var(--brand)]/40 rounded-[10px] flex items-center justify-center mb-3">
                  <span className="text-[var(--brand)] text-sm font-medium">Video Embed Placeholder</span>
                </div>
                <p
                  className="font-serif text-base text-center"
                  data-ngf-field={`home.videos.${i}.title`}
                  data-ngf-label="Video Title"
                  data-ngf-type="text"
                  data-ngf-section="Watch Staging Videos"
                >
                  {item.title || `Staging Video ${i + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Meet the Team Preview ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-4"
            data-ngf-field="home.teamHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Team"
          >
            {content['home.teamHeadline'] || 'Meet the Team'}
          </h2>
          <p
            className="text-center text-[var(--muted)] max-w-[560px] mx-auto mb-14"
            data-ngf-field="home.teamIntro"
            data-ngf-label="Intro"
            data-ngf-type="textarea"
            data-ngf-section="Team"
          >
            {content['home.teamIntro'] || 'Passionate professionals dedicated to making every home shine for its next chapter.'}
          </p>

          <TeamGrid members={defaultTeam} content={content} />

          <div className="mt-16 text-center">
            <a
              href="/team"
              className="inline-flex items-center justify-center px-7 min-h-[48px] bg-[var(--ink)] text-white text-[0.72rem] uppercase tracking-[0.16em] hover:bg-black transition-colors"
            >
              View Full Team
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. Reviews / Testimonials ── */}
      <section className="py-16 md:py-24 bg-[var(--bg)]">
        <div className="mx-auto max-w-[1120px] px-4 mb-10">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center"
            data-ngf-field="home.reviewsHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Reviews"
          >
            {content['home.reviewsHeadline'] || 'Reviews'}
          </h2>
        </div>
        <div className="overflow-hidden" aria-label="Scrolling reviews">
          <div className="marquee-track">
            {reviews.map((quote, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-3 px-6 py-4 bg-white border border-[var(--line)] rounded-full shadow-sm max-w-[320px]"
              >
                <p className="text-sm text-[var(--ink)] italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Featured In ── */}
      <section className="py-12 bg-[#f4f4f4]">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-xl text-center mb-8 text-[var(--muted)]"
            data-ngf-field="home.featuredInHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Featured In"
          >
            {content['home.featuredInHeadline'] || 'Featured In'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredIn.map((badge, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white border border-[var(--line)] rounded-full text-sm font-medium text-[var(--ink)] shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Blog Preview ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-center mb-12"
            data-ngf-field="home.blogHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Blog Preview"
          >
            {content['home.blogHeadline'] || 'From the Blog'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {defaultBlog.map((post, i) => (
              <div key={i} className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <img
                  src={post.image || '/images/staged/staged-23.webp'}
                  alt={post.title || `Blog Post ${i + 1}`}
                  className="w-full aspect-[16/9] object-cover"
                />
                <div className="p-5">
                  <h3 className="font-serif text-lg mb-2 leading-snug">{post.title || `Blog Post ${i + 1}`}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">{post.summary || 'Coming soon.'}</p>
                  <a
                    href={post.link || '/blog'}
                    className="text-[var(--brand)] text-sm font-semibold hover:underline min-h-[44px] inline-flex items-center"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA Strip ── */}
      <section className="py-16 md:py-24 bg-[var(--brand)]">
        <div className="mx-auto max-w-[1120px] px-4 text-center text-white">
          <h2
            className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] mb-4"
            data-ngf-field="home.ctaHeadline"
            data-ngf-label="CTA Headline"
            data-ngf-type="text"
            data-ngf-section="CTA Strip"
          >
            {content['home.ctaHeadline'] || 'Ready to Sell Faster and for More?'}
          </h2>
          <p
            className="text-white/80 text-[1.05rem] max-w-[520px] mx-auto mb-8"
            data-ngf-field="home.ctaBody"
            data-ngf-label="CTA Body Copy"
            data-ngf-type="textarea"
            data-ngf-section="CTA Strip"
          >
            {content['home.ctaBody'] || 'Book a staging inquiry today and find out how Perrine Interiors can help your listing stand out in any market.'}
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
