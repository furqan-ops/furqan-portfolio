'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronRight,
  Circle,
  Globe2,
  Mail,
  Moon,
  Phone,
  Sun,
  Workflow,
  X,
  Zap,
  Code2,
  Bot,
  Play,
  Check,
  Copy,
  Command,
  Search,
  Clock,
  Sparkles,
  Sliders,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Activity
} from 'lucide-react'

type Project = {
  title: string
  slug: string
  summary: string
  tags: string[]
  categories: string[]
  problem: string
  approach: string
  result: string
  metric: string
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    title: 'Enterprise RFP & Security Auto-Responder',
    slug: 'rfp-responder',
    summary: 'A cited RAG pipeline that drafts security questionnaire answers and routes low-confidence work.',
    tags: ['LangChain', 'LangGraph', 'FastAPI', 'Next.js'],
    categories: ['AI Agents'],
    problem: 'Security questionnaires slowed down enterprise sales cycles and pulled senior engineers into answering repetitive technical audits.',
    approach: 'Built a retrieval pipeline with hybrid search, source citations, confidence scoring, and a reviewer-ready UI for quick triage.',
    result: 'Answers arrive with verified context and clear escalation for low-confidence questions, reducing review overhead by 80%.',
    metric: 'Reduced questionnaire turnaround from 3 days to under 15 minutes.',
    liveUrl: 'https://rfp-frontend-psi.vercel.app',
    githubUrl: 'https://github.com/furqan-ops/rfp-frontend'
  },
  {
    title: 'Apex Dental WhatsApp AI Receptionist',
    slug: 'dental-receptionist',
    summary: '24/7 patient triage and booking over WhatsApp and web.',
    tags: ['Gemini', 'Next.js', 'Vercel'],
    categories: ['Automation'],
    problem: 'Patients needed quick answers outside office hours without adding front-desk overhead or leaving appointment slots open.',
    approach: 'Connected conversational AI triage to real-time calendar booking across WhatsApp Cloud API and a modern web portal.',
    result: 'A sub-5s first response that qualifies patient intent, answers clinic FAQs, and confirms bookings without human intervention.',
    metric: '24/7 autonomous triage handling patient inquiries with zero front-desk wait time.',
    liveUrl: 'https://apex-dental-clinic-theta.vercel.app',
    githubUrl: 'https://github.com/furqan-ops/apex-dental-clinic'
  },
  {
    title: 'Autonomous Lead Qualification Engine',
    slug: 'lead-engine',
    summary: 'An event-driven HubSpot pipeline with scoring and Slack alerts.',
    tags: ['n8n', 'HubSpot API', 'Python'],
    categories: ['RevOps'],
    problem: 'Sales teams lacked a shared signal for which incoming leads required urgent follow-up, causing delayed responses.',
    approach: 'Engineered an automated 0–100 ICP scoring model with real-time HubSpot webhooks and immediate Slack notification triggers.',
    result: 'Every inbound contact receives instant qualification and smart AE assignment within seconds of form submission.',
    metric: 'Achieved sub-minute speed-to-lead with 100% routing consistency across all channels.',
    liveUrl: 'https://revops-ai-revenue-automation.vercel.app',
    githubUrl: 'https://github.com/furqan-ops/revops-ai-revenue-automation'
  },
  {
    title: 'Multi-Agent Cost Governance Dashboard',
    slug: 'cost-dashboard',
    summary: 'Tracks latency, tokens, and spend across an AI agent cluster.',
    tags: ['Streamlit', 'Supabase', 'pgvector'],
    categories: ['AI Agents'],
    problem: 'Agent inference costs were hard to attribute across nested sub-agents, tool executions, and redundant queries.',
    approach: 'Centralized OpenTelemetry metrics into Supabase and implemented pgvector semantic caching for repeated query intent.',
    result: 'Granular visibility into cost-per-task and significant token savings on high-volume production agent runs.',
    metric: '40% reduction in repeat AI query costs via semantic caching.',
    githubUrl: 'https://github.com/furqan-ops/sentinelflow'
  },
  {
    title: 'SmartLead Engine',
    slug: 'smartlead',
    summary: 'A six-stage omnichannel lead pipeline with temperature-based routing.',
    tags: ['GoHighLevel', 'n8n'],
    categories: ['RevOps'],
    problem: 'High-volume leads entered across SMS, email, and social without unified qualification or follow-up cadence.',
    approach: 'Mapped lead intent temperature into dynamic GoHighLevel workflows with automated multi-channel re-engagement triggers.',
    result: 'A seamless automated progression from cold touchpoint to booked discovery call.',
    metric: '36-second speed-to-lead across a $36.1K active sales pipeline.',
    liveUrl: 'https://revops-ai-revenue-automation.vercel.app',
    githubUrl: 'https://github.com/furqan-ops/revops-ai-revenue-automation'
  },
  {
    title: 'Multi-Agent Dining Concierge',
    slug: 'dining-concierge',
    summary: 'Conversational reservations and dietary checks over text and voice.',
    tags: ['Next.js', 'Supabase', 'n8n', 'Web Speech API'],
    categories: ['AI Agents'],
    problem: 'Complex dining bookings require cross-checking dietary restrictions, party sizes, and live seating tables simultaneously.',
    approach: 'Orchestrated seven specialized LangGraph sub-agents to collaborate on availability, dietary safety, and booking confirmation.',
    result: 'Natural, multi-turn voice and text conversations that execute verified restaurant reservations in real time.',
    metric: 'Orchestrates 7 specialized agents to resolve multi-criteria bookings in a single flow.',
    liveUrl: 'https://multi-ai-agents-customer-support.vercel.app',
    githubUrl: 'https://github.com/furqan-ops/Multi-AI-Agents-Customer-Support'
  },
]

