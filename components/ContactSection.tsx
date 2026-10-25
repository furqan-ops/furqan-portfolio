'use client'

import { useState } from 'react'
import { portfolioContent } from '@/lib/content'
import {
  Mail,
  Phone,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  MapPin,
  ShieldCheck
} from 'lucide-react'

// Bespoke inline LinkedIn SVG icon to avoid external brand dependency discrepancies
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

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioContent.personal.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2200)
    } catch (e) {
      console.error(e)
    }
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(portfolioContent.personal.phone)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2200)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              06 / Direct Contact
            </span>
            <span className="h-px w-12 bg-[var(--border-strong)]" />
            <span className="font-mono text-xs text-[var(--muted)]">Verified Channels</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
            Response &le; 24h
          </span>
        </div>

        {/* Editorial Contact Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 sm:p-8 lg:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Context & Availability */}
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                Let&apos;s discuss operations, reporting, or executive support.
              </h2>
              
              <p className="text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed">
                Available for full-time HR operations, office administration, and executive assistant opportunities. Fully equipped for dedicated remote collaboration across US Eastern Time (EST) and local business hours.
              </p>

              <div className="p-4 rounded border border-[var(--border)] bg-[var(--background)] space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--foreground)]">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Based in {portfolioContent.personal.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--foreground)]">
                  <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Working Hours: US Eastern Time (EST) &bull; Immediate Availability</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Dedicated home office with primary fiber &amp; mobile backup</span>
                </div>
              </div>

              {/* Download CV Large Button */}
              <div className="pt-2">
                <a
                  href={portfolioContent.personal.cvUrl}
                  download="Muhammad_Furqan_Tahir_CV.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[var(--accent)] text-white text-sm font-mono font-medium hover:bg-[var(--accent-hover)] transition-all shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Official CV (PDF)</span>
                  <span className="text-[10px] opacity-80 pl-1">1-Page</span>
                </a>
              </div>
            </div>

            {/* Right side: Direct Action Controls */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Email Control */}
              <div className="p-4 sm:p-5 rounded-lg border border-[var(--border)] bg-[var(--background)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="uppercase tracking-wider">Primary Email</span>
                  <span>Mailto &bull; Copy</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <a
                    href={`mailto:${portfolioContent.personal.email}?subject=Inquiry:%20HR%20Operations%20%26%20Administration%20-%20Muhammad%20Furqan%20Tahir`}
                    className="font-mono text-sm sm:text-base font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    <span>{portfolioContent.personal.email}</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs font-mono hover:bg-[var(--surface-hover)] transition-all shrink-0"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                        <span className="text-[var(--success)] font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--muted)]" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Control (Click-to-Copy ONLY per instructions) */}
              <div className="p-4 sm:p-5 rounded-lg border border-[var(--border)] bg-[var(--background)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="uppercase tracking-wider">Direct Phone / WhatsApp</span>
                  <span className="text-[var(--accent)] font-medium">Click-to-Copy Control</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="font-mono text-sm sm:text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--accent)]" />
                    <span>{portfolioContent.personal.phoneDisplay}</span>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs font-mono hover:bg-[var(--surface-hover)] transition-all shrink-0"
                    aria-label="Copy phone number to clipboard"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                        <span className="text-[var(--success)] font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--muted)]" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[var(--muted)] pt-1">
                  * Telephone link is protected as a copy control to prevent unintended dialing.
                </div>
              </div>

              {/* LinkedIn Control */}
              <div className="p-4 sm:p-5 rounded-lg border border-[var(--border)] bg-[var(--background)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span className="uppercase tracking-wider">Professional Network</span>
                  <span>Verified Profile</span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={portfolioContent.personal.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm sm:text-base font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
                    <span className="truncate">{portfolioContent.personal.linkedInHandle}</span>
                  </a>

                  <a
                    href={portfolioContent.personal.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs font-mono hover:bg-[var(--surface-hover)] transition-all shrink-0"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)]" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
