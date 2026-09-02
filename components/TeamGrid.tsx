import Link from 'next/link'
import { TEAM_ITEM_FIELDS, type TeamMember } from '@/lib/team'

/**
 * Full-bleed portrait team cards (Vesta "Creative Directors" pattern): the
 * photograph is the card, name and role beneath, and the whole card opens that
 * person's bio page.
 *
 * No lightbox here — the card is a link, so a zoom-on-click would fight the
 * navigation. (NGF-STANDARDS exempts images that are already interactive.)
 *
 * Shared by the home-page preview and /team so the two can never drift.
 */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div
      className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      data-ngf-group="team.members"
      data-ngf-item-label="Team Member"
      data-ngf-min-items="1"
      data-ngf-max-items="24"
      data-ngf-item-fields={TEAM_ITEM_FIELDS}
    >
      {members.map(member => (
        <article key={member.slug} className="group">
          <Link href={`/team/${member.slug}`} className="block">
            <div className="relative overflow-hidden bg-[#f4f4f4] aspect-[3/4]">
              <img
                src={member.photo}
                alt={member.photoAlt || member.name}
                data-ngf-field={`team.members.${member.index}.photo`}
                data-ngf-label="Photo"
                data-ngf-type="image"
                data-ngf-section="Team"
                data-ngf-aspect="3:4"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <h3
              className="font-serif text-[1.4rem] mt-5"
              data-ngf-field={`team.members.${member.index}.name`}
              data-ngf-label="Name"
              data-ngf-type="text"
              data-ngf-section="Team"
            >
              {member.name}
            </h3>

            <p
              className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]"
              data-ngf-field={`team.members.${member.index}.role`}
              data-ngf-label="Role"
              data-ngf-type="text"
              data-ngf-section="Team"
            >
              {member.role}
            </p>
          </Link>
        </article>
      ))}
    </div>
  )
}
