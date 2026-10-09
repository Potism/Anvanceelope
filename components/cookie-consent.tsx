'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const COOKIE_NAME = 'anvance_cookie_consent'
const META_PIXEL_ID = '967404376418856'

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string }
    _fbq?: Window['fbq']
  }
}

function initializeMetaPixel() {
  if (window.fbq) return

  const fbq: NonNullable<Window['fbq']> = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue?.push(args)
  }

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', META_PIXEL_ID)
}

export function CookieConsent() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<'accepted' | 'necessary' | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const savedConsent = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1]

    if (savedConsent === 'accepted' || savedConsent === 'necessary') setConsent(savedConsent)
    else setVisible(true)
  }, [])

  useEffect(() => {
    if (consent !== 'accepted' || process.env.NODE_ENV !== 'production') return

    initializeMetaPixel()
    window.fbq?.('track', 'PageView')
  }, [consent, pathname])

  function chooseConsent(value: 'accepted' | 'necessary') {
    document.cookie = `${COOKIE_NAME}=${value}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`
    setConsent(value)
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
        We use essential cookies to keep Anvance working. With your permission, we also use Meta Pixel to understand visits and improve our advertising. You can continue with necessary cookies only.
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
