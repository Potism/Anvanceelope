import Link from 'next/link'
import { SignUpForm } from './form'

export default function SignUpPage() {
  return <main className="min-h-screen bg-ink px-6 py-16 text-ivory"><div className="mx-auto max-w-md"><p className="text-xs uppercase tracking-[0.28em] text-gold">Anvance Elopement</p><h1 className="mt-8 font-serif text-5xl">Create studio access</h1><p className="mt-4 text-ivory/65">Set up the private space where you can manage your destination stories.</p><SignUpForm /><p className="mt-8 text-sm text-ivory/60">Already have access? <Link href="/sign-in" className="text-gold underline underline-offset-4">Sign in</Link></p></div></main>
}
