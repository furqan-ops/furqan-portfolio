import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { portfolioContent } from '@/lib/content'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = 'https://furqan-portfolio-brown-one.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioContent.personal.name} — ${portfolioContent.personal.title}`,
    template: `%s | ${portfolioContent.personal.name}`,
  },
  description: portfolioContent.personal.summary,
  authors: [{ name: portfolioContent.personal.name, url: portfolioContent.personal.linkedIn }],
  creator: portfolioContent.personal.name,
  keywords: [
    'Muhammad Furqan Tahir',
    'HR Operations',
    'Executive Administration',
    'Payroll Specialist',
    'ERPNext Specialist',
    'Frappe HR',
    'Attendance Management',
    'Executive Reporting',
    'Microsoft Excel Specialist',
    'Rawalpindi',
    'Islamabad'
  ],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${portfolioContent.personal.name} — ${portfolioContent.personal.title}`,
    description: portfolioContent.personal.summary,
    siteName: `${portfolioContent.personal.name} Portfolio`,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${portfolioContent.personal.name} — ${portfolioContent.personal.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioContent.personal.name} — ${portfolioContent.personal.title}`,
    description: portfolioContent.personal.summary,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F2EC' },
    { media: '(prefers-color-scheme: dark)', color: '#131415' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioContent.personal.name,
    jobTitle: portfolioContent.personal.title,
    email: `mailto:${portfolioContent.personal.email}`,
    telephone: portfolioContent.personal.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rawalpindi',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'International Islamic University, Islamabad',
    },
    sameAs: [portfolioContent.personal.linkedIn],
    description: portfolioContent.personal.summary,
    knowsAbout: [
      'HR Operations',
      'Payroll Processing',
      'ERPNext / Frappe HR',
      'Attendance & Leave Management',
      'Executive Administration',
      'Microsoft Excel Data Modeling',
      'Executive Reporting'
    ],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('furqan_theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
