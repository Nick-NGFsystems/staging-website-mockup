'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PROJECT_ITEM_FIELDS, type Project } from '@/lib/projects'

const FILTERS = ['All', 'New Construction', '$250K–$500K', '$500K–$1M', '$1M–$2M']

/**
 * Portfolio, organised by house.
 *
 * Each project is one block: the exterior photograph on the left, three
 * interiors alongside it, and an Open Project link — so photographs stay
 * grouped with the home they belong to instead of pooling into one loose grid.
 *
 * Every card is rendered even when filtered out (visibility only), so the
 * portal editor's add / reorder / delete stay aligned with the canonical
 * showcase.projects.N.* paths.
 */
export default function ShowcaseGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const noMatches = projects.every(p => activeFilter !== 'All' && p.category !== activeFilter)

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-14" role="group" aria-label="Filter projects">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.14em] border transition-colors min-h-[44px] ${
                activeFilter === filter
                  ? 'bg-[var(--ink)] border-[var(--ink)] text-white'
                  : 'bg-white border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          data-ngf-group="showcase.projects"
          data-ngf-item-label="Project"
          data-ngf-min-items="1"
          data-ngf-max-items="24"
          data-ngf-item-fields={PROJECT_ITEM_FIELDS}
        >
          {projects.map((project, i) => {
            const hidden = activeFilter !== 'All' && project.category !== activeFilter
            // Three interiors alongside the exterior; empty slots fall back to
            // the cover so a half-filled project still reads as a house.
            const interiors = [0, 1, 2].map(n => project.photos[n] || project.image)

            return (
              <article key={i} className={`mb-16 md:mb-20 ${hidden ? 'hidden' : ''}`} data-category={project.category}>
                <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
                  {/* Exterior */}
                  <Link href={`/showcase/${project.slug}`} className="group block overflow-hidden bg-[#f4f4f4]">
                    <img
                      src={project.image}
                      alt={project.imageAlt || `${project.title} — exterior`}
                      data-ngf-field={`showcase.projects.${i}.image`}
                      data-ngf-label="Exterior Photo"
                      data-ngf-type="image"
                      data-ngf-section="Showcase Portfolio"
                      data-ngf-aspect="3:2"
                      className="w-full h-full aspect-[3/2] md:aspect-auto md:min-h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </Link>

                  {/* Three interiors */}
                  <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                    {interiors.map((src, n) => (
                      <Link
                        key={n}
                        href={`/showcase/${project.slug}`}
                        className="group block overflow-hidden bg-[#f4f4f4]"
                      >
                        <img
                          src={src}
                          alt={`${project.title} — interior ${n + 1}`}
                          data-ngf-field={`showcase.projects.${i}.photo${n + 1}`}
                          data-ngf-label={`Interior Photo ${n + 1}`}
                          data-ngf-type="image"
                          data-ngf-section="Showcase Portfolio"
                          data-ngf-aspect="4:3"
                          className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Caption + action */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="font-serif text-[1.35rem] leading-snug"
                      data-ngf-field={`showcase.projects.${i}.title`}
                      data-ngf-label="Project Title"
                      data-ngf-type="text"
                      data-ngf-section="Showcase Portfolio"
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                      data-ngf-field={`showcase.projects.${i}.location`}
                      data-ngf-label="Location"
                      data-ngf-type="text"
                      data-ngf-section="Showcase Portfolio"
                    >
                      {project.location}
                    </p>
                  </div>

                  <Link
                    href={`/showcase/${project.slug}`}
                    className="shrink-0 inline-flex items-center justify-center px-6 min-h-[44px] border border-[var(--ink)] text-[0.7rem] uppercase tracking-[0.16em] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  >
                    Open Project
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {noMatches && (
          <p className="text-center text-[var(--muted)] py-16">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}
