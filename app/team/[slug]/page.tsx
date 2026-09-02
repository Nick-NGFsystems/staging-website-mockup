import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNgfContent } from '@/lib/ngf'
import { getTeamMembers, type TeamMember } from '@/lib/team'
import { DEFAULT_TEAM } from '../team-data'

// No force-dynamic: it would bypass ISR entirely. ISR plus the
// /api/revalidate webhook already make published edits appear immediately.

async function resolveMember(slug: string): Promise<{ member: TeamMember; all: TeamMember[] } | null> {
  const content = await getNgfContent()
  const all = getTeamMembers(content, DEFAULT_TEAM)
  const member = all.find(m => m.slug === slug)
  return member ? { member, all } : null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await resolveMember(slug)
  if (!found) return { title: 'Not Found' }
  const { member } = found
  return {
    title: member.name,
    description: member.bio || `${member.name} — ${member.role || 'Perrine Interiors'}.`,
    openGraph: { images: [{ url: member.photo }] },
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await resolveMember(slug)
  if (!found) notFound()
  const { member, all } = found
  const i = member.index
  const others = all.filter(m => m.slug !== member.slug).slice(0, 3)

  return (
    <main id="main-content">
      <section className="pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-[1120px] px-4">
          <Link
            href="/team"
            className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Back to Team
          </Link>

          <div className="mt-7 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14">
            <div className="bg-[#f4f4f4] overflow-hidden">
              <img
                src={member.photo}
                alt={member.photoAlt || member.name}
                data-ngf-field={`team.members.${i}.photo`}
                data-ngf-label="Photo"
                data-ngf-type="image"
                data-ngf-section="Team"
                data-ngf-aspect="3:4"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>

            <div className="min-w-0 md:pt-2">
              <p
                className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)] mb-4 min-h-[1em]"
                data-ngf-field={`team.members.${i}.role`}
                data-ngf-label="Role"
                data-ngf-type="text"
                data-ngf-section="Team"
              >
                {member.role}
              </p>

              <h1
                className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.12]"
                data-ngf-field={`team.members.${i}.name`}
                data-ngf-label="Name"
                data-ngf-type="text"
                data-ngf-section="Team"
              >
                {member.name}
              </h1>

              <p
                className="mt-8 text-[1.05rem] leading-relaxed whitespace-pre-line"
                data-ngf-field={`team.members.${i}.bio`}
                data-ngf-label="Bio"
                data-ngf-type="textarea"
                data-ngf-section="Team"
              >
                {member.bio || 'Add a short bio for this team member here.'}
              </p>

              <p className="mt-9 text-[0.95rem] text-[var(--muted)]">
                Want to talk through a listing?{' '}
                <Link href="/contact" className="text-[var(--ink)] border-b border-[var(--ink)] pb-0.5 hover:opacity-60 transition-opacity">
                  Get in touch.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1120px] px-4">
            <h2 className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)] mb-9">
              More of the Team
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {others.map(m => (
                <Link key={m.slug} href={`/team/${m.slug}`} className="group block">
                  <div className="overflow-hidden bg-[#f4f4f4]">
                    <img
                      src={m.photo}
                      alt={m.photoAlt || m.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-serif text-lg mt-4">{m.name}</h3>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">{m.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
