import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'
import { LocaleProvider } from '@/components/locale-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anvanceelopement.com'),
  title: { default: 'Italy Elopement Photography & Videography | Anvance', template: '%s | Anvance Elopement' },
  description: 'Anvance Elopement is an Italy-based photography and videography team creating cinematic imagery and wedding films in the Dolomites, Lake Como, Tuscany, Venice and beyond.',
  keywords: ['Italy elopement photographer', 'Italy elopement videographer', 'Italy wedding photographer', 'Italy wedding videographer', 'Italy wedding films', 'destination wedding photographer Italy', 'Tuscany elopement photographer', 'Lake Como wedding photographer', 'Dolomites elopement videographer', 'Amalfi Coast wedding films', 'Venice wedding photographer', 'Italian destination wedding'],
  authors: [{ name: 'Anvance Elopement' }],
  creator: 'Anvance Elopement',
  publisher: 'Anvance Elopement',
  category: 'wedding photography and videography',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Italy Elopement Photography & Videography | Anvance',
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
    title: 'Italy Elopement Photography & Videography | Anvance',
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
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://www.anvanceelopement.com/#organization',
              name: 'Anvance Elopement',
              alternateName: 'Anvance',
              url: 'https://www.anvanceelopement.com/',
              logo: {
                '@type': 'ImageObject',
                url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anvanceelopmentlogo-aXDhassIf5mIXnPRdFpEdZ8EBnS1az.png',
              },
              sameAs: ['https://instagram.com/anvance.elopement', 'https://www.tiktok.com/@anvance.elopement'],
            },
            {
              '@type': 'WebSite',
              '@id': 'https://www.anvanceelopement.com/#website',
              url: 'https://www.anvanceelopement.com/',
              name: 'Anvance Elopement',
              alternateName: 'Anvance',
              publisher: { '@id': 'https://www.anvanceelopement.com/#organization' },
              inLanguage: ['en-IT', 'it-IT'],
            },
            {
              '@type': ['ProfessionalService', 'LocalBusiness'],
              '@id': 'https://www.anvanceelopement.com/#business',
              name: 'Anvance Elopement',
              alternateName: 'Anvance',
              url: 'https://www.anvanceelopement.com/',
              image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anvanceelopmentlogo-aXDhassIf5mIXnPRdFpEdZ8EBnS1az.png',
              description: 'An Italy-based photography and videography team creating elopement photography and cinematic wedding films.',
              telephone: '+39 340 742 1347',
              email: 'hello@anvanceelopement.com',
              priceRange: '€€',
              areaServed: ['Italy', 'Tuscany', 'Lake Como', 'Dolomites', 'Amalfi Coast', 'Venice', 'Puglia', 'Sicily'],
              parentOrganization: { '@id': 'https://www.anvanceelopement.com/#organization' },
              hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Italy wedding photo and film services', itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Italy elopement videography' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Destination wedding photography in Italy' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cinematic wedding films in Italy' } },
              ] },
            },
          ],
        }) }} />
        <LocaleProvider>{children}</LocaleProvider>
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
