'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { LocaleToggle } from '@/components/locale-toggle'
import { useLocale } from '@/components/locale-provider'

export default function ContactPage() {
  const { isItalian, t } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = event.currentTarget
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
    if (response.ok) setSubmitted(true)
    else setError('Something went wrong. Please try again or email us directly.')
  }

  return (
    <main className="min-h-screen bg-sand text-ink">
      <header className="border-b border-ink/15 px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/" className="font-serif text-2xl">Anvance Elopement</Link>
          <div className="flex items-center gap-5"><LocaleToggle /><Link href="/" className="text-[11px] uppercase tracking-[.2em]">{t('backHome')}</Link></div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{t('checkDate')}</p>
            <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Let&apos;s make room for <em>your story.</em></h1>
            <p className="mt-10 max-w-sm text-lg leading-8 text-ink/70">Tell us about your elopement in Italy, the places you are dreaming of, and how you want to remember it. We reply personally within 48 hours.</p>
            <div className="mt-10 border-l-2 border-terracotta pl-4 text-sm leading-6"><p className="mb-4 font-sans text-[10px] uppercase tracking-[.18em] text-ink/45">Reach us directly</p><div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href="tel:+393407421347" className="transition-colors hover:text-terracotta">+39 340 742 1347</a><a href="mailto:hello@anvanceelopement.com" className="transition-colors hover:text-terracotta">hello@anvanceelopement.com</a></div>
              <p className="font-serif text-xl">Limited 2027 dates</p>
              <p className="mt-1 text-ink/60">Share a preferred date and a second option so we can guide you quickly.</p><div className="mt-6 flex items-center gap-4"><a href="https://instagram.com/anvance.elopement" target="_blank" rel="noreferrer" aria-label="Anvance Elopement on Instagram" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] transition-colors hover:text-terracotta"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/mono.svg" alt="" className="h-5 w-5" /> Instagram</a><a href="https://www.tiktok.com/@anvance.elopement" target="_blank" rel="noreferrer" aria-label="Anvance Elopement on TikTok" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] transition-colors hover:text-terracotta"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tiktok/mono.svg" alt="" className="h-5 w-5" /> TikTok</a></div>
            </div>
          </div>
          {submitted ? (
            <div className="flex min-h-96 flex-col justify-center border-t border-ink/20">
              <p className="eyebrow">Thank you</p>
              <p className="mt-4 font-serif text-4xl">Your story is on its way.</p>
              <p className="mt-4 text-sm text-ink/65">We will be in touch within 48 hours.</p>
            </div>
          ) : (
            <form className="grid gap-6 border-t border-ink/20 pt-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="field">Your names<input required name="name" placeholder="Elena & Marco" /></label>
                <label className="field">Email address<input required type="email" name="email" placeholder="hello@example.com" /></label>
                <label className="field">Phone number<input type="tel" name="phone" placeholder="+39 333 123 4567" autoComplete="tel" /></label>
                <label className="field">Preferred date<input required type="date" name="date" /></label>
                <label className="field">Second date option<input type="date" name="alternativeDate" /></label>
                <label className="field">Dream destination<input required name="destination" placeholder="Tuscany, Lake Como..." /></label>
              </div>
              <label className="field">What are you looking for?<select name="service" defaultValue=""><option value="" disabled>Select a collection</option><option value="videography">Videography</option><option value="photography">Photography</option><option value="photo-video">Photography & film</option></select></label>
              <label className="field">Tell us everything<textarea required name="message" rows={6} placeholder="The feeling, the place, the little details..." /></label>
              {error && <p className="text-sm text-terracotta" role="alert">{error}</p>}
              <button type="submit" className="inline-flex w-full items-center justify-center bg-ink px-6 py-4 text-[11px] uppercase tracking-[.2em] text-ivory transition-opacity hover:opacity-80">{t('send')}</button>
              <p className="text-xs leading-5 text-ink/50">Your details are only used to reply to this enquiry. We never share them.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

function unused() { return null }

// Metadata is exported above for Next.js page metadata.
void unused
