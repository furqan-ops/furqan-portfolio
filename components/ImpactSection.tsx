'use client'

import { useState, useEffect, useRef } from 'react'
import { portfolioContent, ProcessStep } from '@/lib/content'
import {
  UserCheck,
  FileCheck,
  CreditCard,
  Clock,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

const stepIcons: { [key: string]: React.ReactNode } = {
  '01': <UserCheck className="w-4 h-4" />,
  '02': <FileCheck className="w-4 h-4" />,
  '03': <CreditCard className="w-4 h-4" />,
  '04': <Clock className="w-4 h-4" />,
  '05': <BarChart3 className="w-4 h-4" />,
}

export function ImpactSection() {
  const [selectedStep, setSelectedStep] = useState<ProcessStep>(portfolioContent.impactSteps[2]) // Default to Payroll
  const [payrollRunProgress, setPayrollRunProgress] = useState(0)
  const [payrollRunActive, setPayrollRunActive] = useState(false)
  const payrollLedgerRef = useRef<HTMLDivElement>(null)

  // Intersection observer for payroll run micro-animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !payrollRunActive) {
          setPayrollRunActive(true)

          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (prefersReduced) {
            setPayrollRunProgress(45)
            return
          }

          let current = 0
          const interval = setInterval(() => {
            current += 1
            setPayrollRunProgress(current)
            if (current >= 45) {
              clearInterval(interval)
            }
          }, 35) // ~1.5s total to tick all 45 slots
        }
      },
      { threshold: 0.25 }
    )

    if (payrollLedgerRef.current) {
      observer.observe(payrollLedgerRef.current)
    }

    return () => observer.disconnect()
  }, [payrollRunActive])

  // Find linked bullet text from CV
  const linkedBullet = portfolioContent.experience.bullets.find(
    (b) => b.id === selectedStep.linkedBulletId
  )

  return (
    <section id="impact" className="py-16 md:py-24 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              02 / Impact Architecture
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <h2 className="font-mono text-xs text-[var(--muted)] font-normal m-0 inline">
              Day-in-the-Job Process Cycle
            </h2>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[var(--muted)]">
            Click steps to inspect source duties
          </span>
        </div>

        {/* Process Diagram: Horizontal Strip */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 sm:p-6 mb-8">
          <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Core Operational Flow</span>
            <span className="text-[var(--accent)] font-semibold">End-to-End People Cycle</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {portfolioContent.impactSteps.map((step) => {
              const isSelected = selectedStep.step === step.step

              return (
                <button
                  key={step.step}
                  onClick={() => setSelectedStep(step)}
                  className={`flex flex-col text-left p-3.5 rounded-md border transition-all relative ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--background)] shadow-sm ring-1 ring-[var(--accent)]/30'
                      : 'border-[var(--border)] bg-[var(--surface-hover)]/40 hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[11px] font-bold text-[var(--muted)]">
                      {step.step}
                    </span>
                    <span className={`p-1 rounded ${isSelected ? 'text-[var(--accent)] bg-[var(--accent-light)]' : 'text-[var(--muted)]'}`}>
                      {stepIcons[step.step]}
                    </span>
                  </div>

                  <div className="font-serif font-bold text-base text-[var(--foreground)]">
                    {step.title}
                  </div>

                  <div className="font-mono text-[10px] text-[var(--accent)] font-medium mt-1">
                    {step.metric}
                  </div>

                  <p className="text-[11px] text-[var(--muted)] line-clamp-2 mt-1.5 leading-snug font-sans">
                    {step.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Expanded Step Detail Box linked to CV */}
          {linkedBullet && (
            <div className="mt-4 p-4 rounded border border-[var(--border)] bg-[var(--background)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--foreground)] uppercase tracking-wider mr-2">
                    Step {selectedStep.step} Linked CV Duty:
                  </strong>
                  <span className="font-sans text-[var(--foreground)]/90">{linkedBullet.text}</span>
                </div>
              </div>
              <a
                href="#experience"
                className="shrink-0 text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Creative Micro-Animation: "Payroll Run" 45-Row Micro-Ledger */}
        <div
          ref={payrollLedgerRef}
          className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden"
        >
          {/* Header of Payroll Ledger */}
          <div className="px-5 py-4 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3 bg-[var(--background)]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="font-mono text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  Decorative Micro-Ledger: Monthly Payroll Run
                </div>
                <div className="font-mono text-[11px] text-[var(--muted)]">
                  Simulating end-to-end reconciliation across 45 employee records
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
                Status: <strong className="text-[var(--accent)]">{payrollRunProgress === 45 ? '100% RECONCILED' : `PROCESSING (${payrollRunProgress}/45)`}</strong>
              </div>
              <div className="text-[var(--muted)] text-[11px] hidden sm:inline">
                ERPNext &bull; Zero Discrepancy
              </div>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-[var(--border)] h-1.5 overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-75"
              style={{ width: `${(payrollRunProgress / 45) * 100}%` }}
            />
          </div>

          {/* 45 Micro Ledger Slots Grid */}
          <div className="p-5">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {Array.from({ length: 45 }).map((_, index) => {
                const rowNum = index + 1
                const isComplete = rowNum <= payrollRunProgress

                return (
                  <div
                    key={rowNum}
                    className={`px-2 py-1.5 rounded border text-[10px] font-mono flex items-center justify-between transition-all duration-150 ${
                      isComplete
                        ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                        : 'border-[var(--border)] bg-[var(--background)]/60 text-[var(--muted)] opacity-50'
                    }`}
                  >
                    <span className="font-medium">#{String(rowNum).padStart(2, '0')}</span>
                    {isComplete ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        OK
                      </span>
                    ) : (
                      <span className="text-[9px] text-[var(--muted)]">...</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Footnote note */}
            <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--muted)]">
              <span>* Decorative visualization demonstrating high-volume administrative record handling.</span>
              <span className="text-[var(--accent)] font-medium">Source: Applivity Payroll Registry (45 staff)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
