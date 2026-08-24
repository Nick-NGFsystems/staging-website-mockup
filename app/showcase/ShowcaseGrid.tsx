'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PROJECT_ITEM_FIELDS, type Project } from '@/lib/projects'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

export type GalleryPhoto = {
  image: string
  caption: string
}

const FILTERS = ['All', 'New Construction', '$250K–$500K', '$500K–$1M', '$1M–$2M']

export default function ShowcaseGrid({
  projects,
  gallery,
}: {
  projects: Project[]
  gallery: GalleryPhoto[]
}) {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <>
      {/* ── Featured Projects ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-12" role="group" aria-label="Filter projects">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors min-h-[44px] ${
                  activeFilter === filter
                    ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
                    : 'bg-white border-[var(--line)] text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Project Cards — always render every card (stable group indices);
              filtering only toggles visibility so the portal editor's
              add/reorder/delete stay aligned with the canonical paths. */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ngf-group="showcase.projects"
            data-ngf-item-label="Project"
            data-ngf-min-items="1"
            data-ngf-max-items="24"
            data-ngf-item-fields={PROJECT_ITEM_FIELDS}
          >
            {projects.map((project, i) => {
              const hidden = activeFilter !== 'All' && project.category !== activeFilter
              return (
                <div
                  key={i}
                  data-category={project.category}
                  className={`group bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${hidden ? 'hidden' : ''}`}
                >
                  <Link href={`/showcase/${project.slug}`} className="block overflow-hidden">
                  <img
                    src={project.image || '/images/staged/staged-15.webp'}
                    alt={project.title || `Staged project ${i + 1}`}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    data-ngf-field={`showcase.projects.${i}.image`}
                    data-ngf-label="Photo"
                    data-ngf-type="image"
                    data-ngf-section="Showcase Portfolio"
                    data-ngf-aspect="3:2"
                  />
                  </Link>
                  <div className="p-5">
                    {/* Category drops below the title on phones rather than
                        competing with it for a narrow row. */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 mb-2">
                      <h3
                        className="font-serif text-lg leading-snug min-w-0"
                        data-ngf-field={`showcase.projects.${i}.title`}
                        data-ngf-label="Project Title"
                        data-ngf-type="text"
                        data-ngf-section="Showcase Portfolio"
                      >
                        {project.title}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-[0.7rem] uppercase tracking-wider rounded-full font-semibold ${project.category ? 'bg-[var(--brand)]/10 text-[var(--brand)] px-2.5 py-1' : ''}`}
                        data-ngf-field={`showcase.projects.${i}.category`}
                        data-ngf-label="Category"
                        data-ngf-type="text"
                        data-ngf-section="Showcase Portfolio"
                      >
                        {project.category}
                      </span>
                    </div>
                    <p
                      className="text-[var(--muted)] text-sm leading-relaxed"
                      data-ngf-field={`showcase.projects.${i}.description`}
                      data-ngf-label="Description"
                      data-ngf-type="textarea"
                      data-ngf-section="Showcase Portfolio"
                    >
                      {project.description}
                    </p>
                    <Link
                      href={`/showcase/${project.slug}`}
                      className="inline-block mt-4 text-[0.68rem] uppercase tracking-[0.16em] border-b border-[var(--ink)] pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {projects.every((p) => activeFilter !== 'All' && p.category !== activeFilter) && (
            <p className="text-center text-[var(--muted)] py-16">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* ── Full Gallery (lightbox) ── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-center mb-3">
            More Staged Spaces
          </h2>
          <p className="text-center text-[var(--muted)] max-w-[520px] mx-auto mb-10">
            Tap any photo to view it full screen.
          </p>
          <PhotoProvider>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              data-ngf-group="showcase.gallery"
              data-ngf-item-label="Photo"
              data-ngf-min-items="0"
              data-ngf-max-items="60"
              data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"3:2"}]'
            >
              {gallery.map((photo, i) => (
                <PhotoView key={i} src={photo.image}>
                  <img
                    src={photo.image}
                    alt={photo.caption || `Staged space ${i + 1}`}
                    className="w-full aspect-[3/2] object-cover rounded-[10px] cursor-zoom-in"
                    data-ngf-field={`showcase.gallery.${i}.image`}
                    data-ngf-label="Photo"
                    data-ngf-type="image"
                    data-ngf-section="Showcase Gallery"
                    data-ngf-aspect="3:2"
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </section>
    </>
  )
}
