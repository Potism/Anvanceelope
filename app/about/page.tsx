import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'

export const metadata: Metadata = {
  title: 'About Anvance | Italy Elopement Films, Social Content & Creative Production',
  description: 'Meet the creative filmmakers behind Anvance. We create honest Italy elopement films, wedding photography, and social content for restaurants, hotels, fashion, and brands.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Anvance — Creative filmmakers in Italy',
    description: 'Films with feeling for elopements, hotels, restaurants, fashion, and brands.',
    type: 'website',
  },
}

const team = [
  { name: 'Albert', role: 'Director · Filmmaker', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/albert-ykP9jNeFtZ03PfzpNzrmFIaZibELCl.avif' },
  { name: 'Angelo', role: 'Creative filmmaker', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/angelo-xoarnLCN1XkSSkiTIHLLMY0Cxqe7IH.avif' },
  { name: 'Axel', role: 'Creative filmmaker', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/axel-NzCuzB9dUKx2r1Ku0BF24qVLSID6ti.avif' },
]

export default function AboutPage() {
  return <main className="min-h-screen bg-ivory text-ink">
    <header className="border-b border-ink/15 px-6 py-6 lg:px-12"><div className="mx-auto flex max-w-[1440px] items-center justify-between"><Link href="/" className="font-serif text-2xl">Anvance</Link><div className="flex items-center gap-5"><LocaleToggle /><Link href="/" className="text-[11px] uppercase tracking-[.2em]">Back home</Link></div></div></header>

    <section className="relative min-h-[72vh] overflow-hidden bg-ink text-ivory"><video autoPlay muted loop playsInline poster="https://res.cloudinary.com/dcuqtxf8n/video/upload/so_0,w_1800,q_auto/woinlnjqejyxs1he2shc.jpg" className="absolute inset-0 h-full w-full object-cover opacity-75" aria-label="Anvance creative filmmakers at work"><source src="https://res.cloudinary.com/dcuqtxf8n/video/upload/f_mp4/v1790933368/woinlnjqejyxs1he2shc.mov" type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/20" /><div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] flex-col justify-end px-6 py-16 lg:px-12 lg:py-24"><p className="eyebrow !text-ivory/75">Anvance creative studio · Italy & everywhere</p><h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[.88] tracking-[-.05em] sm:text-8xl">Stories that feel<br /><em>like you.</em></h1><p className="mt-7 max-w-xl text-base leading-7 text-ivory/75 sm:text-lg">A creative team making elopement films, wedding photography, and visual stories with a little more soul, movement, and truth.</p></div></section>

    <section className="px-6 py-20 lg:px-12 lg:py-32"><div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Our approach</p><h2 className="mt-5 max-w-md font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">Not just a day.<br /><em>A feeling to keep.</em></h2></div><div className="max-w-xl space-y-6 text-lg leading-8 text-ink/70"><p>Anvance is for couples who would rather chase golden light through olive groves than follow a schedule. We make space for the quiet, the wild, the unexpected, and everything that makes your story unmistakably yours.</p><p>From intimate vows in the Dolomites to a sun-warmed celebration on the Amalfi Coast, we guide you with calm direction and create films and photographs that bring you back to how it felt.</p><Link href="/?from=about#contact" className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[10px] uppercase tracking-[.18em] text-ivory transition hover:-translate-y-0.5 hover:bg-terracotta">Plan your Italy story <ArrowUpRight size={15} /></Link></div></div></section>

    <section className="border-y border-ink/10 bg-sand px-6 py-20 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1180px]"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">The creative team</p><h2 className="mt-4 max-w-2xl font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">People who care<br /><em>about the details.</em></h2></div><p className="max-w-xs text-sm leading-6 text-ink/60">Albert leads the vision, surrounded by a small team of filmmakers who bring energy, sensitivity, and a shared eye for honest moments.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-3">{team.map((person) => <article key={person.name} className="group"><div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink"><img src={person.image} alt={`${person.name}, ${person.role} at Anvance`} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /></div><p className="mt-4 font-serif text-2xl">{person.name}</p><p className="mt-1 text-[10px] uppercase tracking-[.16em] text-ink/55">{person.role}</p></article>)}</div></div></section>

    <section className="px-6 py-20 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1180px] gap-10 rounded-[1.5rem] bg-ink p-8 text-ivory sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow !text-ivory/60">Beyond weddings</p><h2 className="mt-4 max-w-2xl font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">More than<br /><em>elopements.</em></h2><p className="mt-6 max-w-xl text-base leading-7 text-ivory/65">We also create social and professional content for restaurants, hotels, fashion labels, and brands that want to be seen with intention.</p></div><a href="https://anvanceproduction.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-ivory px-6 py-3.5 text-[10px] uppercase tracking-[.18em] text-ink transition hover:bg-terracotta hover:text-ivory">Explore Anvance Production <ArrowUpRight size={15} /></a></div></section>

    <section className="border-t border-ink/15 px-6 py-20 text-center lg:px-12 lg:py-28"><p className="eyebrow">Let&apos;s make something real</p><h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">Your story deserves<br /><em>to be felt.</em></h2><Link href="/?from=about#contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[10px] uppercase tracking-[.18em] text-ivory transition hover:bg-terracotta">Start a conversation <ArrowUpRight size={15} /></Link></section>
  </main>
}
