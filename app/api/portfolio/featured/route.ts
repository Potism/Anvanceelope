import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { portfolioMedia, portfolioProjects } from '@/lib/db/schema'
import { and, asc, eq } from 'drizzle-orm'

export async function GET() {
  const rows = await db.select({ project: portfolioProjects, media: portfolioMedia }).from(portfolioProjects).leftJoin(portfolioMedia, eq(portfolioMedia.projectId, portfolioProjects.id)).where(and(eq(portfolioProjects.published, true), eq(portfolioProjects.featured, true))).orderBy(asc(portfolioProjects.createdAt), asc(portfolioMedia.sortOrder))
  const grouped = new Map<string, { id: string; slug: string; title: string; destination: string; mood: string; coverUrl: string; mediaCount: number }>()
  for (const row of rows) {
    const current = grouped.get(row.project.id) ?? { id: row.project.id, slug: row.project.slug, title: row.project.title, destination: row.project.destination, mood: row.project.format, coverUrl: row.project.coverUrl, mediaCount: 0 }
    if (row.media) current.mediaCount += 1
    grouped.set(row.project.id, current)
  }
  return NextResponse.json(Array.from(grouped.values()))
}
