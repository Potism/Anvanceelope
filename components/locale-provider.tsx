'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Locale = 'en' | 'it'

type LocaleContextValue = {
  locale: Locale
  isItalian: boolean
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    approach: 'Our approach', portfolio: 'Portfolio', italy: 'Italy', investment: 'Investment', about: 'About', contact: 'Contact', faq: 'FAQ',
    checkDate: 'Check our date', backHome: 'Back home', photographyFilms: 'Photography & wedding films · Italy',
    intro: 'Intimate Italian elopements for couples who want to feel everything — and remember it honestly.',
    storyEyebrow: 'A different kind of wedding', storyTitle: 'For the wildly in love.',
    kindWords: 'Kind words', filmsStay: 'Films that stay with you.', places: 'Where we wander', investmentLabel: 'Investment', startHere: 'Start here',
    contactTitle: "Let's make room for your story.", send: 'Send enquiry', thankYou: 'Thank you', within48: 'We will be in touch within 48 hours.',
    selectedStories: 'Selected stories · Italy', filterStories: 'Filter the stories', goodToKnow: 'Good to know',
    italian: 'Italiano', english: 'English', switchLanguage: 'Switch language',
  },
  it: {
    approach: 'Il nostro approccio', portfolio: 'Portfolio', italy: 'Italia', investment: 'Investimento', about: 'Chi siamo', contact: 'Contatti', faq: 'FAQ',
    checkDate: 'Verifica la data', backHome: 'Torna alla home', photographyFilms: 'Fotografia e film di matrimonio · Italia',
    intro: 'Elopement intimi in Italia, per coppie che vogliono vivere ogni emozione e ricordarla con sincerità.',
    storyEyebrow: 'Un modo diverso di vivere il matrimonio', storyTitle: 'Per chi ama senza misura.',
    kindWords: 'Parole gentili', filmsStay: 'Film da portare con sé.', places: 'Dove ci porta la storia', investmentLabel: 'Investimento', startHere: 'Iniziamo da qui',
    contactTitle: 'Facciamo spazio alla vostra storia.', send: 'Invia richiesta', thankYou: 'Grazie', within48: 'Vi risponderemo entro 48 ore.',
    selectedStories: 'Storie selezionate · Italia', filterStories: 'Filtra le storie', goodToKnow: 'Da sapere',
    italian: 'Italiano', english: 'English', switchLanguage: 'Cambia lingua',
  },
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  useEffect(() => {
    const stored = document.cookie.match(/(?:^|; )anvance-locale=(en|it)/)?.[1] as Locale | undefined
    if (stored) setLocaleState(stored)
  }, [])
  const setLocale = (next: Locale) => {
    setLocaleState(next)
    document.cookie = `anvance-locale=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next === 'it' ? 'it-IT' : 'en-IT'
  }
  const value = useMemo(() => ({ locale, isItalian: locale === 'it', setLocale, toggleLocale: () => setLocale(locale === 'it' ? 'en' : 'it'), t: (key: string) => translations[locale][key] ?? translations.en[key] ?? key }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}

export function localeAlternates(path: string) {
  return { en: path, it: `/it${path === '/' ? '' : path}` }
}

export { translations }
