import { getNgfContent, getItems } from '@/lib/ngf'
import { TeamGrid } from '@/components/TeamGrid'

export const metadata = {
  title: 'Meet the Team',
  description: 'Meet the Perrine Interiors staging team — passionate professionals dedicated to helping sellers present their best.',
}

export default async function TeamPage() {
  const content = await getNgfContent()

  const teamMembers = getItems(content, 'team.members')
  const defaultTeam = teamMembers.length > 0
    ? teamMembers
    : [
        {
          photo: '/placeholder-person.svg',
          name: 'Melissa Perrine',
          role: 'Founder',
          bio: 'Add a short bio for this team member here.',
        },
        {
          photo: '/placeholder-person.svg',
          name: 'Team Member',
          role: 'Role',
          bio: 'Add a short bio for this team member here.',
        },
        {
          photo: '/placeholder-person.svg',
          name: 'Team Member',
          role: 'Role',
          bio: 'Add a short bio for this team member here.',
        },
      ]

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: `url('${content['team.heroImage'] || '/images/staged/staged-16.webp'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#ffffff] mb-3"
            data-ngf-field="team.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['team.heroEyebrow'] || 'Meet the Team'}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="team.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['team.heroHeadline'] || 'The People Behind the Transformations'}
          </h1>
        </div>
      </section>

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

          <TeamGrid members={defaultTeam} content={content} showBio />
        </div>
      </section>

    </main>
  )
}
