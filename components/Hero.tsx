'use client'

import { useState, useEffect } from 'react'
import { portfolioContent, Metric } from '@/lib/content'
import { ArrowDown, FileText, Mail, Info, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export function Hero() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    payroll: 0,
    attendance: 0,
    efficiency: 0,
  })
  const [activeHoverMetric, setActiveHoverMetric] = useState<Metric | null>(null)

  // Counting up once on load, respecting prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setCounts({
        payroll: 45,
        attendance: 100,
        efficiency: 40,
      })
      return
    }

    const duration = 1400 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)

      setCounts({
        payroll: Math.round(ease * 45),
        attendance: Math.round(ease * 100),
        efficiency: Math.round(ease * 40),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <section
      id="summary"
      className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Index Marker */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
            01 / About
          </span>
          <span className="h-px w-12 bg-[var(--border-strong)]" />
          <span className="font-mono text-xs text-[var(--muted)]">Rawalpindi, Pakistan</span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Name & Direct Summary */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.08]">
                {portfolioContent.personal.name}
              </h1>
              <p className="font-mono text-sm sm:text-base font-semibold text-[var(--accent)] tracking-wide">
                {portfolioContent.personal.title}
              </p>
            </div>

            {/* Direct Summary */}
            <p className="text-base sm:text-lg text-[var(--foreground)]/90 leading-relaxed max-w-2xl font-sans">
              {portfolioContent.personal.summary}
            </p>

            {/* Quick Fact Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-mono text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Applivity, Islamabad (May 2024 – Present)</span>
              </span>
              <span>&bull;</span>
              <span>ERPNext &amp; Frappe HR</span>
              <span>&bull;</span>
              <span>Advanced Excel</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={portfolioContent.personal.cvUrl}
                download="Muhammad_Furqan_Tahir_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[var(--accent)] text-white text-xs sm:text-sm font-mono font-medium hover:bg-[var(--accent-hover)] transition-all shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href={`mailto:${portfolioContent.personal.email}?subject=HR%20Operations%20Inquiry%20-%20Muhammad%20Furqan%20Tahir`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-[var(--border-strong)] bg-[var(--surface)] text-xs sm:text-sm font-mono font-medium hover:bg-[var(--surface-hover)] transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <span>Email Me</span>
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <span>View Experience</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Headline Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">
                Key Operations Metrics
              </span>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                Applivity &bull; Verified
              </span>
            </div>

            <div className="space-y-3">
              {portfolioContent.headlineMetrics.map((m) => {
                const currentCount = counts[m.id] ?? m.value
                const isHovered = activeHoverMetric?.id === m.id

                return (
                  <div
                    key={m.id}
                    onMouseEnter={() => setActiveHoverMetric(m)}
                    onMouseLeave={() => setActiveHoverMetric(null)}
                    onFocus={() => setActiveHoverMetric(m)}
                    onBlur={() => setActiveHoverMetric(null)}
                    tabIndex={0}
                    className={`p-4 sm:p-5 rounded-lg border transition-all cursor-pointer relative ${
                      isHovered
                        ? 'border-[var(--accent)] bg-[var(--surface-hover)] shadow-xs ring-1 ring-[var(--accent)]/30'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] tabular-nums">
                        {currentCount}
                        <span className="text-[var(--accent)]">{m.suffix}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-sm font-semibold text-[var(--foreground)] font-sans">
                        {m.label}
                      </div>
                      <div className="text-xs font-mono text-[var(--muted)] mt-0.5">
                        {m.subtext}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Context from CV */}
            {activeHoverMetric && (
              <div className="p-3 rounded border border-[var(--accent)] bg-[var(--accent-light)] text-xs font-mono text-[var(--foreground)] animate-in fade-in duration-100">
                <span className="font-bold text-[var(--accent)] uppercase mr-1">CV Detail:</span>
                <span className="font-sans">{activeHoverMetric.sourceBullet}</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
