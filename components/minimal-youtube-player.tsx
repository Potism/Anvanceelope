'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

export function MinimalYouTubePlayer() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
      {playing ? (
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/Bocd5gCa0NY?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3"
          title="Anvance Elopement cinematic wedding film"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play Anvance Elopement wedding film"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <img
            src="https://i.ytimg.com/vi/Bocd5gCa0NY/maxresdefault.jpg"
            alt="Preview of the Anvance Elopement cinematic wedding film"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-ink shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <Play size={22} fill="currentColor" strokeWidth={1.5} className="ml-1" />
          </span>
        </button>
      )}
    </div>
  )
}
