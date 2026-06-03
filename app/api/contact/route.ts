import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

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
})

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Contact form error: RESEND_API_KEY is not set')
      return NextResponse.json({ success: false, error: 'Email is not configured' }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const body = await req.json() as unknown
    const data = schema.parse(body)

    const subject = `New ${data.submission_type} from ${data.name} — Perrine Interiors`
    const html = `
      <h2>${data.submission_type}</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
      ${data.list_price ? `<p><strong>List Price:</strong> ${data.list_price}</p>` : ''}
      ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
    `

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
