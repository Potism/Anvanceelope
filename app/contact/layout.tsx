import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Anvance Elopement | Check Your Italy Elopement Date',
  description: 'Enquire about your Italy elopement photography and wedding film. Anvance replies personally within 48 hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
