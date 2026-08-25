'use client'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

/**
 * Standard NGF image modal (react-photo-view). Never build a custom lightbox —
 * see NGF-STANDARDS, "Universal interaction patterns".
 *
 * Split into two client components so server components can still own the grid
 * markup: `<Lightbox>` provides the context, and each `<ZoomImage>` inside it
 * registers as a navigable member of that gallery. PhotoView renders the <img>
 * itself (rather than receiving one from a server component) so it can attach
 * its click handler to a real client-rendered element.
 */
export function Lightbox({ children }: { children: React.ReactNode }) {
  return <PhotoProvider>{children}</PhotoProvider>
}

export function ZoomImage({
  src,
  alt,
  className = '',
  ngfField,
  ngfLabel,
  ngfSection,
  ngfAspect,
}: {
  src: string
  alt: string
  className?: string
  ngfField?: string
  ngfLabel?: string
  ngfSection?: string
  ngfAspect?: string
}) {
  return (
    <PhotoView src={src}>
      <img
        src={src}
        alt={alt}
        data-ngf-field={ngfField}
        data-ngf-label={ngfLabel}
        data-ngf-type={ngfField ? 'image' : undefined}
        data-ngf-section={ngfSection}
        data-ngf-aspect={ngfAspect}
        className={`cursor-zoom-in ${className}`}
      />
    </PhotoView>
  )
}
