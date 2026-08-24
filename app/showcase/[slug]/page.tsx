import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNgfContent } from '@/lib/ngf'
import { getProjects, type Project } from '@/lib/projects'
import { DEFAULT_PROJECTS } from '../projects-data'

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
    description:
      project.description ||
      `${project.title} — a home staged by Perrine Interiors.`,
    openGraph: { images: [{ url: project.image }] },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await resolveProject(slug)
  if (!found) notFound()
  const { project, all } = found
  const i = project.index

  // Cover photo plus any populated gallery slots.
  const photos = [project.image, ...project.photos].filter(Boolean)
  const others = all.filter(p => p.slug !== project.slug).slice(0, 3)

  return (
    <main id="main-content">
      {/* ── Cover ── */}
      <section className="relative h-[62vh] min-h-[420px] overflow-hidden bg-black">
        <img
          src={project.image}
          alt={project.title}
          data-ngf-field={`showcase.projects.${i}.image`}
          data-ngf-label="Cover Photo"
          data-ngf-type="image"
          data-ngf-section="Showcase Portfolio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/25" />
        <div className="relative z-10 h-full mx-auto max-w-[1120px] px-4 flex flex-col justify-end pb-12">
          <Link
            href="/showcase"
            className="text-[0.68rem] uppercase tracking-[0.16em] text-white/70 hover:text-white transition-colors mb-5"
          >
            Back to Portfolio
          </Link>
          {project.category && (
            <p
              className="text-[0.72rem] uppercase tracking-[0.16em] text-white/75 mb-3"
              data-ngf-field={`showcase.projects.${i}.category`}
              data-ngf-label="Category"
              data-ngf-type="text"
              data-ngf-section="Showcase Portfolio"
            >
              {project.category}
            </p>
          )}
          <h1
            className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.1] text-white"
            data-ngf-field={`showcase.projects.${i}.title`}
            data-ngf-label="Project Title"
            data-ngf-type="text"
            data-ngf-section="Showcase Portfolio"
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p
              className="text-[1.05rem] leading-relaxed text-[var(--ink)] whitespace-pre-line"
              data-ngf-field={`showcase.projects.${i}.description`}
              data-ngf-label="Description"
              data-ngf-type="textarea"
              data-ngf-section="Showcase Portfolio"
            >
              {project.description || 'Add a description of this project here.'}
            </p>
          </div>

          <dl className="text-[0.9rem] border-t border-[var(--line)] pt-6 space-y-5">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">Location</dt>
              <dd
                data-ngf-field={`showcase.projects.${i}.location`}
                data-ngf-label="Location"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.location}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">Property</dt>
              <dd
                data-ngf-field={`showcase.projects.${i}.stats`}
                data-ngf-label="Property Details"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.stats}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">Listed By</dt>
              <dd
                data-ngf-field={`showcase.projects.${i}.agent`}
                data-ngf-label="Listing Agent Credit"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.agent}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">Photography</dt>
              <dd
                data-ngf-field={`showcase.projects.${i}.photographer`}
                data-ngf-label="Photographer Credit"
                data-ngf-type="text"
                data-ngf-section="Showcase Portfolio"
              >
                {project.photographer}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1120px] px-4 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map(n => {
            const src = project.photos[n - 1]
            return (
              <div key={n} className={`bg-[#f4f4f4] overflow-hidden ${src ? '' : 'hidden'}`}>
                <img
                  src={src || project.image}
                  alt={`${project.title} — photograph ${n}`}
                  data-ngf-field={`showcase.projects.${i}.photo${n}`}
                  data-ngf-label={`Gallery Photo ${n}`}
                  data-ngf-type="image"
                  data-ngf-section="Showcase Portfolio"
                  className="w-full aspect-[3/2] object-cover"
                />
              </div>
            )
          })}
        </div>
        {photos.length <= 1 && (
          <p className="mx-auto max-w-[1120px] px-4 text-[0.9rem] text-[var(--muted)]">
            Add gallery photographs for this project from the site editor.
          </p>
        )}
      </section>

      {/* ── More projects ── */}
      {others.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1120px] px-4">
            <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] mb-10">More Projects</h2>
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
