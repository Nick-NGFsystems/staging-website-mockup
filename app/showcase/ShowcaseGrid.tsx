'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PhotoProvider, PhotoView } from 'react-photo-view'

export type Project = { image: string; title: string; environment: string; description: string; image_alt?: string }
export type GalleryPhoto = { image: string; image_alt?: string }

const FILTERS = ['All', 'For Sale', 'Existing Space', 'New Construction']
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')

export default function ShowcaseGrid({ projects, gallery }: { projects: Project[]; gallery: GalleryPhoto[] }) {
  const [active, setActive] = useState('All')

  // Deep-link from the home environment tiles (/showcase#for-sale, etc.)
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.replace('#', ''))
    const match = FILTERS.find((f) => slug(f) === h)
    if (match) setActive(match)
  }, [])

  return (
    <>
      {/* Filter */}
      <section className="pt-4">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="flex flex-wrap gap-2 justify-center border-b border-line pb-8" role="group" aria-label="Filter by environment">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] border transition-colors rounded-[2px] ${
                  active === f ? 'bg-ink text-white border-ink' : 'bg-white border-line text-ink hover:border-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            data-ngf-group="showcase.projects"
            data-ngf-item-label="Project"
            data-ngf-min-items="1"
            data-ngf-max-items="36"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"3:2"},{"key":"title","label":"Title","type":"text"},{"key":"environment","label":"Environment","type":"text"},{"key":"description","label":"Description","type":"textarea"}]'
          >
            {projects.map((p, i) => {
              const hidden = active !== 'All' && p.environment !== active
              return (
                <article key={i} className={`bg-white border border-line elevate ${hidden ? 'hidden' : ''}`}>
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.image_alt || p.title || `Staged project ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      data-ngf-field={`showcase.projects.${i}.image`}
                      data-ngf-label="Photo"
                      data-ngf-type="image"
                      data-ngf-section="Showcase"
                      data-ngf-aspect="3:2"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg" data-ngf-field={`showcase.projects.${i}.title`} data-ngf-label="Title" data-ngf-type="text" data-ngf-section="Showcase">
                        {p.title}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted ${p.environment ? '' : 'opacity-0'}`}
                        data-ngf-field={`showcase.projects.${i}.environment`}
                        data-ngf-label="Environment"
                        data-ngf-type="text"
                        data-ngf-section="Showcase"
                      >
                        {p.environment}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed" data-ngf-field={`showcase.projects.${i}.description`} data-ngf-label="Description" data-ngf-type="textarea" data-ngf-section="Showcase">
                      {p.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
          {projects.every((p) => active !== 'All' && p.environment !== active) && (
            <p className="text-center text-muted py-16">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">The Full Collection</p>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)]">Browse every staged space</h2>
            <p className="text-muted mt-3">Tap any photo to view it full screen.</p>
          </div>
          <PhotoProvider>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              data-ngf-group="showcase.gallery"
              data-ngf-item-label="Photo"
              data-ngf-min-items="0"
              data-ngf-max-items="60"
              data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"3:2"}]'
            >
              {gallery.map((g, i) => (
                <PhotoView key={i} src={g.image}>
                  <img
                    src={g.image}
                    alt={g.image_alt || `Staged space ${i + 1}`}
                    className="w-full aspect-[3/2] object-cover cursor-zoom-in ring-1 ring-inset ring-black/[0.08]"
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
          <p className="text-center mt-12">
            <Link href="/contact" className="btn btn-solid">Start Your Project</Link>
          </p>
        </div>
      </section>
    </>
  )
}
