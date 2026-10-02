'use client'

import { useEffect, useState } from 'react'

const COOKIE_NAME = 'anvance_cookie_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasConsent = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))

    if (!hasConsent) setVisible(true)
  }, [])

  function chooseConsent(value: 'accepted' | 'necessary') {
    document.cookie = `${COOKIE_NAME}=${value}; Max-Age=31536000; Path=/; SameSite=Lax`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[70] border border-ink/15 bg-ivory p-5 text-ink shadow-[0_18px_60px_rgba(32,28,25,0.18)] sm:inset-x-auto sm:right-6 sm:max-w-md"
      role="dialog"
      aria-label="Cookie preferences"
      aria-describedby="cookie-copy"
    >
      <p className="eyebrow">A small note</p>
      <p id="cookie-copy" className="mt-3 text-sm leading-6 text-ink/70">
        We use essential cookies to keep Anvance working and remember your cookie preference. We do not use advertising cookies.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => chooseConsent('accepted')}
          className="bg-ink px-5 py-3 text-[10px] uppercase tracking-[.2em] text-ivory transition-opacity hover:opacity-80"
        >
          Accept cookies
        </button>
        <button
          type="button"
          onClick={() => chooseConsent('necessary')}
          className="px-2 py-2 text-left text-[10px] uppercase tracking-[.2em] text-ink/60 underline underline-offset-4 transition-colors hover:text-ink"
        >
          Necessary only
        </button>
      </div>
    </aside>
  )
}
