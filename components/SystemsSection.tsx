'use client'

import { portfolioContent } from '@/lib/content'
import { CheckCircle } from 'lucide-react'

export function SystemsSection() {
  const { tools } = portfolioContent

  return (
    <section id="systems" className="py-16 md:py-24 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              04 / Tools &amp; Systems
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <h2 className="font-mono text-xs text-[var(--muted)] font-normal m-0 inline">
              Software Stack
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            Hands-on Experience
          </span>
        </div>

        {/* Grouped Table-like Ledger List */}
        <div className="space-y-6">
          {tools.map((group, groupIdx) => (
            <div
              key={group.category}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden shadow-2xs"
            >
              {/* Category Header Bar */}
              <div className="px-5 py-3.5 bg-[var(--background)] border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--accent)] font-bold">
                    0{groupIdx + 1}.
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[var(--foreground)]">
                    {group.category}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {group.description}
                </span>
              </div>

              {/* Table / Ledger Rows */}
              <div className="divide-y divide-[var(--border)]">
                {group.items.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-4 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--surface-hover)]/60 transition-colors"
                  >
                    {/* Tool Name */}
                    <div className="sm:w-1/3">
                      <div className="font-mono text-sm font-bold text-[var(--foreground)]">
                        {tool.name}
                      </div>
                    </div>

                    {/* Operational Use Case */}
                    <div className="sm:w-2/3 flex items-center justify-between gap-4">
                      <p className="text-xs sm:text-sm font-sans text-[var(--foreground)]/85 leading-relaxed">
                        {tool.useCase}
                      </p>
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 hidden md:inline" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
