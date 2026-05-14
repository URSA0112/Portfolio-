'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#06060f] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-violet-400/60 tracking-[0.3em] uppercase mb-4">Error</p>
        <h2 className="text-2xl font-bold text-white/80 mb-3">Something went wrong</h2>
        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
