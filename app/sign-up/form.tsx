'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nativeEvent = event.nativeEvent as KeyboardEvent
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    setBusy(true)
    setError('')
    const result = await authClient.signUp.email({ name, email, password })
    if (result.error) {
      setError('We could not create your studio account. Check your details and try again.')
      setBusy(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return <form onSubmit={submit} className="mt-10 grid gap-5">
    <label className="grid gap-2 text-sm">Name<input required value={name} onChange={(event) => setName(event.target.value)} className="rounded-full border border-ivory/20 bg-transparent px-5 py-3" /></label>
    <label className="grid gap-2 text-sm">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-full border border-ivory/20 bg-transparent px-5 py-3" /></label>
    <label className="grid gap-2 text-sm">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-full border border-ivory/20 bg-transparent px-5 py-3" /></label>
    {error && <p className="text-sm text-red-300">{error}</p>}
    <button disabled={busy} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60">{busy ? 'Creating access…' : 'Create studio access'}</button>
  </form>
}
