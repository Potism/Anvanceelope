'use client'

import { useState } from 'react'
import { PortfolioUploader } from '@/components/portfolio-uploader'
import { savePortfolioProject } from '@/app/dashboard/actions'

export function PublishProjectForm() {
  const [status, setStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('publishing')
    setMessage('')
    try {
      await savePortfolioProject(formData)
      form.reset()
      setStatus('success')
      setMessage('Project published successfully. It is now live in your portfolio.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not publish this project.')
    }
  }

  return <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
    <label className="grid gap-2 text-sm">Project title<input name="title" required placeholder="A quiet morning in Puglia" className="rounded-2xl border border-ink/15 bg-transparent px-4 py-3" /></label>
    <label className="grid gap-2 text-sm">Destination<input name="destination" required placeholder="Puglia" className="rounded-2xl border border-ink/15 bg-transparent px-4 py-3" /></label>
    <label className="grid gap-2 text-sm">Mood / category<input name="mood" required placeholder="Quiet mornings, wild joy" className="rounded-2xl border border-ink/15 bg-transparent px-4 py-3" /></label>
    <label className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3 text-sm"><input name="featured" type="checkbox" value="true" className="h-4 w-4 accent-ink" /> Show this album in “Italy, in all her moods”</label>
    <PortfolioUploader />
    <label className="grid gap-2 text-sm md:col-span-2">Story summary<textarea name="summary" rows={4} placeholder="A few lines about the day…" className="rounded-2xl border border-ink/15 bg-transparent px-4 py-3" /></label>
    <button type="submit" disabled={status === 'publishing'} className="cursor-pointer rounded-full bg-ink px-6 py-3 text-sm text-ivory transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-50 md:col-span-2 md:justify-self-start">{status === 'publishing' ? 'Publishing…' : 'Publish project'}</button>
    {message && <p role="status" className={`md:col-span-2 text-sm ${status === 'error' ? 'text-red-800' : 'text-olive'}`}>{message}</p>}
  </form>
}
