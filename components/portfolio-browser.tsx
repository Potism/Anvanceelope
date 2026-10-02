'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { LocaleToggle } from '@/components/locale-toggle'
import { useLocale } from '@/components/locale-provider'

type Project = {
  id: string
  slug: string
  title: string
  destination: string
  summary: string
  mood: string
  media: { url: string; alt: string }[]
}

export function PortfolioBrowser({ projects }: { projects: Project[] }) {
  const { t } = useLocale()
  const [destination, setDestination] = useState('All destinations')
  const [mood, setMood] = useState('All moods')
  const destinations = ['All destinations', ...Array.from(new Set(projects.map((project) => project.destination)))]
  const moods = ['All moods', ...Array.from(new Set(projects.map((project) => project.mood)))]
  const filtered = useMemo(
    () => projects.filter((project) => (destination === 'All destinations' || project.destination === destination) && (mood === 'All moods' || project.mood === mood)),
    [destination, mood, projects],
  )

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/15 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-tight sm:text-2xl">Anvance <span className="font-sans text-[9px] uppercase tracking-[0.28em]">Elopement</span></Link>
          <div className="flex items-center gap-4 sm:gap-6"><LocaleToggle /><Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em]"><ArrowLeft size={14} /> {t('backHome')}</Link></div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-20 sm:px-8 lg:px-12 lg:pt-32">
        <p className="eyebrow">{t('selectedStories')}</p>
        <div className="mt-5 flex flex-col justify-between gap-8 border-b border-ink/20 pb-10 md:flex-row md:items-end md:pb-12">
          <h1 className="max-w-4xl font-serif text-6xl leading-[.88] tracking-[-.055em] sm:text-8xl">Days made of<br /><em>golden hours.</em></h1>
          <p className="max-w-xs text-sm leading-7 text-ink/65">Real celebrations, shaped into photographs and films with feeling across Italy.</p>
        </div>

        <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[.18em]"><SlidersHorizontal size={14} /> {t('filterStories')}</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
          <label className="grid gap-2 text-[10px] uppercase tracking-[.15em]"><span>Destination</span><select value={destination} onChange={(event) => setDestination(event.target.value)} className="rounded-xl border border-ink/15 bg-transparent px-4 py-3 text-sm normal-case tracking-normal"><option>{destinations[0]}</option>{destinations.slice(1).map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="grid gap-2 text-[10px] uppercase tracking-[.15em]"><span>Mood</span><select value={mood} onChange={(event) => setMood(event.target.value)} className="rounded-xl border border-ink/15 bg-transparent px-4 py-3 text-sm normal-case tracking-normal"><option>{moods[0]}</option>{moods.slice(1).map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((project, index) => {
              const cover = project.media[0]
              return <Link href={`/portfolio/${project.slug}`} key={project.id} className="group block min-w-0">
                <article className="overflow-hidden">
                  <div className={`relative overflow-hidden bg-[#ddd8ce] ${index % 5 === 1 ? 'aspect-[4/5]' : index % 5 === 3 ? 'aspect-[5/6]' : 'aspect-[4/5]'}`}>
                    {cover ? <img src={cover.url} alt={cover.alt || project.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" loading="lazy" /> : <div className="flex h-full items-center justify-center px-4 text-center font-serif text-xl text-ink/40">{project.title}</div>}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-4 pt-14 text-white sm:p-5 sm:pt-20"><span className="text-[9px] uppercase tracking-[.18em]">{project.destination}</span><ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" /></div>
                  </div>
                  <div className="flex items-start justify-between gap-3 py-4"><div className="min-w-0"><h2 className="truncate font-serif text-xl leading-tight sm:text-2xl">{project.title}</h2><p className="mt-1 truncate text-[10px] uppercase tracking-[.16em] text-ink/55">{project.mood} · {project.media.length} {project.media.length === 1 ? 'photo' : 'photos'}</p></div><span className="mt-1 text-[10px] text-ink/45">{String(index + 1).padStart(2, '0')}</span></div>
                </article>
              </Link>
            })}
          </div>
        ) : <div className="mt-12 border-y border-ink/15 py-20 text-center"><p className="font-serif text-3xl">Your next story belongs here.</p><p className="mt-3 text-sm text-ink/55">Add a project from the dashboard to build this collection.</p></div>}
      </section>
    </main>
  )
}
