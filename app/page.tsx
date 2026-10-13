'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Circle, Globe2, Mail, Moon, Phone, Sun, Workflow, X, Zap, Code2, Bot, Play, Check } from 'lucide-react'

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
    metric: 'Reduced questionnaire turnaround from 3 days to under 15 minutes.'
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
    metric: '24/7 autonomous triage handling patient inquiries with zero front-desk wait time.'
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
    metric: 'Achieved sub-minute speed-to-lead with 100% routing consistency across all channels.'
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
    metric: '40% reduction in repeat AI query costs via semantic caching.'
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
    metric: '36-second speed-to-lead across a $36.1K active sales pipeline.'
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
    metric: 'Orchestrates 7 specialized agents to resolve multi-criteria bookings in a single flow.'
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

const liveEvents = [
  { time: '14:20:01', tag: 'WEBHOOK', tagClass: 'webhook', text: 'hubspot.deal_created ($36.1K ARR)' },
  { time: '14:20:02', tag: 'AGENT', tagClass: 'agent', text: 'LangGraph ICP Scoring: 94/100 · High Intent' },
  { time: '14:20:03', tag: 'SYNC', tagClass: 'crm', text: 'Enriched via Apollo & logged to HubSpot' },
  { time: '14:20:03', tag: 'DISPATCH', tagClass: 'success', text: 'Slack alert sent to Senior AE in 0.36s' },
  { time: '14:20:04', tag: 'STATUS', tagClass: 'success', text: 'Pipeline completed · 200 OK' },
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

export default function Page() {
  const [dark, setDark] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [terminalTab, setTerminalTab] = useState<'code' | 'logs'>('code')

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter))

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div suppressHydrationWarning className={dark ? 'dark min-h-screen' : 'min-h-screen'}>
      <div className="site-shell">
        <header className="nav-wrap">
          <nav className="nav" aria-label="Main navigation">
            <a className="brand" href="#top">MFT<span>.</span></a>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
            </div>
            <div className="nav-actions">
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
                  </div>
                  <span className="terminal-live">● live</span>
                </div>

                {terminalTab === 'code' ? (
                  <div className="terminal-body">
                    <p><span className="terminal-muted">01</span> <b>@webhook.on</b>(<i>&quot;hubspot.lead_created&quot;</i>)</p>
                    <p><span className="terminal-muted">02</span> <b>async def</b> <strong>route_deal</strong>(lead: Lead):</p>
                    <p className="indent"><span className="terminal-muted">03</span> score = <b>await</b> agent.qualify(lead)</p>
                    <p className="indent"><span className="terminal-muted">04</span> <b>if</b> score &gt;= <strong>80</strong>:</p>
                    <p className="indent" style={{ paddingLeft: '48px' }}><span className="terminal-muted">05</span> <b>return await</b> crm.dispatch(lead, <i>&quot;ae-priority&quot;</i>)</p>
                    <p className="terminal-muted cursor">_</p>
                  </div>
                ) : (
                  <div className="terminal-body terminal-logs">
                    {liveEvents.map((evt, idx) => (
                      <div key={idx} className="terminal-log-row">
                        <span className="terminal-log-time">{evt.time}</span>
                        <span className={`terminal-log-tag ${evt.tagClass}`}>{evt.tag}</span>
                        <span className="terminal-log-text">{evt.text}</span>
                      </div>
                    ))}
                    <p className="terminal-muted cursor">_</p>
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
            <div className="about-grid">
              <Reveal>
                <h2>Less busywork.<br /><span>More momentum.</span></h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="about-copy">
                  <p>Two years of hands-on automation work at Applivity, focused on n8n, Python, and AI agents.</p>
                  <p>Currently building RevOps and AI systems that connect the right data, tools, and people.</p>
                  <p>Based in <b>Rawalpindi, Pakistan.</b></p>
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
                <p>Practical automation, built around the outcome first.</p>
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
                    <div className="project-number">0{i + 1}</div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button className="text-link" onClick={(e) => { e.stopPropagation(); setSelected(project) }}>
                      View case study <ChevronRight />
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="section-pad credentials section-line">
            <div>
              <Reveal>
                <div className="section-kicker">04 / Credentials</div>
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
            </div>
          </section>

          <section id="skills" className="section-pad section-line">
            <Reveal>
              <div className="section-kicker">05 / Toolkit</div>
              <h2 className="skills-title">The stack behind<br /><span>the systems.</span></h2>
              <p className="skills-intro">Tools I use daily to build and ship automation.</p>
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
              <div className="section-kicker">06 / Contact</div>
              <h2>Have a workflow<br /><em>worth fixing?</em></h2>
              <p>Tell me where time is getting lost. I’ll help map the next step.</p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:furqantahir2222@gmail.com"><Mail /> Email me</a>
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
    </div>
  )
}
