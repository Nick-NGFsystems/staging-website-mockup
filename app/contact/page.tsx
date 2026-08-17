'use client'

import { useState } from 'react'

type Tab = 'general' | 'consultation' | 'evaluation'
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const INPUT_CLASS = 'w-full border border-[#cfc7bb] rounded-[10px] px-3 py-2.5 font-sans text-base bg-white focus:outline-none focus:border-[var(--brand)]'
const LABEL_CLASS = 'flex flex-col gap-1.5 text-[0.92rem] text-[#3a3a3a]'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>('general')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data: Record<string, string> = {}
    const elements = form.elements as HTMLFormControlsCollection
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (el.name) data[el.name] = el.value
    }

    // Honeypot — bots fill this hidden field; treat as a silent success so they
    // don't learn they were caught. The field name must stay non-semantic
    // ("_gotcha"): a name like "company" gets autofilled by browsers and
    // password managers, which would silently discard real enquiries.
    if (data._gotcha) {
      setStatus('success')
      form.reset()
      return
    }
    delete data._gotcha

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'General Inquiry' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'evaluation', label: 'Home Evaluation' },
  ]

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
            data-ngf-field="contact.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            Contact
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="contact.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            Get In Touch
          </h1>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="max-w-[680px] mx-auto">
            {/* Tab Switcher */}
            <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Contact form type">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => { setActiveTab(tab.id); setStatus('idle') }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors min-h-[44px] ${
                    activeTab === tab.id
                      ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
                      : 'bg-white border-[var(--line)] text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Success State */}
            {status === 'success' && (
              <div className="bg-[var(--brand)]/10 border border-[var(--brand)]/30 rounded-[14px] p-6 mb-8 text-center">
                <p className="text-[var(--brand)] font-semibold text-lg mb-1">Message Sent!</p>
                <p className="text-[var(--muted)] text-sm">Thank you for reaching out. Melissa will be in touch within one business day.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--brand)] text-white text-sm font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-[14px] p-4 mb-6">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Forms */}
            {status !== 'success' && (
              <>
                {/* General Inquiry Form */}
                {activeTab === 'general' && (
                  <form onSubmit={handleSubmit} className="bg-white border border-[var(--line)] rounded-[14px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] space-y-5">
                    <input type="hidden" name="submission_type" value="General Inquiry" />
                    <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                      <label>Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
                    </div>
                    <label className={LABEL_CLASS}>
                      Name <span className="text-red-500">*</span>
                      <input type="text" name="name" required placeholder="Your full name" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Email <span className="text-red-500">*</span>
                      <input type="email" name="email" required placeholder="your@email.com" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Phone
                      <input type="tel" name="phone" placeholder="(616) 555-0100" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Message
                      <textarea name="message" rows={5} placeholder="How can we help?" className={INPUT_CLASS} />
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--brand)] text-white font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px] disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}

                {/* Consultation Form */}
                {activeTab === 'consultation' && (
                  <form onSubmit={handleSubmit} className="bg-white border border-[var(--line)] rounded-[14px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] space-y-5">
                    <input type="hidden" name="submission_type" value="Consultation" />
                    <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                      <label>Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
                    </div>
                    <label className={LABEL_CLASS}>
                      Name <span className="text-red-500">*</span>
                      <input type="text" name="name" required placeholder="Your full name" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Email <span className="text-red-500">*</span>
                      <input type="email" name="email" required placeholder="your@email.com" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Phone
                      <input type="tel" name="phone" placeholder="(616) 555-0100" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Home Address
                      <input type="text" name="address" placeholder="123 Main St, Grand Rapids, MI" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Message
                      <textarea name="message" rows={5} placeholder="Tell us a bit about your home and your timeline." className={INPUT_CLASS} />
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--brand)] text-white font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px] disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Book Consultation'}
                    </button>
                  </form>
                )}

                {/* Home Evaluation Form */}
                {activeTab === 'evaluation' && (
                  <form onSubmit={handleSubmit} className="bg-white border border-[var(--line)] rounded-[14px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] space-y-5">
                    <input type="hidden" name="submission_type" value="Home Evaluation" />
                    <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                      <label>Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
                    </div>
                    <label className={LABEL_CLASS}>
                      Name <span className="text-red-500">*</span>
                      <input type="text" name="name" required placeholder="Your full name" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Email <span className="text-red-500">*</span>
                      <input type="email" name="email" required placeholder="your@email.com" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Phone
                      <input type="tel" name="phone" placeholder="(616) 555-0100" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Property Address
                      <input type="text" name="address" placeholder="123 Main St, Grand Rapids, MI" className={INPUT_CLASS} />
                    </label>
                    <label className={LABEL_CLASS}>
                      Approx. List Price
                      <select name="list_price" className={INPUT_CLASS}>
                        <option value="">Select a range…</option>
                        <option value="$250K–$500K">$250K–$500K</option>
                        <option value="$500K–$1M">$500K–$1M</option>
                        <option value="$1M–$2M">$1M–$2M</option>
                      </select>
                    </label>
                    <label className={LABEL_CLASS}>
                      Desired Timeline
                      <select name="timeline" className={INPUT_CLASS}>
                        <option value="">Select a timeline…</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1–3 months">1–3 months</option>
                        <option value="3–6 months">3–6 months</option>
                      </select>
                    </label>
                    <label className={LABEL_CLASS}>
                      Additional Notes
                      <textarea name="notes" rows={5} placeholder="Any additional context about the property or your needs." className={INPUT_CLASS} />
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--brand)] text-white font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px] disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Submit Evaluation Request'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
