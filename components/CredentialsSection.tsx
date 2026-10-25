'use client'

import { portfolioContent } from '@/lib/content'
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react'

export function CredentialsSection() {
  const { credentials } = portfolioContent

  const education = credentials.filter((c) => c.type === 'degree')
  const certifications = credentials.filter((c) => c.type === 'certification')

  return (
    <section id="credentials" className="py-16 md:py-24 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              05 / Credentials & Education
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <span className="font-mono text-xs text-[var(--muted)]">Academic & Professional Ledger</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            Verified Records
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
              <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="font-serif text-lg font-bold text-[var(--foreground)]">
                Higher Education
              </h3>
            </div>

            {education.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-serif text-lg font-bold text-[var(--foreground)]">
                    {item.title}
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] shrink-0">
                    {item.year}
                  </span>
                </div>

                <div className="text-xs font-mono text-[var(--accent)] font-medium">
                  {item.issuer}
                </div>

                {item.gradeOrDetail && (
                  <p className="text-xs font-sans text-[var(--muted)] leading-relaxed pt-1 border-t border-[var(--border)]/60">
                    {item.gradeOrDetail}
                  </p>
                )}
              </div>
            ))}

            <div className="p-4 rounded border border-[var(--border)] bg-[var(--background)] text-xs font-mono text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)]">Engineering Foundation: </strong>
              BSc Software Engineering provides rigorous algorithmic thinking, database structure proficiency, and quick adoption of enterprise software platforms.
            </div>
          </div>

          {/* Certifications Ledger Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="font-serif text-lg font-bold text-[var(--foreground)]">
                  Professional Certifications
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--muted)]">4 Completed (2024)</span>
            </div>

            <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] divide-y divide-[var(--border)] overflow-hidden shadow-2xs">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm sm:text-base text-[var(--foreground)]">
                        {cert.title}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[var(--muted)]">
                      Issuing Body: <strong className="text-[var(--accent)] font-medium">{cert.issuer}</strong>
                    </div>
                    {cert.gradeOrDetail && (
                      <div className="text-[11px] font-sans text-[var(--muted)]">
                        {cert.gradeOrDetail}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">
                      {cert.year}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
