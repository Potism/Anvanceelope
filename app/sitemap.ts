import type { MetadataRoute } from 'next'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portfolioProjects } from '@/lib/db/schema'

const base = 'https://anvanceelopement.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await db
    .select({ slug: portfolioProjects.slug, updatedAt: portfolioProjects.updatedAt })
    .from(portfolioProjects)
    .where(eq(portfolioProjects.published, true))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${base}/portfolio/${project.slug}`,
      lastModified: project.updatedAt ?? new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

