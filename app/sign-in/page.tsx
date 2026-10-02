import Link from 'next/link'
import { SignInForm } from './form'

type Props = { searchParams: Promise<{ next?: string }> }

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams
  return <main className="min-h-screen bg-ink px-6 py-16 text-ivory"><div className="mx-auto max-w-md"><p className="text-xs uppercase tracking-[0.28em] text-gold">Anvance Elopement</p><h1 className="mt-8 font-serif text-5xl">Studio access</h1><p className="mt-4 text-ivory/65">Sign in to manage your destination stories.</p><SignInForm nextPath={params.next || '/dashboard'} /><p className="mt-8 text-sm text-ivory/60">Need first-time access? <Link href="/sign-up" className="text-gold underline underline-offset-4">Create your studio account</Link></p></div></main>
}
