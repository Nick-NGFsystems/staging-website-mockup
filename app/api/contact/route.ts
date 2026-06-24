import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// name + email required; all other branch-specific fields pass through.
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
}).passthrough()

// Display order + human labels for known fields.
const LABELS: Record<string, string> = {
  role: 'Inquiry Type',
  phone: 'Phone',
  email: 'Email',
  address: 'Subject Property / Staging Location',
  agent_first: 'Agent First Name',
  agent_last: 'Agent Last Name',
  client_first: 'Client First Name',
  client_last: 'Client Last Name',
  price_point: 'Price Point',
  billing_contact: 'Primary Billing Contact',
  list_date: 'Target List Date',
  consult_date_1: 'Preferred Date 1',
  consult_date_2: 'Preferred Date 2',
  consult_date_3: 'Preferred Date 3',
  message: 'Additional Notes',
}
const ORDER = ['role', 'phone', 'email', 'address', 'agent_first', 'agent_last', 'client_first', 'client_last',
  'price_point', 'billing_contact', 'list_date', 'consult_date_1', 'consult_date_2', 'consult_date_3', 'message']

const esc = (s: string) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
const humanize = (k: string) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Contact form error: RESEND_API_KEY is not set')
      return NextResponse.json({ success: false, error: 'Email is not configured' }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const body = await req.json() as unknown
    const data = schema.parse(body) as Record<string, string>

    const formType = data.form_type || 'Inquiry'
    const subject = `New ${formType}${data.role ? ` (${data.role})` : ''} from ${data.name} — Perrine Interiors`

    const skip = new Set(['name', 'email', 'form_type'])
    const rendered = ORDER.filter((k) => data[k] && !skip.has(k))
    const extras = Object.keys(data).filter((k) => data[k] && !skip.has(k) && !ORDER.includes(k))

    const row = (label: string, val: string) => `<p style="margin:4px 0"><strong>${esc(label)}:</strong> ${esc(val)}</p>`
    const html = `
      <h2 style="font-family:Georgia,serif">${esc(formType)}${data.role ? ` — ${esc(data.role)}` : ''}</h2>
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${rendered.filter((k) => k !== 'email').map((k) => row(LABELS[k] || humanize(k), data[k])).join('')}
      ${extras.map((k) => row(humanize(k), data[k])).join('')}
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM || 'noreply@ngfsystems.com',
      // Swappable recipient — confirm Mellissa@PerrineMaterials.com vs perrinematerials@gmail.com
      to: process.env.CONTACT_TO || 'perrinematerials@gmail.com',
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
