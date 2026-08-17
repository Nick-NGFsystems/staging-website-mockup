'use client'

import { useEffect, useState } from 'react'

type FormType = 'staging' | 'home-edit'
type Role = 'homeowner' | 'agent'
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const PRICE_POINTS = ['Under $300K', '$300K – $500K', '$500K – $750K', '$750K – $1M', '$1M+']
const BILLING = ['Listing Agent', 'Homeowner / Seller', 'Both Agent and Homeowner', 'To Be Determined']
const OCCUPANCY = ['Vacant', 'Occupied', 'New Construction']

const FIELD = 'w-full border border-line bg-white px-4 py-3 text-[0.95rem] focus:outline-none focus:border-ink transition-colors rounded-[2px]'
const LABEL = 'flex flex-col gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-ink-soft font-semibold'

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] border transition-colors rounded-[2px] ${
        active ? 'bg-ink text-white border-ink' : 'bg-white border-line text-ink hover:border-ink'
      }`}
    >
      {children}
    </button>
  )
}

function SectionHead({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="pt-2">
      <p className="eyebrow !text-ink">{children}</p>
      {hint && <p className="text-[0.85rem] text-muted normal-case tracking-normal mt-1.5 font-normal">{hint}</p>}
      <span className="block w-10 h-px bg-ink mt-4" aria-hidden="true" />
    </div>
  )
}

export default function ContactForm() {
  const [formType, setFormType] = useState<FormType>('staging')
  const [role, setRole] = useState<Role>('homeowner')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (window.location.hash.replace('#', '') === 'home-edit') setFormType('home-edit')
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    const form = e.currentTarget
    const data: Record<string, string> = {
      form_type: formType === 'staging' ? 'Staging Inquiry' : 'Home Edit Consultation',
    }
    if (formType === 'staging') data.role = role === 'homeowner' ? 'Homeowner' : 'Agent'
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (el.name && el.value && !(el.type === 'radio' && !el.checked)) data[el.name] = el.value
    }
    // Honeypot — bots fill this hidden field; treat as a silent success.
    // NOTE: the field name must stay non-semantic ("_gotcha"). A name like
    // "company" gets autofilled by browsers and password managers, which would
    // silently discard real enquiries.
    if (data._gotcha) { setStatus('success'); form.reset(); return }
    delete data.consent
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { setStatus('success'); form.reset() }
      else { setStatus('error'); setError('Something went wrong. Please try again or email us directly.') }
    } catch {
      setStatus('error'); setError('Network error. Please check your connection and try again.')
    }
  }

  const staging = formType === 'staging'
  const homeowner = role === 'homeowner'

  if (status === 'success') {
    return (
      <div className="border border-line bg-bg-alt p-10 text-center">
        <p className="font-serif text-2xl mb-3">Thank you — your request is in.</p>
        <p className="text-muted mb-6">We&rsquo;ll be in touch within 1&ndash;2 business days.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline">Send Another</button>
      </div>
    )
  }

  return (
    <>
      {/* Form-type selector */}
      <div className="flex gap-2 mb-4">
        <Toggle active={staging} onClick={() => setFormType('staging')}>Home Staging</Toggle>
        <Toggle active={!staging} onClick={() => setFormType('home-edit')}>Home Edit Consultation</Toggle>
      </div>

      {staging && (
        <div className="flex gap-2 mb-2">
          <Toggle active={homeowner} onClick={() => setRole('homeowner')}>I&rsquo;m a Homeowner</Toggle>
          <Toggle active={!homeowner} onClick={() => setRole('agent')}>I&rsquo;m an Agent</Toggle>
        </div>
      )}
      <p className="text-[0.85rem] text-muted mb-8">
        {staging
          ? homeowner
            ? 'Getting ready to list? Tell us about the home and we’ll put together a staging proposal.'
            : 'Staging a client’s listing? Share the details and we’ll handle the rest.'
          : 'Still living in the home? A home edit consultation gives you a clear, prioritized plan before you list.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {status === 'error' && (
          <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {/* Honeypot (hidden from people) */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
          <label>Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <SectionHead>About You</SectionHead>
        <label className={LABEL}>Your Name *<input name="name" required placeholder="First and last name" className={FIELD} /></label>
        <div className="grid sm:grid-cols-2 gap-6">
          <label className={LABEL}>Phone *<input type="tel" name="phone" required placeholder="(616) 555-0100" className={FIELD} /></label>
          <label className={LABEL}>Email *<input type="email" name="email" required placeholder="your@email.com" className={FIELD} /></label>
        </div>

        {staging && homeowner && (
          <div className="grid sm:grid-cols-2 gap-6">
            <label className={LABEL}>Agent First Name<input name="agent_first" placeholder="Your listing agent" className={FIELD} /></label>
            <label className={LABEL}>Agent Last Name<input name="agent_last" className={FIELD} /></label>
          </div>
        )}
        {staging && !homeowner && (
          <div className="grid sm:grid-cols-2 gap-6">
            <label className={LABEL}>Client First Name<input name="client_first" placeholder="Homeowner / seller" className={FIELD} /></label>
            <label className={LABEL}>Client Last Name<input name="client_last" className={FIELD} /></label>
          </div>
        )}
        {!staging && (
          <div className="grid sm:grid-cols-2 gap-6">
            <label className={LABEL}>Client First Name<input name="client_first" className={FIELD} /></label>
            <label className={LABEL}>Client Last Name<input name="client_last" className={FIELD} /></label>
          </div>
        )}

        <SectionHead hint="This may differ from your current home address.">The Property</SectionHead>
        <label className={LABEL}>Subject Property / Staging Location
          <input name="address" placeholder="Street, City" className={FIELD} />
        </label>
        {staging && (
          <div className="grid sm:grid-cols-2 gap-6">
            <label className={LABEL}>Occupancy
              <select name="occupancy" className={FIELD}>
                <option value="">Select…</option>
                {OCCUPANCY.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className={LABEL}>Price Point
              <select name="price_point" className={FIELD}>
                <option value="">Select a range…</option>
                {PRICE_POINTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
          </div>
        )}

        <SectionHead>{staging ? 'Project Details' : 'Your Consultation'}</SectionHead>
        {staging && !homeowner && (
          <fieldset className={LABEL}>
            <legend className="mb-1">Primary Billing Contact</legend>
            <div className="grid sm:grid-cols-2 gap-2 normal-case tracking-normal font-normal">
              {BILLING.map((b) => (
                <label key={b} className="flex items-center gap-2.5 text-[0.9rem] text-ink cursor-pointer">
                  <input type="radio" name="billing_contact" value={b} className="accent-ink" /> {b}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {staging && (
          <label className={LABEL}>Desired / Target List Date<input type="date" name="list_date" className={FIELD} /></label>
        )}
        {!staging && (
          <fieldset className={LABEL}>
            <legend className="mb-1">Preferred Consultation Dates <span className="normal-case tracking-normal font-normal text-muted">(select up to 3)</span></legend>
            <div className="grid sm:grid-cols-3 gap-4">
              <input type="date" name="consult_date_1" className={FIELD} />
              <input type="date" name="consult_date_2" className={FIELD} />
              <input type="date" name="consult_date_3" className={FIELD} />
            </div>
          </fieldset>
        )}
        <label className={LABEL}>Additional Notes
          <textarea name="message" rows={4} placeholder="Anything else we should know about the home or your timeline?" className={FIELD} />
        </label>

        <label className="flex items-start gap-3 text-[0.85rem] text-muted">
          <input type="checkbox" name="consent" required className="mt-1 accent-ink" />
          <span>I agree that Perrine Interiors may contact me by phone, text, or email about my inquiry.</span>
        </label>

        <button type="submit" disabled={status === 'submitting'} className="btn btn-solid w-full disabled:opacity-60">
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
      </form>
    </>
  )
}
