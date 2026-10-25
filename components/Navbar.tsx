'use client'

import { useState, useEffect } from 'react'
import { portfolioContent } from '@/lib/content'
import { Sun, Moon, Command, Menu, X, ArrowUpRight } from 'lucide-react'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('summary')
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }

      // Scroll-spy
      const sections = portfolioContent.navSections.map((s) => s.id)
      const scrollPos = window.scrollY + 140

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync theme
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('furqan_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('furqan_theme', 'light')
    }
  }

  return (
    <>
      {/* Reading Progress Hairline */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[var(--accent)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Minimal Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--border)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Monogram & Name */}
          <a
            href="#summary"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1"
          >
            <span className="w-8 h-8 rounded bg-[var(--accent)] text-white font-serif font-bold text-sm flex items-center justify-center tracking-wider shadow-xs">
              {portfolioContent.personal.monogram}
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight leading-none text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {portfolioContent.personal.name}
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--muted)] mt-0.5">
                HR Operations &amp; Admin
              </span>
            </div>
          </a>

          {/* Desktop Numbered Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {portfolioContent.navSections.map((sec) => {
              const isActive = activeSection === sec.id
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-light)] font-semibold border border-[var(--accent)]/30'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <span className="opacity-60 text-[10px]">{sec.number}</span>
                  <span>{sec.label}</span>
                </a>
              )
            })}
          </nav>

          {/* Right Action Controls: Cmd+K, Theme Toggle, CV */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick ⌘K Trigger */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Menu command palette"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all text-xs font-mono shadow-2xs"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] bg-[var(--background)] border border-[var(--border)] rounded text-[var(--muted)]">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all shadow-2xs"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Download CV pill */}
            <a
              href={portfolioContent.personal.cvUrl}
              download="Muhammad_Furqan_Tahir_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded bg-[var(--accent)] text-white text-xs font-mono font-medium hover:bg-[var(--accent-hover)] transition-all shadow-2xs"
            >
              <span>CV (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-4 py-3 space-y-1">
            {portfolioContent.navSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-mono border-b border-[var(--border)]/50 last:border-none text-[var(--foreground)]"
              >
                <span className="text-[var(--muted)] text-xs">{sec.number}</span>
                <span className="font-medium">{sec.label}</span>
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={portfolioContent.personal.cvUrl}
                download="Muhammad_Furqan_Tahir_CV.pdf"
                className="w-full text-center py-2 rounded bg-[var(--accent)] text-white text-xs font-mono font-medium"
              >
                Download Official CV (PDF)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
