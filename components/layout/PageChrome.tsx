'use client'
import { useEffect, useState } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import type { NgfSiteContent } from '@/lib/ngf'

interface Props {
  content: NgfSiteContent
  children: React.ReactNode
}

export function PageChrome({ content, children }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SiteHeader content={content} />
      <main id="main-content">{children}</main>
      <SiteFooter content={content} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed right-5 bottom-5 z-40 w-11 h-11 rounded-full bg-ink text-white text-lg flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-accent ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        ↑
      </button>
    </>
  )
}
