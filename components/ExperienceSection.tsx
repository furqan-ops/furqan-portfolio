'use client'

import { useState } from 'react'
import { portfolioContent } from '@/lib/content'
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react'

export function ExperienceSection() {
  const [expandedBullets, setExpandedBullets] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const { experience } = portfolioContent

  const categories = [
    { id: 'all', label: 'All Responsibilities' },
    { id: 'payroll', label: 'Payroll & Finance' },
    { id: 'attendance', label: 'Attendance & Leave' },
    { id: 'systems', label: 'ERP Systems' },
    { id: 'reporting', label: 'Executive Reporting' },
    { id: 'documentation', label: 'Official Documents' }
  ]

  const filteredBullets = experience.bullets.filter((b) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'payroll') return b.category === 'payroll' || b.category === 'finance'
    if (selectedCategory === 'attendance') return b.category === 'attendance'
    if (selectedCategory === 'systems') return b.category === 'systems'
    if (selectedCategory === 'reporting') return b.category === 'reporting' || b.category === 'leadership'
    if (selectedCategory === 'documentation') return b.category === 'documentation' || b.category === 'compliance'
    return true
  })

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              03 / Professional Experience
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <span className="font-mono text-xs text-[var(--muted)]">Applivity, Islamabad</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
            {experience.period}
          </span>
        </div>

        {/* Promotion Progression Timeline Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border)]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-[var(--foreground)]">
                  {experience.currentRole}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Current
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)] mt-1">
                <span className="flex items-center gap-1 font-semibold text-[var(--foreground)]">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" /> {experience.company}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {experience.location}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {experience.period}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] bg-[var(--background)] px-3 py-1.5 rounded border border-[var(--border)]">
              <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
              <span>3x Promotion Pathway</span>
            </div>
          </div>

          {/* Visual Step-by-Step Promotion Track */}
          <div className="mb-6">
            <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-4">
              Career Growth & Advancement Path
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {experience.progression.map((stage, idx) => {
                const isCurrent = stage.status === 'current'
                return (
                  <div
                    key={stage.role}
                    className={`p-4 rounded-md border text-left relative transition-all ${
                      isCurrent
                        ? 'border-[var(--accent)] bg-[var(--accent-light)] shadow-xs ring-1 ring-[var(--accent)]/30'
                        : 'border-[var(--border)] bg-[var(--background)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 font-mono text-[11px]">
                      <span className="text-[var(--muted)]">Stage 0{idx + 1}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        isCurrent
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--surface-hover)] text-[var(--muted)]'
                      }`}>
                        {stage.period}
                      </span>
                    </div>

                    <div className="font-serif font-bold text-base text-[var(--foreground)]">
                      {stage.role}
                    </div>

                    <p className="text-xs font-sans text-[var(--muted)] mt-1.5 leading-snug">
                      {stage.highlight}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Filter Categories for Bullets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--accent)] text-white font-medium'
                      : 'bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setExpandedBullets(!expandedBullets)}
              aria-expanded={expandedBullets}
              className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 font-medium p-1"
            >
              {expandedBullets ? (
                <>
                  <span>Collapse Responsibilities</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Expand All Responsibilities</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Experience Responsibilities List */}
          {expandedBullets && (
            <div className="mt-6 space-y-3">
              {filteredBullets.map((bullet, idx) => (
                <div
                  key={bullet.id}
                  tabIndex={0}
                  className="p-4 rounded-md border border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-strong)] transition-all flex items-start gap-3 group focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  <span className="font-mono text-xs text-[var(--accent)] font-semibold mt-0.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-sans text-[var(--foreground)] leading-relaxed">
                      {bullet.text}
                    </p>
                    {bullet.highlight && (
                      <span className="inline-block font-mono text-[10px] text-[var(--muted)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                        Key Output: <strong className="text-[var(--foreground)]">{bullet.highlight}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
