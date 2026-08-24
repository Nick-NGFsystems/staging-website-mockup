import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { relayLeadToNgf } from '@/lib/ngf-lead'

const schema = z.object({
  submission_type: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  address: z.string().optional(),
  list_price: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().optional(),
  // Honeypot. Must stay non-semantic — see app/contact/page.tsx.
  _gotcha: z.string().optional(),
})

/**
 * Escape user-supplied text before interpolating into the notification email.
 * Without this, a submitter can inject arbitrary markup (links, images,
 * spoofed content) into the email Melissa receives.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Render one `<p><strong>Label:</strong> value</p>` row, or nothing if empty. */
function row(label: string, value?: string): string {
  if (!value) return ''
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
}

export async function POST(req: NextRequest) {
  let data: z.infer<typeof schema>

  try {
    const body = (await req.json()) as unknown
    data = schema.parse(body)
  } catch (err) {
    // Bad input is the caller's fault — 400, not 500.
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Please check the form fields and try again.' },
        { status: 400 },
      )
    }
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  // Server-side honeypot. The client checks this too, but bots POST straight to
  // the API and never run that code. Respond like a success so they don't learn
  // they were filtered, but drop the submission entirely.
  if (data._gotcha) {
    return NextResponse.json({ success: true })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Contact form error: RESEND_API_KEY is not set')
      return NextResponse.json({ success: false, error: 'Email is not configured' }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    // Persist FIRST to the central NGF lead store (system of record) so the
    // enquiry survives an email failure and lands in the client's portal under
    // Form Submissions. Additive — the email below is unchanged.
    await relayLeadToNgf(data.submission_type || 'contact', data)

    const subject = `New ${data.submission_type} from ${data.name} — Perrine Interiors`
    const html = [
      `<h2>${escapeHtml(data.submission_type)}</h2>`,
      row('Name', data.name),
      row('Email', data.email),
      row('Phone', data.phone),
      row('Address', data.address),
      row('List Price', data.list_price),
      row('Timeline', data.timeline),
      row('Message', data.message),
      row('Notes', data.notes),
    ].join('\n')

    await resend.emails.send({
      from: process.env.RESEND_FROM || 'noreply@ngfsystems.com',
      to: 'perrinematerials@gmail.com',
      replyTo: data.email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
