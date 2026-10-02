import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'
import { LocaleProvider } from '@/components/locale-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://anvanceelopement.com'),
  title: 'Anvance Elopement | Italy Elopement Photography & Films',
  description: 'Anvance Elopement creates intimate elopement photography and cinematic wedding films across Italy, including Tuscany, the Amalfi Coast, Lake Como, Venice and the Dolomites.',
  keywords: ['Italy wedding photographer', 'Italy wedding videographer', 'Italy elopement photographer', 'Italy elopement videographer', 'Italian wedding photography', 'Italian wedding films', 'destination wedding photography Italy', 'destination wedding videography Italy', 'Amalfi Coast wedding photographer', 'Lake Como wedding photographer', 'Tuscany elopement photographer', 'Dolomites wedding film'],
  authors: [{ name: 'Anvance Elopement' }],
  creator: 'Anvance Elopement',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Anvance Elopement | Italy Elopement Photography & Films',
    description: 'Intimate elopement photography and cinematic wedding films across Italy — Tuscany, Amalfi Coast, Lake Como, Venice and the Dolomites.',
    type: 'website',
    locale: 'en_IT',
    siteName: 'Anvance Elopement',
    images: [{
      url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anvanceelopmentlogo-aXDhassIf5mIXnPRdFpEdZ8EBnS1az.png',
      width: 1200,
      height: 630,
      alt: 'Anvance Elopement — Italy elopement photography and films',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvance Elopement | Italy Elopement Photography & Films',
    description: 'Intimate elopement photography and cinematic wedding films across Italy.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anvanceelopmentlogo-aXDhassIf5mIXnPRdFpEdZ8EBnS1az.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IT">
      <body className="antialiased">
        <LocaleProvider>{children}</LocaleProvider>
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
