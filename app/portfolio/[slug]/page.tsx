import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portfolioMedia, portfolioProjects } from '@/lib/db/schema'

async function getProject(slug: string) {
  const rows = await db.select({ project: portfolioProjects, media: portfolioMedia }).from(portfolioProjects).leftJoin(portfolioMedia, eq(portfolioMedia.projectId, portfolioProjects.id)).where(and(eq(portfolioProjects.slug, slug), eq(portfolioProjects.published, true))).orderBy(asc(portfolioMedia.sortOrder))
  if (!rows[0]) return null
  return { project: rows[0].project, media: rows.flatMap((row) => row.media ? [row.media] : []) }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await getProject(slug)
  if (!result) return { title: 'Portfolio album | Anvance Elopement' }
  return { title: `${result.project.title} | ${result.project.destination} Elopement | Anvance Elopement`, description: result.project.excerpt, alternates: { canonical: `/portfolio/${result.project.slug}` }, openGraph: { images: result.project.coverUrl ? [result.project.coverUrl] : undefined } }
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getProject(slug)
  if (!result) notFound()
  const { project, media } = result
  return <main className="min-h-screen bg-ivory text-ink"><header className="border-b border-ink/15 px-6 py-6 lg:px-12"><div className="mx-auto max-w-[1200px]"><Link href="/portfolio" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.22em]"><ArrowLeft size={14} /> All albums</Link></div></header><section className="mx-auto max-w-[1200px] px-6 pb-20 pt-20 lg:px-12 lg:pt-28"><p className="eyebrow">{project.destination} · {project.format}</p><h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[.88] tracking-[-.055em] sm:text-8xl">{project.title}</h1><p className="mt-8 max-w-2xl font-serif text-3xl leading-tight text-ink/75">{project.story}</p><div className="mt-16 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">{media.map((item, index) => <figure key={item.id} className="group mb-3 break-inside-avoid overflow-hidden rounded-xl bg-ink/[.04] shadow-sm ring-1 ring-ink/[.06] sm:mb-4"><div className="overflow-hidden">{item.kind === 'video' ? <video src={item.url} controls preload="metadata" className="block h-auto w-full" aria-label={item.alt} /> : <img src={item.url} alt={item.alt} loading={index < 4 ? 'eager' : 'lazy'} className="block h-auto w-full transition duration-700 ease-out group-hover:scale-[1.025]" />}</div><figcaption className="flex items-center justify-between px-3 py-2 text-[9px] uppercase tracking-[.16em] text-ink/45"><span>{String(index + 1).padStart(2, '0')}</span><span>{item.kind === 'video' ? 'Film' : 'Still'}</span></figcaption></figure>)}</div><Link href="/#contact" className="mt-16 inline-flex items-center gap-3 border-b border-ink pb-3 text-[11px] uppercase tracking-[.2em]">Check our date <ArrowUpRight size={15} /></Link></section></main>
}
