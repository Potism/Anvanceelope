import type { MetadataRoute } from 'next'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portfolioProjects } from '@/lib/db/schema'

const base = 'https://www.anvanceelopement.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Omit lastModified for static pages unless their content changes. A fresh date on
  // every request can send misleading update signals to search engines.
  const pages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.9 },
  ]

  try {
    const albums = await db.select({ slug: portfolioProjects.slug, updatedAt: portfolioProjects.updatedAt }).from(portfolioProjects).where(eq(portfolioProjects.published, true)).orderBy(desc(portfolioProjects.updatedAt))
    return [...pages, ...albums.map((album) => ({ url: `${base}/portfolio/${album.slug}`, lastModified: album.updatedAt, changeFrequency: 'yearly' as const, priority: 0.7 }))]
  } catch {
    return pages
  }
}
