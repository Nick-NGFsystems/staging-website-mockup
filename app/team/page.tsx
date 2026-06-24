import { getNgfContent, getItems } from '@/lib/ngf'

export const metadata = {
  title: 'Meet the Team',
  description: 'Meet the Perrine Interiors home staging team.',
}

const AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#ece9e4"/><circle cx="200" cy="160" r="64" fill="#cfc9c0"/><rect x="96" y="248" width="208" height="130" rx="60" fill="#cfc9c0"/></svg>'
)

const DEFAULT_TEAM = [
  { image: AVATAR, name: 'Melissa Perrine', role: 'Founder', bio: 'Add a short bio for this team member here.' },
  { image: AVATAR, name: 'Team Member', role: 'Role', bio: 'Add a short bio for this team member here.' },
  { image: AVATAR, name: 'Team Member', role: 'Role', bio: 'Add a short bio for this team member here.' },
]

export default async function TeamPage() {
  const content = await getNgfContent()
  const items = getItems(content, 'team.members')
  const team = (items.length > 0 ? items : DEFAULT_TEAM) as Record<string, string>[]

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5">Meet the Team</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="team.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['team.heroHeadline'] || 'The people behind the work'}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
            data-ngf-group="team.members"
            data-ngf-item-label="Member"
            data-ngf-min-items="1"
            data-ngf-max-items="20"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"1:1"},{"key":"name","label":"Name","type":"text"},{"key":"role","label":"Role","type":"text"},{"key":"bio","label":"Bio","type":"textarea"}]'
          >
            {team.map((m, i) => (
              <div key={i}>
                <div className="aspect-square overflow-hidden bg-bg-alt mb-5 framed">
                  <img
                    src={m.image || AVATAR}
                    alt={m.image_alt || m.name || `Team member ${i + 1}`}
                    className="w-full h-full object-cover"
                    data-ngf-field={`team.members.${i}.image`}
                    data-ngf-label="Photo"
                    data-ngf-type="image"
                    data-ngf-section="Team"
                    data-ngf-aspect="1:1"
                  />
                </div>
                <h3 className="font-serif text-xl" data-ngf-field={`team.members.${i}.name`} data-ngf-label="Name" data-ngf-type="text" data-ngf-section="Team">
                  {m.name || 'Team Member'}
                </h3>
                <p className="eyebrow !text-muted mt-1 mb-3" data-ngf-field={`team.members.${i}.role`} data-ngf-label="Role" data-ngf-type="text" data-ngf-section="Team">
                  {m.role || 'Role'}
                </p>
                <p className="text-muted leading-relaxed text-[0.95rem]" data-ngf-field={`team.members.${i}.bio`} data-ngf-label="Bio" data-ngf-type="textarea" data-ngf-section="Team">
                  {m.bio || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
