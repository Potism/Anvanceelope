import type { Metadata } from 'next'
import { PortfolioBrowser } from '@/components/portfolio-browser'
import { db } from '@/lib/db'
import { portfolioMedia, portfolioProjects } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Italy Elopement Photography & Films | Anvance Elopement',
  description: 'Explore real Italy elopement photography and cinematic wedding films from Tuscany, the Amalfi Coast, Lake Como and the Dolomites.',
  alternates: { canonical: '/portfolio' },
}

export default async function PortfolioPage() {
  const projects = await db.select({ project: portfolioProjects, media: portfolioMedia }).from(portfolioProjects).leftJoin(portfolioMedia, eq(portfolioMedia.projectId, portfolioProjects.id)).orderBy(asc(portfolioProjects.createdAt), asc(portfolioMedia.sortOrder))
  const grouped = projects.reduce<Array<{ id: string; slug: string; title: string; destination: string; summary: string; mood: string; media: { url: string; alt: string }[] }>>((all, row) => {
    const existing = all.find((project) => project.id === row.project.id)
    if (existing) { if (row.media) existing.media.push({ url: row.media.url, alt: row.media.alt }); return all }
    all.push({ id: row.project.id, slug: row.project.slug, title: row.project.title, destination: row.project.destination, summary: row.project.excerpt, mood: row.project.format, media: row.media ? [{ url: row.media.url, alt: row.media.alt }] : [] })
    return all
  }, [])
  return <PortfolioBrowser projects={grouped} />
}
