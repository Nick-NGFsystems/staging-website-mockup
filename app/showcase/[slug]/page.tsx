import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNgfContent } from '@/lib/ngf'
import { getProjects, PROJECT_PHOTO_SLOTS, type Project } from '@/lib/projects'
import { DEFAULT_PROJECTS } from '../projects-data'
import ProjectGallery, { type GalleryImage } from './ProjectGallery'

// No force-dynamic: it would bypass ISR entirely. The site relies on ISR plus
// the /api/revalidate webhook, so published edits still appear immediately.

async function resolveProject(slug: string): Promise<{ project: Project; all: Project[] } | null> {
  const content = await getNgfContent()
  const all = getProjects(content, DEFAULT_PROJECTS)
  const project = all.find(p => p.slug === slug)
  return project ? { project, all } : null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await resolveProject(slug)
  if (!found) return { title: 'Project Not Found' }
  const { project } = found
  return {
    title: project.title,
    description: project.description || `${project.title} — a home staged by Perrine Interiors.`,
    openGraph: { images: [{ url: project.image }] },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await resolveProject(slug)
  if (!found) notFound()
  const { project, all } = found
  const i = project.index

  // Cover photo first, then every gallery slot. Empty slots are still rendered
  // so the client can fill them from the portal.
  const images: GalleryImage[] = [
    {
      src: project.image,
      alt: project.imageAlt || project.title,
      field: `showcase.projects.${i}.image`,
      label: 'Cover Photo',
    },
    ...Array.from({ length: PROJECT_PHOTO_SLOTS }, (_, n) => ({
      src: project.photos[n] || project.image,
      field: `showcase.projects.${i}.photo${n + 1}`,
      label: `Gallery Photo ${n + 1}`,
    })),
  ]

  const details: Array<{ label: string; value: string; field: string; ngfLabel: string }> = [
    { label: 'Property', value: project.stats, field: `showcase.projects.${i}.stats`, ngfLabel: 'Property Details' },
    { label: 'Location', value: project.location, field: `showcase.projects.${i}.location`, ngfLabel: 'Location' },
    { label: 'Staged By', value: project.designer, field: `showcase.projects.${i}.designer`, ngfLabel: 'Staged / Designed By' },
    { label: 'Sales Contact', value: project.salesContact, field: `showcase.projects.${i}.salesContact`, ngfLabel: 'Sales Contact' },
    { label: 'Listed By', value: project.agent, field: `showcase.projects.${i}.agent`, ngfLabel: 'Listing Agent Credit' },
    { label: 'Photographed By', value: project.photographer, field: `showcase.projects.${i}.photographer`, ngfLabel: 'Photographer Credit' },
  ]

  const others = all.filter(p => p.slug !== project.slug).slice(0, 3)

  return (
    <main id="main-content">
      {/* ── Gallery + details ── */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-[1240px] px-4">
          <Link
            href="/showcase"
            className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Back to Portfolio
          </Link>

          {/* grid-cols-1 is load-bearing: without an explicit template the single
              mobile track auto-sizes to its widest item, so a horizontally
              scrolling child stretches the column past the viewport. Tailwind's
              grid-cols-1 is minmax(0,1fr), which caps the track at the container. */}
          <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_minmax(0,1fr)] lg:gap-14">
            <ProjectGallery images={images} title={project.title} />

            <div className="min-w-0 lg:pt-2">
              <p
                className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)] mb-4 min-h-[1em]"
                data-ngf-field={`showcase.projects.${i}.category`}
                data-ngf-label="Category"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.category}
              </p>

              <h1
                className="font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.12] tracking-[0.01em]"
                data-ngf-field={`showcase.projects.${i}.title`}
                data-ngf-label="Project Title"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.title}
              </h1>

              <dl className="details-list mt-9 border-t border-[var(--line)]">
                {details.map(d => (
                  <div
                    key={d.field}
                    // Stacks on phones — a fixed label column would eat ~45% of a
                    // 375px screen and crush values like "Listed by …" into a
                    // sliver. Two columns only once there's room.
                    className="detail-row grid grid-cols-1 gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4 py-3.5 border-b border-[var(--line)]"
                  >
                    <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)] sm:pt-[3px]">
                      {d.label}
                    </dt>
                    <dd
                      className="text-[0.95rem] leading-snug break-words"
                      data-ngf-field={d.field}
                      data-ngf-label={d.ngfLabel}
                      data-ngf-type="text"
                      data-ngf-section="Showcase Portfolio"
                    >
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-[0.95rem] text-[var(--muted)]">
                Interested in staging a listing like this?{' '}
                <Link href="/contact" className="text-[var(--ink)] border-b border-[var(--ink)] pb-0.5 hover:opacity-60 transition-opacity">
                  Contact us.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1240px] px-4">
          <h2 className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)] pb-4 border-b border-[var(--line)]">
            Description
          </h2>
          <p
            className="mt-7 max-w-[70ch] text-[1.05rem] leading-relaxed whitespace-pre-line"
            data-ngf-field={`showcase.projects.${i}.description`}
            data-ngf-label="Description"
            data-ngf-type="textarea"
            data-ngf-section="Showcase Portfolio"
          >
            {project.description || 'Add a description of this project here.'}
          </p>
        </div>
      </section>

      {/* ── More projects ── */}
      {others.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1240px] px-4">
            <h2 className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)] mb-9">
              More Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {others.map(p => (
                <Link key={p.slug} href={`/showcase/${p.slug}`} className="group block">
                  <div className="overflow-hidden bg-[#f4f4f4]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full aspect-[3/2] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-serif text-lg mt-4">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-[#f4f4f4]">
        <div className="mx-auto max-w-[720px] px-4 text-center">
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] mb-4">
            Planning a listing like this one?
          </h2>
          <p className="text-[var(--muted)] mb-8">
            Tell us about the property and we will put together a staging proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 min-h-[48px] bg-[var(--ink)] text-white text-[0.72rem] uppercase tracking-[0.16em] hover:bg-black transition-colors"
          >
            Request a Proposal
          </Link>
        </div>
      </section>
    </main>
  )
}
