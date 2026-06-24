'use client'
import { useEffect, useState } from 'react'

export type HeroSlide = { image: string; alt: string }

/* Cross-fading hero carousel (5 images per client reference: thestaging.co / REH).
   Uses real <img> elements inside a data-ngf-group so the portal editor can
   replace/add/reorder slides (NGF standard: never CSS background-image for
   editable images). Overlay content is passed as children so headline/CTAs
   stay server-rendered and NGF-editable. */
export default function HeroCarousel({
  slides,
  children,
  interval = 5500,
}: {
  slides: HeroSlide[]
  children?: React.ReactNode
  interval?: number
}) {
  const [active, setActive] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-ink">
      {/* Background slides */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          data-ngf-group="home.hero"
          data-ngf-item-label="Slide"
          data-ngf-min-items="1"
          data-ngf-max-items="8"
          data-ngf-item-fields='[{"key":"image","label":"Slide Image","type":"image","aspect":"16:9"}]'
        >
          {slides.map((s, i) => (
            <div key={i} className="carousel-slide" data-active={i === active}>
              <img
                src={s.image}
                alt={s.alt}
                data-ngf-field={`home.hero.${i}.image`}
                data-ngf-label="Slide Image"
                data-ngf-type="image"
                data-ngf-section="Hero"
                data-ngf-aspect="16:9"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/30" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5">{children}</div>

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[3px] transition-all duration-300 ${i === active ? 'w-8 bg-white' : 'w-4 bg-white/45 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
