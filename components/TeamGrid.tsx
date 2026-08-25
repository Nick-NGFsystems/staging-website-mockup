import type { NgfSiteContent } from '@/lib/ngf'
import { Lightbox, ZoomImage } from '@/components/Lightbox'

export type TeamMember = {
  photo?: string
  name?: string
  role?: string
  bio?: string
}

/**
 * Full-bleed portrait team cards (Vesta "Creative Directors" pattern): the
 * photograph is the card, with the name and role set beneath it. No cropped
 * circular headshots, no icons.
 *
 * Shared by the home page preview and the full /team page so the two always
 * look identical. `showBio` is the only difference between them.
 */
export function TeamGrid({
  members,
  content,
  showBio = false,
}: {
  members: TeamMember[]
  content: NgfSiteContent
  showBio?: boolean
}) {
  return (
    <Lightbox>
    <div
      className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      data-ngf-group="team.members"
      data-ngf-item-label="Team Member"
      data-ngf-min-items="1"
      data-ngf-max-items="24"
      data-ngf-item-fields='[{"key":"photo","label":"Photo","type":"image","aspect":"3:4"},{"key":"name","label":"Name","type":"text"},{"key":"role","label":"Role","type":"text"},{"key":"bio","label":"Bio","type":"textarea"}]'
    >
      {members.map((member, i) => (
        <article key={i} className="group">
          {/* The image is the card — 3:4 portrait, full width */}
          <div className="relative overflow-hidden bg-[#f4f4f4] aspect-[3/4]">
            <ZoomImage
              src={content[`team.members.${i}.photo`] || member.photo || '/placeholder-person.svg'}
              alt={content[`team.members.${i}.photo_alt`] || content[`team.members.${i}.name`] || member.name || 'Team member'}
              ngfField={`team.members.${i}.photo`}
              ngfLabel="Photo"
              ngfSection="Team"
              ngfAspect="3:4"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>

          <h3
            className="font-serif text-[1.4rem] mt-5"
            data-ngf-field={`team.members.${i}.name`}
            data-ngf-label="Name"
            data-ngf-type="text"
            data-ngf-section="Team"
          >
            {content[`team.members.${i}.name`] || member.name || 'Team Member'}
          </h3>

          <p
            className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]"
            data-ngf-field={`team.members.${i}.role`}
            data-ngf-label="Role"
            data-ngf-type="text"
            data-ngf-section="Team"
          >
            {content[`team.members.${i}.role`] || member.role || 'Role'}
          </p>

          {showBio && (
            <p
              className="mt-4 text-[0.95rem] leading-relaxed text-[var(--muted)] whitespace-pre-line"
              data-ngf-field={`team.members.${i}.bio`}
              data-ngf-label="Bio"
              data-ngf-type="textarea"
              data-ngf-section="Team"
            >
              {content[`team.members.${i}.bio`] || member.bio || ''}
            </p>
          )}
        </article>
      ))}
    </div>
    </Lightbox>
  )
}
