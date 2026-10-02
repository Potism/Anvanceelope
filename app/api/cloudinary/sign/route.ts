import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null) as { folder?: string } | null
  const folder = body?.folder?.trim().replace(/[^a-zA-Z0-9/_-]/g, '').replace(/^\/+|\/+$/g, '') || 'anvance-portfolio'
  const cloudinaryUrl = process.env.CLOUDINARY_URL
  if (!cloudinaryUrl) return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503 })

  const parsed = new URL(cloudinaryUrl)
  const apiKey = parsed.username
  const apiSecret = decodeURIComponent(parsed.password)
  const timestamp = Math.floor(Date.now() / 1000)
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest('hex')
  return NextResponse.json({ cloudName: parsed.hostname, apiKey, timestamp, signature, folder })
}
