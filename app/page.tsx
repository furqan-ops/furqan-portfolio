'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { CommandPalette } from '@/components/CommandPalette'
import { Hero } from '@/components/Hero'
import { ImpactSection } from '@/components/ImpactSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { SystemsSection } from '@/components/SystemsSection'
import { CredentialsSection } from '@/components/CredentialsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Quick Navigation Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 01 Summary & Key Metrics */}
        <Hero />

        {/* 02 Impact: Process Diagram & 45-Row Payroll Run */}
        <ImpactSection />

        {/* 03 Experience: Promotion Pathway & Responsibilities */}
        <ExperienceSection />

        {/* 04 Systems: Categorized Tool & Platform Index */}
        <SystemsSection />

        {/* 05 Credentials: Education & Certifications */}
        <CredentialsSection />

        {/* 06 Contact: Email, Copy Phone, LinkedIn & CV Download */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  )
}
