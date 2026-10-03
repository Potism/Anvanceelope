import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'
import { LocaleProvider } from '@/components/locale-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anvanceelopement.com'),
  title: { default: 'Anvance Elopement | Italy Elopement Photography & Films', template: '%s | Anvance Elopement' },
  description: 'Anvance creates intimate Italy elopement photography and cinematic wedding films for couples planning a destination wedding in Tuscany, Lake Como, the Dolomites, Venice and the Amalfi Coast.',
  keywords: ['Italy elopement photographer', 'Italy elopement videographer', 'Italy wedding photographer', 'Italy wedding videographer', 'Italy wedding films', 'destination wedding photographer Italy', 'Tuscany elopement photographer', 'Lake Como wedding photographer', 'Dolomites elopement videographer', 'Amalfi Coast wedding films', 'Venice wedding photographer', 'Italian destination wedding'],
  authors: [{ name: 'Anvance Elopement' }],
  creator: 'Anvance Elopement',
  publisher: 'Anvance Elopement',
  category: 'wedding photography and videography',
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
    icon: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: '/icon.svg',
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['ProfessionalService', 'LocalBusiness'],
          '@id': 'https://www.anvanceelopement.com/#business',
          name: 'Anvance Elopement',
          url: 'https://www.anvanceelopement.com',
          image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anvanceelopmentlogo-aXDhassIf5mIXnPRdFpEdZ8EBnS1az.png',
          logo: 'https://www.anvanceelopement.com/icon.svg',
          description: 'Italy elopement photography, destination wedding photography, and cinematic wedding films.',
          telephone: '+39 340 742 1347',
          email: 'hello@anvanceelopement.com',
          priceRange: '€€',
          areaServed: ['Italy', 'Tuscany', 'Lake Como', 'Dolomites', 'Amalfi Coast', 'Venice', 'Puglia', 'Sicily'],
          sameAs: ['https://instagram.com/anvance.elopement', 'https://www.tiktok.com/@anvance.elopement'],
          hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Italy wedding photo and film services', itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Italy elopement videography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Destination wedding photography in Italy' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cinematic wedding films in Italy' } },
          ] },
        }) }} />
        <LocaleProvider>{children}</LocaleProvider>
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
