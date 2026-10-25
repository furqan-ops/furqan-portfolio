'use client'

import { useState, useEffect, useRef } from 'react'
import { portfolioContent } from '@/lib/content'
import {
  Search,
  X,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Sun,
  Moon,
  Copy,
  Check
} from 'lucide-react'

// Bespoke inline LinkedIn SVG icon to avoid lucide-react brand dependency issues
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('furqan_theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('furqan_theme', 'dark')
    }
    onClose()
  }

  if (!isOpen) return null

  const filteredSections = portfolioContent.navSections.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.number.includes(query)
  )

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-palette-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border-strong)] rounded-lg shadow-2xl overflow-hidden font-mono text-sm animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--background)]">
          <Search className="w-4 h-4 text-[var(--muted)]" />
          <input
            ref={inputRef}
            id="cmd-palette-title"
            type="text"
            placeholder="Type a section or action (e.g. experience, payroll, copy)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-hidden text-sm placeholder:text-[var(--muted)]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {/* Jump to Sections */}
          <div className="px-2 py-1 text-[10px] tracking-wider uppercase text-[var(--muted)]">
            Sections (Scroll)
          </div>
          {filteredSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[var(--muted)]">{sec.number}</span>
                <span className="font-medium">{sec.label}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
            </a>
          ))}

          {/* Quick Actions */}
          <div className="pt-2 px-2 py-1 text-[10px] tracking-wider uppercase text-[var(--muted)] border-t border-[var(--border)] mt-2">
            Quick Actions
          </div>

          <button
            onClick={() => copyToClipboard(portfolioContent.personal.email, 'email')}
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--accent)]" />
              <span>Copy Email Address</span>
            </div>
            {copiedKey === 'email' ? (
              <span className="text-xs text-[var(--success)] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <span className="text-xs text-[var(--muted)]">{portfolioContent.personal.email}</span>
            )}
          </button>

          <button
            onClick={() => copyToClipboard(portfolioContent.personal.phone, 'phone')}
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent)]" />
              <span>Copy Phone Number</span>
            </div>
            {copiedKey === 'phone' ? (
              <span className="text-xs text-[var(--success)] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <span className="text-xs text-[var(--muted)]">{portfolioContent.personal.phone}</span>
            )}
          </button>

          <a
            href={portfolioContent.personal.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors"
          >
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
              <span>Open LinkedIn Profile</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)]" />
          </a>

          <a
            href={portfolioContent.personal.cvUrl}
            download="Muhammad_Furqan_Tahir_CV.pdf"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent)]" />
              <span>Download CV (Official PDF)</span>
            </div>
            <span className="text-[11px] text-[var(--accent)] font-semibold">1-Page PDF</span>
          </a>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--surface-hover)] transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Toggle Dark / Light Mode</span>
            </div>
            <kbd className="text-[10px] text-[var(--muted)]">Shift+D</kbd>
          </button>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-between text-[11px] text-[var(--muted)]">
          <span>Use &uarr; &darr; to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  )
}
