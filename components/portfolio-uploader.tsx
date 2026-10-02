'use client'

import { useState } from 'react'

type Upload = { url: string; name: string; progress: number }

export function PortfolioUploader() {
  const [uploads, setUploads] = useState<Upload[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function uploadFile(file: File, signed: { apiKey: string; timestamp: number; signature: string; folder: string; cloudName: string }, index: number) {
    const form = new FormData()
    form.append('file', file)
    form.append('api_key', signed.apiKey)
    form.append('timestamp', String(signed.timestamp))
    form.append('signature', signed.signature)
    form.append('folder', signed.folder)
    return new Promise<{ url: string; name: string }>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${signed.cloudName}/auto/upload`)
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) setUploads((current) => current.map((upload, uploadIndex) => uploadIndex === index ? { ...upload, progress: Math.round((event.loaded / event.total) * 100) } : upload))
      }
      xhr.onload = () => {
        const result = JSON.parse(xhr.responseText)
        if (xhr.status < 200 || xhr.status >= 300) reject(new Error(result.error?.message || `Could not upload ${file.name}.`))
        else { setUploads((current) => current.map((upload, uploadIndex) => uploadIndex === index ? { ...upload, progress: 100 } : upload)); resolve({ url: result.secure_url, name: file.name }) }
      }
      xhr.onerror = () => reject(new Error(`Could not upload ${file.name}.`))
      xhr.send(form)
    })
  }

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    setBusy(true); setError('')
    try {
      const signResponse = await fetch('/api/cloudinary/sign', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ folder: 'anvance-portfolio' }) })
      const signed = await signResponse.json()
      if (!signResponse.ok) throw new Error(signed.error || 'Could not prepare upload.')
      setUploads((current) => [...current, ...files.map((file) => ({ name: file.name, url: '', progress: 0 }))])
      const startIndex = uploads.length
      const next = await Promise.all(files.map((file, index) => uploadFile(file, signed, startIndex + index)))
      setUploads((current) => current.map((upload) => upload.url ? upload : next.find((item) => item.name === upload.name) ? { ...upload, ...next.find((item) => item.name === upload.name)!, progress: 100 } : upload))
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.') }
    finally { setBusy(false); event.target.value = '' }
  }

  const completed = uploads.filter((upload) => upload.url)
  const overall = uploads.length ? Math.round(uploads.reduce((sum, upload) => sum + upload.progress, 0) / uploads.length) : 0
  return <div className="grid gap-3 md:col-span-2"><div className="flex items-end justify-between"><div><p className="text-sm font-medium">Gallery photos and films</p><p className="text-xs text-ink/55">Select all photos for one album. They create one project only when you publish the form.</p></div>{busy && <span className="text-sm font-medium tabular-nums">{overall}%</span>}</div><label className="grid cursor-pointer gap-2 rounded-2xl border border-dashed border-ink/25 bg-white/30 p-5 text-sm hover:border-ink/60"><span className="text-xs leading-5 text-ink/55">JPG, PNG, WebP, or MP4. All selected files stay in this project album.</span><input type="file" accept="image/jpeg,image/png,image/webp,video/mp4" multiple onChange={handleFiles} disabled={busy} className="sr-only" /><span className="w-fit rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[.15em] text-ivory">{busy ? `Uploading ${overall}%` : 'Choose files'}</span></label>{busy && <div className="h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full bg-terracotta transition-all" style={{ width: `${overall}%` }} /></div>}{error && <p role="alert" className="text-sm text-red-700">{error}</p>}{completed.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{completed.map((upload) => <div key={upload.url} className="overflow-hidden rounded-xl border border-ink/10 bg-white"><img src={upload.url} alt={upload.name} className="aspect-square w-full object-cover" /><p className="truncate px-2 py-2 text-[10px] text-ink/55">{upload.name}</p></div>)}</div>}<input type="hidden" name="mediaUrls" value={JSON.stringify(completed.map((upload) => upload.url))} /></div>
}
