import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { db } from '@/lib/db'
import { enquiries } from '@/lib/db/schema'

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(240),
  phone: z.string().trim().max(40).optional().default(''),
  date: z.string().trim().max(40).optional().default(''),
  alternateDate: z.string().trim().max(40).optional().default(''),
  place: z.string().trim().max(160).optional().default(''),
  service: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(3000).optional().default(''),
})

export async function POST(request: Request) {
  try {
    const parsed = enquirySchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: 'Please check your details.' }, { status: 400 })

    const data = parsed.data
    const id = randomUUID()
    await db.insert(enquiries).values({
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      weddingDate: [data.date, data.alternateDate].filter(Boolean).join(' / '),
      location: data.place,
      coverage: data.service,
      message: data.message,
    })

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error } = await resend.emails.send({
        from: 'Anvance enquiries <enquiries@anvanceelopement.com>',
        to: [process.env.ENQUIRY_RECIPIENT_EMAIL || 'anvanceelopement@gmail.com'],
        replyTo: data.email,
        subject: `New elopement enquiry · ${data.name}`,
        html: `<div style="margin:0;background:#f1eee7;padding:40px 20px;font-family:Arial,sans-serif;color:#23231f"><div style="max-width:620px;margin:0 auto;background:#fffdf8;border:1px solid #d8d2c6"><div style="background:#23231f;padding:30px 34px;color:#f7f4ed"><p style="margin:0 0 10px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c79a73">New enquiry</p><h1 style="margin:0;font-family:Georgia,serif;font-size:34px;font-weight:400">${data.name}</h1><p style="margin:12px 0 0;color:#d8d4cb">Anvance Elopement · Italy</p></div><div style="padding:34px"><div style="border-bottom:1px solid #e1ddd5;padding-bottom:22px"><p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8479">Contact</p><p style="margin:6px 0"><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#8f5d3d">${data.email}</a></p><p style="margin:6px 0"><strong>Phone:</strong> ${data.phone || 'Not provided'}</p></div><div style="border-bottom:1px solid #e1ddd5;padding:22px 0"><p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8479">Elopement details</p><p style="margin:6px 0"><strong>Preferred date:</strong> ${data.date || 'Not provided'}</p><p style="margin:6px 0"><strong>Second option:</strong> ${data.alternateDate || 'Not provided'}</p><p style="margin:6px 0"><strong>Location:</strong> ${data.place || 'Not provided'}</p><p style="margin:6px 0"><strong>Looking for:</strong> ${data.service || 'Not provided'}</p></div><div style="padding-top:22px"><p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8479">Their note</p><p style="margin:0;white-space:pre-wrap;line-height:1.7">${data.message || 'No message provided.'}</p></div><a href="mailto:${data.email}" style="display:inline-block;margin-top:28px;background:#23231f;color:#fffdf8;padding:14px 20px;text-decoration:none;font-size:12px;letter-spacing:1px;text-transform:uppercase">Reply to enquiry</a></div></div><p style="max-width:620px;margin:16px auto 0;text-align:center;font-size:11px;color:#8a8479">Sent from anvanceelopement.com</p></div>`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nDates: ${data.date || 'Not provided'}${data.alternateDate ? ` / ${data.alternateDate}` : ''}\nLocation: ${data.place || 'Not provided'}\nLooking for: ${data.service || 'Not provided'}\n\n${data.message || 'No message provided.'}`,
      }, { idempotencyKey: `enquiry/${id}` })
      if (error) console.error('[v0] Enquiry email failed:', error.message)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Enquiry submission failed:', error)
    return NextResponse.json({ error: 'Unable to send your enquiry right now.' }, { status: 500 })
  }
}
