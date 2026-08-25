import type { NgfSiteContent } from '@/lib/ngf'

/**
 * Standard page hero.
 *
 * The photograph is a real <img>, NOT a CSS background-image. The NGF bridge
 * edits an element's `src` attribute, and a background has none — so a hero
 * written as `style={{ backgroundImage: … }}` can never be changed by the
 * client, however well the text over it is annotated. See NGF-STANDARDS,
 * "Critical content-rendering rules" #3.
 *
 * Field paths are derived from `prefix`, e.g. prefix="team" gives
 * team.heroImage / team.heroImage_alt / team.heroEyebrow / team.heroHeadline.
 */
export function PageHero({
  prefix,
  content,
  defaultImage,
  defaultEyebrow,
  defaultHeadline,
  defaultAlt,
}: {
  prefix: string
  content: NgfSiteContent
  defaultImage: string
  defaultEyebrow: string
  defaultHeadline: string
  defaultAlt?: string
}) {
  return (
    <section className="relative min-h-[42vh] flex items-center text-white overflow-hidden">
      <img
        src={content[`${prefix}.heroImage`] || defaultImage}
        alt={content[`${prefix}.heroImage_alt`] || defaultAlt || ''}
        data-ngf-field={`${prefix}.heroImage`}
        data-ngf-label="Hero Image"
        data-ngf-type="image"
        data-ngf-section="Page Hero"
        data-ngf-aspect="16:9"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4">
        <div className="max-w-[760px]">
          <p
            className="inline-block text-[0.72rem] tracking-[0.16em] uppercase text-white/85 mb-3"
            data-ngf-field={`${prefix}.heroEyebrow`}
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content[`${prefix}.heroEyebrow`] || defaultEyebrow}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.12]"
            data-ngf-field={`${prefix}.heroHeadline`}
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content[`${prefix}.heroHeadline`] || defaultHeadline}
          </h1>
        </div>
      </div>
    </section>
  )
}
