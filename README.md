# Muhammad Furqan Tahir — Personal Portfolio & Operations Ledger

A clean, editorial personal portfolio website for **Muhammad Furqan Tahir** (HR Operations & Executive Administration), built with Next.js (App Router), TypeScript, and Tailwind CSS.

Designed around the **"Operations Ledger"** concept: precise, calm, and editorial, reflecting an operations and administration professional who values data integrity, accuracy, and operational rigor.

Live Production URL: [https://furqan-portfolio-brown-one.vercel.app](https://furqan-portfolio-brown-one.vercel.app)

---

## Key Highlights & Features

- **Editorial Ledger Aesthetic**: Warm paper palette (`#F5F2EC`), near-black ink (`#1A1A1A`), deep teal accent (`#0F5257`), Fraunces serif display typography, Inter body, and IBM Plex Mono tabular figures.
- **Audited Metrics Counter**: 45 employees on payroll, 100% attendance accuracy, 40% reduction in manual processing time (counts up with prefers-reduced-motion respect; hover reveals the verbatim CV source line).
- **"Day in Operations" Process Cycle**: Interactive Hire → Onboard → Payroll → Attendance → Report process strip linked to corresponding CV responsibilities.
- **"Payroll Run" Micro-Animation**: 45-row ledger visualization simulating end-to-end salary reconciliation across all 45 employees when scrolled into view.
- **Career Advancement Timeline**: Visual 3x promotion path at Applivity (HR Intern → Technical Recruiter → HR Operations Specialist) with keyboard-accessible expand/collapse and category filtering.
- **Structured Systems Index**: Table-style tool index grouped by HRMS, Microsoft Office, and Business Analytics with proficiency ratings and operational use cases.
- **Protected Contact Controls**: Direct mailto link, 1-click copy email, click-to-copy phone control (protected to prevent accidental mobile dialing), verified LinkedIn link, and direct 1-page CV PDF download.
- **Global Command Palette**: Instant ⌘K / Ctrl+K keyboard palette to jump between sections, copy contact info, download CV, or toggle dark mode.
- **Dark Mode**: Smooth dark ledger theme respecting system `prefers-color-scheme` with manual toggle.
- **SEO & Performance**: OpenGraph 1200×630 dynamic image (`app/opengraph-image.tsx`), JSON-LD Person schema, sitemap.xml, robots.txt, semantic HTML5 landmarks, and WCAG AA accessibility contrast.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Typography**: `next/font/google` (Fraunces, Inter, IBM Plex Mono)
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## Project Structure

```
furqan-portfolio/
├── app/
│   ├── globals.css           # Theme tokens, paper ledger colors, typography
│   ├── layout.tsx            # Font variables, metadata, JSON-LD Person schema
│   ├── page.tsx              # Coordinated page layout & state
│   ├── opengraph-image.tsx   # Dynamic 1200x630 OG image generator
│   ├── sitemap.ts            # Dynamic XML sitemap
│   ├── robots.ts             # Search engine crawler configuration
│   └── icon.svg              # Typographic monogram "MFT" favicon
├── components/
│   ├── Navbar.tsx            # Sticky minimal nav, reading progress, dark mode toggle
│   ├── CommandPalette.tsx    # ⌘K / Ctrl+K modal with quick navigation & actions
│   ├── Hero.tsx              # Editorial hero & headline metrics with hover verification
│   ├── ImpactSection.tsx     # Process diagram & 45-row payroll ledger micro-animation
│   ├── ExperienceSection.tsx # Promotion timeline & 9 verified responsibility bullets
│   ├── SystemsSection.tsx    # Table-like index of HRMS, Office & Analytics tools
│   ├── CredentialsSection.tsx# Education & Certifications ledger with right-aligned years
│   ├── ContactSection.tsx    # Email, click-to-copy phone, LinkedIn, download CV
│   └── Footer.tsx            # Editorial ledger footer & local time indicator
├── lib/
│   └── content.ts            # Single typed source of truth for all content
└── public/
    ├── icon.svg              # Monogram SVG favicon
    └── Muhammad_Furqan_Tahir_CV.pdf # 1-Page Official CV
```

---

## How to Edit Content

All portfolio text, metrics, experiences, tools, credentials, and contact details are centralized in a single typed file:

📁 **`lib/content.ts`**

To update your content:
1. Open `lib/content.ts`.
2. Edit the relevant field (e.g., `personal.phone`, `headlineMetrics`, `experience.bullets`).
3. TypeScript will validate all data structures at build time.
4. Save and push to GitHub — Vercel will automatically deploy the changes.

---

## Local Development & Setup

### Prerequisites
- Node.js 18+ (tested with Node 20 / 22 / 24)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/furqan-ops/furqan-portfolio.git
cd furqan-portfolio

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

---

## Deployment to Vercel

This project is connected directly to the `furqan-ops/furqan-portfolio` GitHub repository on the `main` branch.

Every commit pushed to `main` triggers an automatic production build and deployment on Vercel.

To trigger a manual deployment using the Vercel CLI:
```bash
npx vercel --prod
```