const skills = [
  ['Revenue Ops & CRM', 'HubSpot', 'GoHighLevel', 'Lead scoring'],
  ['Automation & AI', 'n8n', 'LangChain', 'LangGraph', 'Gemini', 'WhatsApp Cloud API', 'REST & webhooks'],
  ['Data & Google', 'Power BI', 'Google Apps Script', 'Sheets & Drive APIs', 'SQL'],
  ['Languages & Web', 'Python', 'TypeScript', 'JavaScript', 'Next.js', 'FastAPI', 'Supabase', 'Playwright', 'Selenium'],
]
const topSkills = new Set(['HubSpot', 'n8n', 'GoHighLevel', 'Python', 'LangGraph'])
const certifications = [
  ['▣', 'Microsoft Power BI Data Analytics', 'Microsoft'],
  ['⌘', 'n8n Workflow Automation', 'n8n', 'featured'],
  ['↗', 'GoHighLevel Workflow and API Architecture', 'GoHighLevel', 'featured'],
  ['✦', 'Claude 101 AI Fluency', 'Anthropic'],
]

const dynamicRoles = [
  'Engineer',
  'RevOps Architect',
  'Agent Developer',
  'n8n Specialist'
]

const defaultLiveEvents = [
  { time: '14:20:01', tag: 'WEBHOOK', tagClass: 'webhook', text: 'hubspot.deal_created ($36.1K ARR)' },
  { time: '14:20:02', tag: 'AGENT', tagClass: 'agent', text: 'LangGraph ICP Scoring: 94/100 · High Intent' },
  { time: '14:20:03', tag: 'SYNC', tagClass: 'crm', text: 'Enriched via Apollo & logged to HubSpot' },
  { time: '14:20:03', tag: 'DISPATCH', tagClass: 'success', text: 'Slack alert sent to Senior AE in 0.36s' },
  { time: '14:20:04', tag: 'STATUS', tagClass: 'success', text: 'Pipeline completed · 200 OK' },
]

const aiAssistantPrompts = [
  {
    id: 'resume',
    label: 'Applivity pipeline?',
    question: 'How did you cut manual resume entry by 75% at Applivity?',
    reply: 'Architected an automated n8n workflow listening on Google Drive uploads. It extracts candidate metadata, applies OCR parsing, and runs confidence scoring (>99% accuracy) before syncing records directly into Google Sheets across 5,000+ applicants.'
  },
  {
    id: 'speed',
    label: 'Speed-to-lead?',
    question: 'How does your 36-second RevOps speed-to-lead pipeline work?',
    reply: 'Inbound leads hit an n8n webhook, trigger instant ICP fit scoring (0–100), enrich firmographics via Apollo, update HubSpot lifecycle stages, and alert account executives on Slack with a pre-drafted context brief in under 40 seconds.'
  },
  {
    id: 'agents',
    label: 'AI Agent stack?',
    question: 'What stack do you use for production AI agents?',
    reply: 'I build with LangGraph and LangChain for stateful multi-agent graphs, FastAPI for robust API gateways, and Supabase pgvector semantic caching to reduce repeat LLM token consumption by 40%.'
  },
  {
    id: 'contracts',
    label: 'Availability?',
    question: 'Are you available for contract or freelance engineering?',
    reply: 'Yes! Currently open for high-impact automation and AI agent contracts. Based in Rawalpindi, Pakistan (PKT / UTC+5), with flexible overlap across US, UK, and EU business hours.'
  }
]

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (subIndex < currentWord.length) {
          setSubIndex((prev) => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2200)
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((prev) => prev - 1)
        } else {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 30 : 70)

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, index, words])

  return (
    <span className="typewriter-wrap">
      <span>{words[index].substring(0, subIndex)}</span>
      <span className="typewriter-caret">|</span>
    </span>
  )
}

function StatCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        const duration = 1600
        const startTime = performance.now()

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setVal(Math.floor(ease * target))

          if (progress < 1) {
            requestAnimationFrame(step)
          } else {
            setVal(target)
          }
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.15 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}
      {val >= 1000 ? val.toLocaleString() : val}
      {suffix}
    </span>
  )
}

function usePktTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now)
        setTime(formatted)
      } catch {
        setTime('12:00:00 AM')
      }
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return time || '12:00:00 AM'
}

function CopyEmailButton({ className = 'copy-email-btn' }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText('furqantahir2222@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }
  return (
    <button type="button" className={className} onClick={handleCopy} aria-label="Copy email address">
      {copied ? <Check /> : <Copy />}
      <span>{copied ? 'Copied to clipboard!' : 'Copy email'}</span>
    </button>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  )
}

/* 2026 Interactive ROI Savings Calculator */
function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(6)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyWage, setHourlyWage] = useState(45)

  const annualHoursLost = teamSize * hoursPerWeek * 50
  const annualHoursSaved = Math.round(annualHoursLost * 0.75)
  const annualDollarsSaved = annualHoursSaved * hourlyWage
  const speedMultiplier = 12

  return (
    <div className="roi-calculator">
      <div className="roi-controls">
        <div>
          <div className="bento-top-label" style={{ marginBottom: 12 }}>
            <Sliders style={{ width: 14, height: 14 }} />
            <span>INTERACTIVE ROI ESTIMATOR</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Calculate what manual operations cost your business
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6 }}>
            Adjust team size, weekly manual task hours, and blended hourly compensation to model the expected annual efficiency return.
          </p>
        </div>

        <div className="roi-slider-group">
          <div className="roi-slider-header">
            <span>Team members handling manual data / lead triage</span>
            <span className="roi-val">{teamSize} {teamSize === 1 ? 'person' : 'people'}</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="roi-slider"
            aria-label="Team members handling manual tasks"
          />
        </div>

        <div className="roi-slider-group">
          <div className="roi-slider-header">
            <span>Hours spent per person / week on repetitive tasks</span>
            <span className="roi-val">{hoursPerWeek} hrs / wk</span>
          </div>
          <input
            type="range"
            min={2}
            max={25}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="roi-slider"
            aria-label="Hours spent per person on manual workflows"
          />
        </div>

        <div className="roi-slider-group">
          <div className="roi-slider-header">
            <span>Blended hourly employee cost</span>
            <span className="roi-val">${hourlyWage} / hr</span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            className="roi-slider"
            aria-label="Blended hourly cost"
          />
        </div>
      </div>

      <div className="roi-results">
        <div className="roi-metric-highlight">
          <small>Estimated Annual Cost Savings</small>
          <strong>${annualDollarsSaved.toLocaleString()}</strong>
          <span>Based on a conservative 75% operational manual task reduction</span>
        </div>

        <div className="roi-breakdown-grid">
          <div className="roi-sub-stat">
            <b>{annualHoursSaved.toLocaleString()} hrs</b>
            <span>Reclaimed / year</span>
          </div>
          <div className="roi-sub-stat">
            <b>{speedMultiplier}x</b>
            <span>Turnaround boost</span>
          </div>
          <div className="roi-sub-stat">
            <b>&gt;99%</b>
            <span>Data accuracy</span>
          </div>
        </div>

        <a href="#contact" className="button button-primary roi-cta">
          Automate Your Operations <ArrowUpRight />
        </a>
      </div>
    </div>
  )
}

