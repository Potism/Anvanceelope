'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function SignInForm({ nextPath }: { nextPath: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nativeEvent = event.nativeEvent as KeyboardEvent
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    setBusy(true); setError('')
    const result = await authClient.signIn.email({ email, password })
    if (result.error) { setError('We could not sign you in. Check your details and try again.'); setBusy(false); return }
    router.push(nextPath || '/dashboard'); router.refresh()
  }

  return <form onSubmit={submit} className="mt-10 grid gap-5"><label className="grid gap-2 text-sm">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full border border-ivory/20 bg-transparent px-5 py-3" /></label><label className="grid gap-2 text-sm">Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full border border-ivory/20 bg-transparent px-5 py-3" /></label>{error && <p className="text-sm text-red-300">{error}</p>}<button disabled={busy} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button></form>
}
