'use client'
import { useEffect, useState } from 'react'

export type HeroSlide = { image: string; alt: string }

/**
 * Cross-fading hero carousel.
 *
 * Slides are real <img> elements inside a data-ngf-group so the portal editor
 * can replace, add and reorder them — never a CSS background-image, which the
 * NGF bridge cannot reach. Overlay content is passed as children so the
 * headline and CTAs stay server-rendered and individually NGF-editable.
 */
export default function HeroCarousel({
  slides,
  children,
  interval = 5500,
  className = 'min-h-[88vh]',
}: {
  slides: HeroSlide[]
  children?: React.ReactNode
  interval?: number
  className?: string
}) {
  const [active, setActive] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (count <= 1) return
    // Respect reduced-motion: hold on the first slide rather than auto-rotating.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setActive(i => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  return (
    <section className={`relative flex items-center overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          data-ngf-group="home.hero"
          data-ngf-item-label="Slide"
          data-ngf-min-items="1"
          data-ngf-max-items="8"
          data-ngf-item-fields='[{"key":"image","label":"Slide Image","type":"image"}]'
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
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4">{children}</div>

      {/* Slide indicators — thin rules, not icons */}
      {count > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[3px] transition-all duration-300 ${
                i === active ? 'w-8 bg-white' : 'w-4 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
