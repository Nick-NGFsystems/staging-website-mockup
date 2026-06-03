import { getNgfContent, getItems } from '@/lib/ngf'

export const dynamic = 'force-dynamic'

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
          photo: '/placeholder-team-1.jpg',
          name: 'Melissa Perrine',
          role: 'Founder',
          bio: 'Add a short bio for this team member here.',
        },
        {
          photo: '/placeholder-team-2.jpg',
          name: 'Team Member',
          role: 'Role',
          bio: 'Add a short bio for this team member here.',
        },
        {
          photo: '/placeholder-team-3.jpg',
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
        style={{ backgroundImage: `url('${content['team.heroImage'] || '/placeholder-hero.jpg'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,28,25,0.8)] to-[rgba(12,28,25,0.25)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#f5d9a6] mb-3"
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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-ngf-group="team.members"
            data-ngf-item-fields='[{"key":"photo","label":"Photo","type":"image"},{"key":"name","label":"Name","type":"text"},{"key":"role","label":"Role","type":"text"},{"key":"bio","label":"Bio","type":"textarea"}]'
          >
            {defaultTeam.map((member, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--line)] rounded-[14px] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={member.photo || '/placeholder-person.jpg'}
                  alt={member.name || `Team Member ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-[14px] mb-5"
                  data-ngf-field={`team.members.${i}.photo`}
                  data-ngf-label="Photo"
                  data-ngf-type="image"
                  data-ngf-section="Team"
                />
                <h3
                  className="font-serif text-xl mb-1"
                  data-ngf-field={`team.members.${i}.name`}
                  data-ngf-label="Name"
                  data-ngf-type="text"
                  data-ngf-section="Team"
                >
                  {member.name || 'Team Member'}
                </h3>
                <p
                  className="text-[var(--brand)] text-sm font-semibold mb-3"
                  data-ngf-field={`team.members.${i}.role`}
                  data-ngf-label="Role"
                  data-ngf-type="text"
                  data-ngf-section="Team"
                >
                  {member.role || 'Stager'}
                </p>
                <p
                  className="text-[var(--muted)] text-sm leading-relaxed"
                  data-ngf-field={`team.members.${i}.bio`}
                  data-ngf-label="Bio"
                  data-ngf-type="textarea"
                  data-ngf-section="Team"
                >
                  {member.bio || 'Bio coming soon.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
