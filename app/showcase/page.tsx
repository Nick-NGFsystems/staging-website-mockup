'use client'

import { useState } from 'react'

const FILTERS = ['All', 'New Construction', '$250K–$500K', '$500K–$1M', '$1M–$2M']

type ShowcaseItem = {
  title: string
  description: string
  category: string
  before: string
  after: string
}

const DEFAULT_PROJECTS: ShowcaseItem[] = [
  {
    title: 'Maple Ridge New Build',
    description: 'Full vacant staging for a 4-bed new construction home. Furniture, artwork, and accessories sourced from our inventory.',
    category: 'New Construction',
    before: '/placeholder-before-1.jpg',
    after: '/placeholder-after-1.jpg',
  },
  {
    title: 'Riverside Drive Occupied',
    description: 'Occupied home staging with strategic furniture editing and accessory refresh. Listed at $385K and sold in 4 days.',
    category: '$250K–$500K',
    before: '/placeholder-before-2.jpg',
    after: '/placeholder-after-2.jpg',
  },
  {
    title: 'Lakeview Luxury Home',
    description: 'High-end vacant staging for a $1.4M lakefront property. Custom furniture selections and layered accessories.',
    category: '$1M–$2M',
    before: '/placeholder-before-3.jpg',
    after: '/placeholder-after-3.jpg',
  },
]

export default function ShowcasePage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProjects = activeFilter === 'All'
    ? DEFAULT_PROJECTS
    : DEFAULT_PROJECTS.filter(p => p.category === activeFilter)

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: "url('/placeholder-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,28,25,0.8)] to-[rgba(12,28,25,0.25)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#f5d9a6] mb-3"
            data-ngf-field="showcase.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            Staging Showcase
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="showcase.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            Our Portfolio
          </h1>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
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

          {/* Project Cards */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ngf-group="showcase.projects"
            data-ngf-item-fields='[{"key":"title","label":"Project Title","type":"text"},{"key":"description","label":"Description","type":"textarea"},{"key":"category","label":"Category","type":"text"},{"key":"before","label":"Before Image","type":"image"},{"key":"after","label":"After Image","type":"image"}]'
          >
            {visibleProjects.map((project, i) => (
              <div
                key={i}
                data-category={project.category}
                className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                {/* Before / After images */}
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <span className="absolute top-2 left-2 text-[0.65rem] uppercase tracking-widest bg-black/50 text-white px-1.5 py-0.5 rounded">Before</span>
                    <img
                      src={project.before || '/placeholder-before.jpg'}
                      alt={`${project.title} before`}
                      className="w-full aspect-[4/3] object-cover"
                      data-ngf-field={`showcase.projects.${i}.before`}
                      data-ngf-label="Before Image"
                      data-ngf-type="image"
                      data-ngf-section="Showcase Portfolio"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute top-2 left-2 text-[0.65rem] uppercase tracking-widest bg-[var(--brand)]/80 text-white px-1.5 py-0.5 rounded">After</span>
                    <img
                      src={project.after || '/placeholder-after.jpg'}
                      alt={`${project.title} after`}
                      className="w-full aspect-[4/3] object-cover"
                      data-ngf-field={`showcase.projects.${i}.after`}
                      data-ngf-label="After Image"
                      data-ngf-type="image"
                      data-ngf-section="Showcase Portfolio"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="font-serif text-lg leading-snug"
                      data-ngf-field={`showcase.projects.${i}.title`}
                      data-ngf-label="Project Title"
                      data-ngf-type="text"
                      data-ngf-section="Showcase Portfolio"
                    >
                      {project.title}
                    </h3>
                    <span
                      className="flex-shrink-0 text-[0.7rem] uppercase tracking-wider bg-[var(--brand)]/10 text-[var(--brand)] px-2.5 py-1 rounded-full font-semibold"
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
                </div>
              </div>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <p className="text-center text-[var(--muted)] py-16">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </main>
  )
}
