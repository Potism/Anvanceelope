'use client'

import { Languages } from 'lucide-react'
import { useLocale } from './locale-provider'

export function LocaleToggle() {
  const { isItalian, toggleLocale, t } = useLocale()
  return <button type="button" onClick={toggleLocale} className="inline-flex items-center gap-2 border-l border-ink/20 pl-4 text-[10px] uppercase tracking-[.18em]" aria-label={t('switchLanguage')}><Languages size={14} />{isItalian ? 'EN' : 'IT'}</button>
}
