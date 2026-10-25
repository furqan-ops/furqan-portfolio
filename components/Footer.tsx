'use client'

import { portfolioContent } from '@/lib/content'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left: Brand Monogram & Details */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded bg-[var(--accent)] text-white font-serif font-bold text-sm flex items-center justify-center tracking-wider">
              {portfolioContent.personal.monogram}
            </span>
            <div>
              <div className="font-serif font-bold text-base text-[var(--foreground)]">
                {portfolioContent.personal.name}
              </div>
              <div className="font-mono text-xs text-[var(--muted)]">
                {portfolioContent.personal.title} &bull; {portfolioContent.personal.location}
              </div>
            </div>
          </div>

          {/* Center: System notice */}
          <div className="font-mono text-xs text-[var(--muted)]">
            <span>HR Operations &amp; Administration Portfolio</span>
          </div>

          {/* Right: Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all shadow-2xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]">
          <div>
            &copy; {new Date().getFullYear()} {portfolioContent.personal.name}. Rawalpindi, Pakistan.
          </div>
          <div>
            Timezone: PKT (UTC+5)
          </div>
        </div>
      </div>
    </footer>
  )
}
