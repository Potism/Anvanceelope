'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { enquiries, portfolioMedia, portfolioProjects } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in?next=/dashboard')
  return session.user
}

export async function getEnquiries() {
  await requireUser()
  return db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(100)
}

export async function getPortfolioProjects() {
  const user = await requireUser()
  const rows = await db.select({ project: portfolioProjects, media: portfolioMedia }).from(portfolioProjects).leftJoin(portfolioMedia, eq(portfolioMedia.projectId, portfolioProjects.id)).where(eq(portfolioProjects.userId, user.id)).orderBy(desc(portfolioProjects.createdAt))
  const grouped = new Map<string, { project: typeof portfolioProjects.$inferSelect; media: NonNullable<typeof rows[number]['media']>[] }>()
  for (const row of rows) {
    const current = grouped.get(row.project.id) ?? { project: row.project, media: [] }
    if (row.media) current.media.push(row.media)
    grouped.set(row.project.id, current)
  }
  return Array.from(grouped.values()).map((item) => ({ ...item, media: item.media.sort((a, b) => a.sortOrder - b.sortOrder) }))
}

export async function updatePortfolioProject(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') || '').trim()
  const title = String(formData.get('title') || '').trim().slice(0, 160)
  const destination = String(formData.get('destination') || '').trim().slice(0, 120)
  const mood = String(formData.get('mood') || '').trim().slice(0, 80)
  const summary = String(formData.get('summary') || '').trim().slice(0, 3000)
  const featured = formData.get('featured') === 'true'
  if (!id || !title || !destination) throw new Error('Project, title, and destination are required.')
  await db.update(portfolioProjects).set({ title, destination, venue: destination, format: mood || 'All her moods', excerpt: summary || title, story: summary || title, featured, updatedAt: new Date() }).where(eq(portfolioProjects.id, id))
  revalidatePath('/dashboard')
  revalidatePath('/portfolio')
}

export async function deletePortfolioProject(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') || '').trim()
  if (!id) throw new Error('Project ID is required.')
  await db.delete(portfolioMedia).where(eq(portfolioMedia.projectId, id))
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id))
  revalidatePath('/dashboard')
  revalidatePath('/portfolio')
}

export async function updateEnquiry(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') || '').trim()
  const message = String(formData.get('message') || '').trim().slice(0, 3000)
  const coverage = String(formData.get('coverage') || '').trim().slice(0, 80)
  if (!id) throw new Error('Enquiry ID is required.')
  await db.update(enquiries).set({ message, coverage }).where(eq(enquiries.id, id))
  revalidatePath('/dashboard')
}

export async function deleteEnquiry(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') || '').trim()
  if (!id) throw new Error('Enquiry ID is required.')
  await db.delete(enquiries).where(eq(enquiries.id, id))
  revalidatePath('/dashboard')
}

export async function savePortfolioProject(formData: FormData) {
  const user = await requireUser()
  const title = String(formData.get('title') || '').trim().slice(0, 160)
  const destination = String(formData.get('destination') || '').trim().slice(0, 120)
  const mediaUrls = JSON.parse(String(formData.get('mediaUrls') || '[]')) as string[]
  const summary = String(formData.get('summary') || '').trim().slice(0, 3000)
  const mood = String(formData.get('mood') || '').trim().slice(0, 80) || 'All her moods'
  const featured = formData.get('featured') === 'true'
  if (!title || !destination) throw new Error('Title and destination are required.')
  if (mediaUrls.some((url) => !/^https:\/\//i.test(url))) throw new Error('Media URLs must use HTTPS.')
  const projectId = crypto.randomUUID()
  const slug = `${title}-${destination}-${projectId.slice(0, 8)}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  await db.insert(portfolioProjects).values({ id: projectId, userId: user.id, slug, title, destination, season: 'All seasons', venue: destination, format: mood, excerpt: summary || title, story: summary || title, coverUrl: mediaUrls[0] || '', published: true, featured })
  if (mediaUrls.length) await db.insert(portfolioMedia).values(mediaUrls.map((url, index) => ({ id: crypto.randomUUID(), projectId, userId: user.id, url, kind: url.includes('/video/') || /\.mp4($|\?)/i.test(url) ? 'video' : 'image', alt: `${title} — ${destination} elopement`, sortOrder: index })))
  revalidatePath('/dashboard')
  revalidatePath('/portfolio')
}
