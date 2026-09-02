import { getNgfContent } from '@/lib/ngf'
import { TeamGrid } from '@/components/TeamGrid'
import { TrustedPartners } from '@/components/TrustedPartners'
import { getTeamMembers, getPartners } from '@/lib/team'
import { DEFAULT_TEAM, DEFAULT_PARTNERS } from './team-data'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Meet the Team',
  description: 'Meet the Perrine Interiors staging team — passionate professionals dedicated to helping sellers present their best.',
}

export default async function TeamPage() {
  const content = await getNgfContent()

  const members = getTeamMembers(content, DEFAULT_TEAM)
  const partners = getPartners(content, DEFAULT_PARTNERS)

  return (
    <main id="main-content">
      <PageHero
        prefix="team"
        content={content}
        defaultImage="/images/staged/staged-16.webp"
        defaultEyebrow={'Meet the Team'}
        defaultHeadline={'The People Behind the Transformations'}
      />

      {/* ── Team Grid ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-4">
          <p
            className="max-w-[720px] text-[1.05rem] leading-relaxed text-[var(--muted)] mb-16"
            data-ngf-field="team.intro"
            data-ngf-label="Intro Paragraph"
            data-ngf-type="textarea"
            data-ngf-section="Team"
          >
            {content['team.intro'] || 'Every home we stage is prepared by people who care how it feels to walk through the front door. Get to know the team behind the transformations.'}
          </p>

          <TeamGrid members={members} />
        </div>
      </section>


      {/* ── Trusted Partners ── */}
      <section className="py-16 md:py-24 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2
            className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-center mb-3"
            data-ngf-field="team.partnersHeadline"
            data-ngf-label="Section Headline"
            data-ngf-type="text"
            data-ngf-section="Trusted Partners"
          >
            {content['team.partnersHeadline'] || 'Trusted Partners'}
          </h2>
          <p
            className="text-center text-[var(--muted)] max-w-[560px] mx-auto mb-14"
            data-ngf-field="team.partnersIntro"
            data-ngf-label="Intro"
            data-ngf-type="textarea"
            data-ngf-section="Trusted Partners"
          >
            {content['team.partnersIntro'] || 'The photographers, tradespeople and vendors we work alongside on every project.'}
          </p>

          <TrustedPartners partners={partners} />
        </div>
      </section>
    </main>
  )
}
