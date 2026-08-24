'use client'
import { useState } from 'react'

export type GalleryImage = {
  src: string
  /** NGF field path for this slot, e.g. showcase.projects.2.photo1 */
  field: string
  label: string
}

/**
 * Thumbnail strip plus a large viewer.
 *
 * The thumbnails carry the `data-ngf-*` annotations, so they are the elements
 * the portal editor targets — clicking one in edit mode opens that image slot.
 * The large viewer is intentionally unannotated: duplicating a field path on
 * two elements would leave the bridge writing to whichever it matched first.
 */
export default function ProjectGallery({
  images,
  title,
}: {
  images: GalleryImage[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 min-w-0">
      {/* Thumbnails */}
      {/* On phones this is a horizontal scroller. It stays inside the page
          gutters — no edge bleed — so nothing sits flush against the screen. */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible md:w-[88px] shrink-0 min-w-0">
        {images.map((img, i) => (
          <button
            key={img.field}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photograph ${i + 1}`}
            aria-current={i === active}
            className={`shrink-0 w-[76px] md:w-full aspect-[4/3] overflow-hidden border transition-opacity ${
              i === active
                ? 'border-[var(--ink)] opacity-100'
                : 'border-[var(--line)] opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img.src}
              alt={`${title} — thumbnail ${i + 1}`}
              data-ngf-field={img.field}
              data-ngf-label={img.label}
              data-ngf-type="image"
              data-ngf-section="Showcase Portfolio"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main viewer */}
      <div className="flex-1 min-w-0 bg-[#f4f4f4] overflow-hidden">
        <img
          src={current?.src}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>
    </div>
  )
}
