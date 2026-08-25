import { getNgfContent, getItems } from '@/lib/ngf'
import { TeamGrid } from '@/components/TeamGrid'
import { PageHero } from '@/components/PageHero'

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

          <TeamGrid members={defaultTeam} content={content} showBio />
        </div>
      </section>

    </main>
  )
}
