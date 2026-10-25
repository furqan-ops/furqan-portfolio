'use client'

import { useState } from 'react'
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
              02 / Workflow
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <h2 className="font-mono text-xs text-[var(--muted)] font-normal m-0 inline">
              HR Operations Workflow
            </h2>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[var(--muted)]">
            Click to view duty
          </span>
        </div>

        {/* Process Diagram: Horizontal Strip */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 sm:p-6">
          <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Operations Lifecycle</span>
            <span className="text-[var(--accent)] font-semibold">Applivity, Islamabad</span>
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
                      ? 'border-[var(--accent)] bg-[var(--background)] shadow-2xs ring-1 ring-[var(--accent)]/30'
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
                  <strong className="text-[var(--foreground)] mr-1">
                    Responsibility:
                  </strong>
                  <span className="font-sans text-[var(--foreground)]/90">{linkedBullet.text}</span>
                </div>
              </div>
              <a
                href="#experience"
                className="shrink-0 text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Experience</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