/* 2026 Before vs. After Workflow Comparison */
function BeforeAfterCompare() {
  return (
    <div className="compare-container">
      <div className="compare-col before">
        <div className="compare-col-header">
          <XCircle />
          <span>Before: Manual Operational Drag</span>
        </div>
        <div className="compare-list">
          <div className="compare-list-item">
            <XCircle style={{ color: '#ef4444' }} />
            <span><strong>Disjointed CRM Data:</strong> Leads sit in spreadsheets or form inboxes for 4–12 hours before triage.</span>
          </div>
          <div className="compare-list-item">
            <XCircle style={{ color: '#ef4444' }} />
            <span><strong>Human Entry Errors:</strong> Copy-pasting applicant details or billing records leads to missing contacts and duplicates.</span>
          </div>
          <div className="compare-list-item">
            <XCircle style={{ color: '#ef4444' }} />
            <span><strong>High Engineering Distraction:</strong> Senior staff pulled into repeatedly answering enterprise security questionnaires.</span>
          </div>
          <div className="compare-list-item">
            <XCircle style={{ color: '#ef4444' }} />
            <span><strong>Unchecked AI Spend:</strong> Redundant queries and unoptimized LLM calls burning runaway API budgets.</span>
          </div>
        </div>
      </div>

      <div className="compare-col after">
        <div className="compare-col-header">
          <CheckCircle2 />
          <span>After: Automated Self-Healing Flow</span>
        </div>
        <div className="compare-list">
          <div className="compare-list-item">
            <CheckCircle2 style={{ color: 'var(--olive)' }} />
            <span><strong>Sub-Minute Speed-to-Lead:</strong> Webhook triggers ICP scoring (0–100) and routes straight to AE Slack in &lt;40s.</span>
          </div>
          <div className="compare-list-item">
            <CheckCircle2 style={{ color: 'var(--olive)' }} />
            <span><strong>&gt;99% Data Accuracy:</strong> Automated extraction with confidence scoring flags unclear items for swift human triage.</span>
          </div>
          <div className="compare-list-item">
            <CheckCircle2 style={{ color: 'var(--olive)' }} />
            <span><strong>Autonomous Cited RAG:</strong> AI drafts verified RFP answers with exact source links in 15 minutes instead of 3 days.</span>
          </div>
          <div className="compare-list-item">
            <CheckCircle2 style={{ color: 'var(--olive)' }} />
            <span><strong>Semantic Cost Guardrails:</strong> pgvector semantic caching cuts repeat query costs by 40% with zero latency penalty.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 2026 Production SLA & System Health Monitor */
function SlaMonitor() {
  const metrics = [
    { title: 'Pipeline Availability', value: '99.98%', desc: 'Event-driven webhooks with dead-letter queue recovery' },
    { title: 'Median Router Latency', value: '< 0.38s', desc: 'n8n & FastAPI end-to-end execution speed' },
    { title: 'Extraction Precision', value: '> 99.2%', desc: 'Verified across 5,000+ candidate document parses' },
    { title: 'LLM Cost Efficiency', value: '40% Cut', desc: 'Semantic caching on repeat vector & agent queries' },
  ]

  return (
    <div className="sla-monitor">
      {metrics.map((m) => (
        <div key={m.title} className="sla-box">
          <div className="sla-box-top">
            <span>{m.title}</span>
            <span className="sla-dot-green" title="Operational" />
          </div>
          <strong>{m.value}</strong>
          <p>{m.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  const [dark, setDark] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [terminalTab, setTerminalTab] = useState<'code' | 'logs' | 'ask_ai'>('code')
  const [liveEventsList, setLiveEventsList] = useState(defaultLiveEvents)
  const [isSimulating, setIsSimulating] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cmdSearch, setCmdSearch] = useState('')
  const [selectedAiPrompt, setSelectedAiPrompt] = useState(aiAssistantPrompts[0])

  const pktTime = usePktTime()
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setCmdOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const runSimulation = () => {
    setTerminalTab('logs')
    setIsSimulating(true)
    setLiveEventsList([])

    const simSteps = [
      { time: '00:01', tag: 'WEBHOOK', tagClass: 'webhook', text: 'hubspot.deal_created ($42,500 Inbound Ingest)' },
      { time: '00:02', tag: 'AGENT', tagClass: 'agent', text: 'LangGraph: ICP Fit Score 96/100 · Tier-1 Priority' },
      { time: '00:03', tag: 'SYNC', tagClass: 'crm', text: 'Apollo company metadata enriched · CRM deal owner assigned' },
      { time: '00:04', tag: 'DISPATCH', tagClass: 'success', text: 'Slack #sales-alerts notified with deal brief (0.32s)' },
      { time: '00:04', tag: 'SUCCESS', tagClass: 'success', text: 'Event-driven pipeline completed · 200 OK' },
    ]

    simSteps.forEach((step, i) => {
      setTimeout(() => {
        setLiveEventsList((prev) => [...prev, step])
        if (i === simSteps.length - 1) {
          setIsSimulating(false)
        }
      }, (i + 1) * 550)
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const cmdItems = [
    { id: 'projects', title: 'Selected Projects & Case Studies', category: 'Navigation', icon: <Workflow />, action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'roi', title: 'ROI / Automation Savings Calculator', category: 'Navigation', icon: <Sliders />, action: () => { document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'experience', title: 'Work Experience at Applivity', category: 'Navigation', icon: <Code2 />, action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'skills', title: 'Toolkit & Tech Stack', category: 'Navigation', icon: <Zap />, action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'contact', title: 'Contact Information', category: 'Navigation', icon: <Mail />, action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'demo-rfp', title: 'Live Demo: Enterprise RFP Auto-Responder', category: 'Live Demos', icon: <Play />, action: () => { window.open('https://rfp-frontend-psi.vercel.app', '_blank'); setCmdOpen(false) } },
    { id: 'demo-dental', title: 'Live Demo: Apex Dental AI Receptionist', category: 'Live Demos', icon: <Play />, action: () => { window.open('https://apex-dental-clinic-theta.vercel.app', '_blank'); setCmdOpen(false) } },
    { id: 'demo-revops', title: 'Live Demo: Lead Qualification Engine', category: 'Live Demos', icon: <Play />, action: () => { window.open('https://revops-ai-revenue-automation.vercel.app', '_blank'); setCmdOpen(false) } },
    { id: 'sim', title: 'Run Live Terminal Simulation', category: 'Actions', icon: <Sparkles />, action: () => { runSimulation(); document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); setCmdOpen(false) } },
    { id: 'copy-email', title: 'Copy Email Address', category: 'Actions', icon: <Copy />, action: () => { navigator.clipboard.writeText('furqantahir2222@gmail.com'); setCmdOpen(false) } },
    { id: 'github', title: 'Open GitHub Profile (@furqan-ops)', category: 'Actions', icon: <Code2 />, action: () => { window.open('https://github.com/furqan-ops', '_blank'); setCmdOpen(false) } },
    { id: 'theme', title: 'Toggle Light / Dark Mode', category: 'Preferences', icon: <Moon />, action: () => { setDark((d) => !d); setCmdOpen(false) } },
  ]

  const filteredCmdItems = cmdSearch.trim() === ''
    ? cmdItems
    : cmdItems.filter((item) => item.title.toLowerCase().includes(cmdSearch.toLowerCase()) || item.category.toLowerCase().includes(cmdSearch.toLowerCase()))

  return (
    <div suppressHydrationWarning className={dark ? 'dark min-h-screen' : 'min-h-screen'}>
      <div className="site-shell">
        <div className="site-bg-grid" aria-hidden="true" />
        <div className="hero-glow-mesh" aria-hidden="true" />

        <header className="nav-wrap">
          <nav className="nav" aria-label="Main navigation">
            <a className="brand" href="#top">MFT<span>.</span></a>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#roi">ROI Calculator</a>
              <a href="#skills">Toolkit</a>
            </div>
            <div className="nav-actions">
              <button
                type="button"
                className="cmd-k-trigger"
                onClick={() => setCmdOpen(true)}
                title="Quick actions (⌘K / Ctrl+K)"
              >
                <Command /> <span>⌘K</span>
              </button>
              <button className="theme-toggle" aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>
                {dark ? <Sun /> : <Moon />}
              </button>
              <a className="nav-contact" href="#contact">Contact <ArrowUpRight /></a>
            </div>
          </nav>
        </header>

        <main id="top">
          <section className="hero section-pad">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-radar">
                  <span className="status-ping" />
                  <span className="status-dot" />
                </span>
                Available for automation projects
              </p>
              <h1>AI &amp; Automation<br /><em><Typewriter words={dynamicRoles} /></em></h1>
              <p className="hero-lede">AI systems and automated operations that remove manual work from growing businesses.</p>
              <p className="hero-revops">Specializing in RevOps pipelines, CRM architecture (HubSpot &amp; GoHighLevel), and autonomous AI agents that convert inbound signals into pipeline revenue.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">View Projects <ArrowUpRight /></a>
                <CopyEmailButton />
                <a className="button button-ghost" href="#contact">Contact Me <Mail /></a>
              </div>
            </div>

            <div className="terminal-wrapper">
              {/* Floating Integration Badges */}
              <div className="floating-badge badge-n8n" aria-hidden="true">
                <Workflow className="badge-icon" />
                <span>n8n Workflows</span>
              </div>
              <div className="floating-badge badge-hubspot" aria-hidden="true">
                <Globe2 className="badge-icon" />
                <span>HubSpot CRM</span>
              </div>
              <div className="floating-badge badge-zapier" aria-hidden="true">
                <Zap className="badge-icon" />
                <span>Zapier Hooks</span>
              </div>
              <div className="floating-badge badge-langgraph" aria-hidden="true">
                <Bot className="badge-icon" />
                <span>AI Agents</span>
              </div>

              <div className="terminal-card" aria-label="Terminal showing an automation workflow">
                <div className="terminal-top">
                  <span><Circle /><Circle /><Circle /></span>
                  <div className="terminal-tabs">
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'code' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('code')}
                    >
                      <Code2 /> pipeline.py
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'logs' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('logs')}
                    >
                      <Play /> live_events.log
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'ask_ai' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('ask_ai')}
                    >
                      <Bot /> Ask Furqan AI
                    </button>
                  </div>
                  {terminalTab === 'logs' && (
                    <button
                      type="button"
                      className="terminal-run-btn"
                      onClick={runSimulation}
                      disabled={isSimulating}
                      title="Run live automation simulation"
                    >
                      <Sparkles /> {isSimulating ? 'Running...' : 'Run Simulation'}
                    </button>
                  )}
                </div>

                {terminalTab === 'code' && (
                  <div className="terminal-body">
                    <p><span className="terminal-muted">01</span> <b>@webhook.on</b>(<i>&quot;hubspot.lead_created&quot;</i>)</p>
                    <p><span className="terminal-muted">02</span> <b>async def</b> <strong>route_deal</strong>(lead: Lead):</p>
                    <p className="indent"><span className="terminal-muted">03</span> score = <b>await</b> agent.qualify(lead)</p>
                    <p className="indent"><span className="terminal-muted">04</span> <b>if</b> score &gt;= <strong>80</strong>:</p>
                    <p className="indent" style={{ paddingLeft: '48px' }}><span className="terminal-muted">05</span> <b>return await</b> crm.dispatch(lead, <i>&quot;ae-priority&quot;</i>)</p>
                    <p className="terminal-muted cursor">_</p>
                  </div>
                )}

                {terminalTab === 'logs' && (
                  <div className="terminal-body terminal-logs">
                    {liveEventsList.map((evt, idx) => (
                      <div key={idx} className="terminal-log-row">
                        <span className="terminal-log-time">{evt.time}</span>
                        <span className={`terminal-log-tag ${evt.tagClass}`}>{evt.tag}</span>
                        <span className="terminal-log-text">{evt.text}</span>
                      </div>
                    ))}
                    <p className="terminal-muted cursor">_</p>
                  </div>
                )}

                {terminalTab === 'ask_ai' && (
                  <div className="terminal-body terminal-ai-wrap">
                    <div className="terminal-ai-prompts">
                      {aiAssistantPrompts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className={`terminal-ai-pill ${selectedAiPrompt.id === p.id ? 'active' : ''}`}
                          onClick={() => setSelectedAiPrompt(p)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <div className="terminal-ai-reply">
                      <p style={{ color: '#8aa51d', marginBottom: 6, fontWeight: 600 }}>
                        &gt; {selectedAiPrompt.question}
                      </p>
                      <p>{selectedAiPrompt.reply}</p>
                    </div>
                  </div>
                )}

                <div className="terminal-footer">
                  <Workflow /> n8n + HubSpot pipeline <span>•</span> <Zap /> 36s response
                </div>
              </div>
            </div>
          </section>

          <section className="stats section-pad">
            <div className="stats-grid">
              {[
                { target: 75, suffix: '%', label: 'Less manual entry.', context: 'Applivity resume pipeline (n8n).' },
                { target: 5000, suffix: '+', label: 'Applicants processed.', context: 'Through automated extraction.' },
                { target: 40, suffix: '%', label: 'Lower repeat AI query costs.', context: 'Through semantic caching.' },
                { target: 36, suffix: ' sec', label: 'Speed-to-lead.', context: 'On a $36.1K GoHighLevel pipeline.' },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.07}>
                  <div className="stat">
                    <strong><StatCounter target={item.target} suffix={item.suffix} /></strong>
                    <b>{item.label}</b>
                    <span>{item.context}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="about" className="section-pad about section-line">
            <Reveal><div className="section-kicker">01 / About</div></Reveal>
            <Reveal>
              <h2>Less busywork.<br /><span>More momentum.</span></h2>
            </Reveal>

            {/* Modern 2026 Bento Grid */}
            <div className="bento-grid">
              <Reveal delay={0.08}>
                <div className="bento-card bento-card-main">
                  <div className="bento-icon"><Zap /></div>
                  <h3>Systems that eliminate operational drag</h3>
                  <p>
                    Two years of engineering production automations at Applivity. Focused on transforming brittle manual spreadsheets and disconnected CRMs into self-healing, deterministic pipelines powered by n8n, Python, and autonomous AI agents.
                  </p>
                  <p>
                    Specializing in high-throughput webhook routing, CRM telemetry, and LangGraph multi-agent systems built around outcome-first business utility.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="bento-card bento-card-flow">
                  <div className="bento-top-label">
                    <Workflow />
                    <span>ARCHITECTURE BLUEPRINT</span>
                  </div>
                  <div className="flow-visual">
                    <div className="flow-node">Inbound Webhook</div>
                    <div className="flow-connector"><span className="flow-pulse" /></div>
                    <div className="flow-node highlight">n8n Router</div>
                    <div className="flow-connector"><span className="flow-pulse" /></div>
                    <div className="flow-node">LangGraph Agent</div>
                    <div className="flow-connector"><span className="flow-pulse" /></div>
                    <div className="flow-node">HubSpot / Slack</div>
                  </div>
                  <p className="flow-caption">Event-driven, sub-second execution with automated human-in-the-loop triage.</p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bento-card bento-card-clock">
                  <div className="bento-clock-header">
                    <span className="status-radar">
                      <span className="status-ping" />
                      <span className="status-dot" />
                    </span>
                    <span>LOCAL TIME &amp; AVAILABILITY</span>
                  </div>
                  <div className="bento-clock-time">{pktTime} <small>PKT (UTC+5)</small></div>
                  <p>Rawalpindi, Pakistan · Available for high-impact remote engineering contracts worldwide.</p>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="experience" className="section-pad section-line">
            <Reveal>
              <div className="section-kicker">02 / Experience</div>
              <div className="experience-item">
                <div className="experience-date">May 2024 — Present</div>
                <div>
                  <h3>Data Operations Analyst <span>(Automation and Data)</span></h3>
                  <p className="company">Applivity · Islamabad</p>
                  <ul>
                    <li>Built an n8n workflow that extracts candidate details from resumes in Google Drive into Google Sheets, cutting manual entry by <strong>75%</strong> across <strong>5,000+ applicants</strong>.</li>
                    <li>Added confidence scoring that flags unclear records for human review, keeping extraction accuracy <strong>above 99%</strong>.</li>
                    <li>Wrote Playwright scripts that register employee dependents on a benefits portal, <strong>removing manual form entry</strong>.</li>
                    <li>Built Python and Selenium scrapers that collect and clean contact leads from <strong>LinkedIn, Upwork, and job portals</strong>.</li>
                    <li>Replaced manual reporting with automated <strong>Power BI dashboards</strong> for hiring throughput and departmental expenses.</li>
                  </ul>
                  <div className="experience-subcard">
                    <div>
                      <h4>Cloud Attendance App</h4>
                      <p>Replaced paper timesheets for active staff with a cloud attendance web app, plus Admin and Employee portals for leave requests and automated monthly hour calculations.</p>
                    </div>
                    <button className="text-link" onClick={() => setAttendanceOpen(true)}>Details <ChevronRight /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="projects" className="section-pad section-line">
            <Reveal>
              <div className="section-heading">
                <div>
                  <div className="section-kicker">03 / Selected work</div>
                  <h2>Systems that<br /><span>do the work.</span></h2>
                </div>
                <p>Practical automation, built around the outcome first. Inspect live demos or browse GitHub source code.</p>
              </div>
            </Reveal>

            <div className="filter-bar" role="toolbar" aria-label="Filter projects">
              {['All', 'RevOps', 'AI Agents', 'Automation'].map((option) => (
                <button
                  key={option}
                  className={filter === option ? 'active' : ''}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className={`project-grid ${visibleProjects.length % 2 === 1 ? 'project-grid-single' : ''}`}>
              {visibleProjects.map((project, i) => (
                <Reveal key={project.title} delay={(i % 2) * 0.08}>
                  <article
                    className="project-card"
                    onClick={() => setSelected(project)}
                    onMouseMove={handleMouseMove}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
                  >
                    <div className="project-thumb">
                      <picture>
                        <source srcSet={`/projects/${project.slug}.webp`} type="image/webp" />
                        <img
                          src={`/projects/${project.slug}.png`}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={446}
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      </picture>
                      <span>{project.title}</span>
                    </div>

                    <div className="project-card-header">
                      <div className="project-number">0{i + 1}</div>
                      <span className={`category-pill ${project.categories[0].toLowerCase().replace(/\s+/g, '-')}`}>
                        {project.categories[0]}
                      </span>
                    </div>

                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {/* Direct Live Demo & GitHub pills */}
                    <div className="card-actions-row">
                      <div className="card-pills-wrap">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="card-action-btn live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Play style={{ width: 11, height: 11 }} /> Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="card-action-btn github"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Code2 style={{ width: 11, height: 11 }} /> Code
                          </a>
                        )}
                      </div>
                      <button className="text-link" onClick={(e) => { e.stopPropagation(); setSelected(project) }}>
                        Case study <ChevronRight />
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 2026 Interactive ROI Savings Calculator & Before/After */}
          <section id="roi" className="section-pad section-line">
            <Reveal>
              <div className="section-kicker">04 / Value &amp; ROI</div>
              <h2>Tangible return on<br /><span>system investment.</span></h2>
              <p style={{ color: 'var(--muted)', maxWidth: 540, marginTop: 8, fontSize: 15 }}>
                Automation isn&apos;t just code—it is operational capital that frees high-value employees to focus on revenue-generating work.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <RoiCalculator />
            </Reveal>

            <Reveal delay={0.14}>
              <BeforeAfterCompare />
            </Reveal>
          </section>

          <section className="section-pad credentials section-line">
            <div>
              <Reveal>
                <div className="section-kicker">05 / Credentials</div>
                <h2>Built on a solid<br /><span>foundation.</span></h2>
              </Reveal>
            </div>
            <div className="credentials-content">
              <div className="credential-grid">
                {certifications.map(([icon, name, issuer, featured]) => (
                  <Reveal key={name}>
                    <div className={`credential-card ${featured ? 'featured' : ''}`}>
                      <div className="credential-icon">{icon}</div>
                      <div>
                        <h3>{name}</h3>
                        <p>{issuer}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="education-card">
                <small>Education</small>
                <h3>Bachelor of Software Engineering</h3>
                <p>International Islamic University, Islamabad</p>
                <span>2019 — 2024</span>
              </div>

              {/* 2026 Production SLA Monitor */}
              <div style={{ marginTop: 24 }}>
                <div className="bento-top-label" style={{ marginBottom: 12 }}>
                  <Activity style={{ width: 13, height: 13 }} />
                  <span>PRODUCTION BENCHMARKS &amp; SLA</span>
                </div>
                <SlaMonitor />
              </div>
            </div>
          </section>

          <section id="skills" className="section-pad section-line">
            <Reveal>
              <div className="section-kicker">06 / Toolkit</div>
              <h2 className="skills-title">The stack behind<br /><span>the systems.</span></h2>
              <p className="skills-intro">Tools I use daily to build, monitor, and scale automated infrastructure.</p>
            </Reveal>
            <div className="skills-grid">
              {skills.map(([title, ...items], i) => (
                <Reveal key={title} delay={i * 0.07}>
                  <div className="skill-cluster">
                    <div className="skill-icon">
                      {i === 0 ? <Globe2 /> : i === 1 ? <Zap /> : i === 2 ? <Workflow /> : <Code2 />}
                    </div>
                    <h3>{title}</h3>
                    <div className="skill-list">
                      {items.map((item) => (
                        <span key={item}>
                          {topSkills.has(item) && <i className="skill-dot" />} {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="contact" className="contact section-pad">
            <Reveal>
              <div className="section-kicker">07 / Contact</div>
              <h2>Have a workflow<br /><em>worth fixing?</em></h2>
              <p>Tell me where time is getting lost. I’ll help map the next step.</p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:furqantahir2222@gmail.com"><Mail /> Email me</a>
                <CopyEmailButton />
                <a className="button button-ghost" href="https://github.com/furqan-ops" target="_blank" rel="noreferrer"><Code2 /> View GitHub</a>
              </div>
              <div className="contact-links">
                <a href="tel:+923150727514"><Phone /> +92 315 0727514</a>
                <a href="https://github.com/furqan-ops" target="_blank" rel="noreferrer"><Code2 /> github.com/furqan-ops</a>
              </div>
            </Reveal>
          </section>
        </main>

        <footer>
          <div>
            <a className="brand" href="#top">MFT<span>.</span></a>
            <p>AI &amp; Automation Engineer</p>
          </div>
          <div className="footer-right">
            <p>© 2026 Muhammad Furqan Tahir</p>
            <p>Built with Next.js <span>·</span> Rawalpindi, PK</p>
          </div>
        </footer>
      </div>

      {/* Case Study & Experience Modal */}
      <AnimatePresence>
        {(selected || attendanceOpen) && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSelected(null); setAttendanceOpen(false) }}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                type="button"
                className="modal-close"
                aria-label="Close details"
                onClick={() => { setSelected(null); setAttendanceOpen(false) }}
              >
                <X />
              </button>

              {selected ? (
                <>
                  <div className="section-kicker">Case study</div>
                  <h2 id="modal-title">{selected.title}</h2>
                  <div className="modal-thumb">
                    <picture>
                      <source srcSet={`/projects/${selected.slug}.webp`} type="image/webp" />
                      <img
                        src={`/projects/${selected.slug}.png`}
                        alt={selected.title}
                        width={800}
                        height={446}
                      />
                    </picture>
                  </div>
                  {selected.metric && (
                    <div className="modal-metric">
                      <Zap />
                      <div>
                        <strong>Key Impact</strong>
                        <p>{selected.metric}</p>
                      </div>
                    </div>
                  )}
                  <div className="modal-grid">
                    <div>
                      <small>Problem</small>
                      <p>{selected.problem}</p>
                    </div>
                    <div>
                      <small>Approach</small>
                      <p>{selected.approach}</p>
                    </div>
                    <div>
                      <small>Result</small>
                      <p>{selected.result}</p>
                    </div>
                  </div>
                  <div className="tags" style={{ marginTop: '24px' }}>
                    {selected.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {/* Direct Action Links in Modal */}
                  {(selected.liveUrl || selected.githubUrl) && (
                    <div className="modal-actions">
                      {selected.liveUrl && (
                        <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="button button-primary">
                          <ArrowUpRight /> Launch Live Demo
                        </a>
                      )}
                      {selected.githubUrl && (
                        <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="button button-ghost">
                          <Code2 /> View Source Code
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="section-kicker">Experience detail</div>
                  <h2 id="modal-title">Cloud Attendance App</h2>
                  <div className="modal-metric">
                    <Zap />
                    <div>
                      <strong>Key Impact</strong>
                      <p>Eliminated 100% of paper timesheet friction and manual month-end payroll reconciliation.</p>
                    </div>
                  </div>
                  <p className="modal-copy">
                    Architected and shipped a custom cloud attendance portal for active staff at Applivity. Features dedicated Admin and Employee portals for leave approvals, biometric logs, and automated monthly hour calculations directly exported into payroll.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2026 Command Palette Dialog (⌘K / Ctrl+K) */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            className="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              className="cmd-modal"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="cmd-search-wrap">
                <Search />
                <input
                  type="text"
                  className="cmd-search-input"
                  placeholder="Type a command or jump to section..."
                  value={cmdSearch}
                  onChange={(e) => setCmdSearch(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer' }}
                  onClick={() => setCmdOpen(false)}
                >
                  <X style={{ width: 16 }} />
                </button>
              </div>

              <div className="cmd-list">
                <div className="cmd-section-title">Quick Actions &amp; Navigation</div>
                {filteredCmdItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="cmd-item"
                    onClick={item.action}
                  >
                    <div className="cmd-item-left">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <span className="cmd-item-hint">{item.category}</span>
                  </button>
                ))}
                {filteredCmdItems.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                    No commands matching &ldquo;{cmdSearch}&rdquo;
                  </div>
                )}
              </div>

              <div className="cmd-footer">
                <span>Navigate &amp; Execute</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
