export interface Metric {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
  subtext: string
  sourceBullet: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
  metric: string
  linkedBulletId: string
}

export interface PromotionStage {
  role: string
  period: string
  status: 'current' | 'completed'
  highlight: string
}

export interface ExperienceBullet {
  id: string
  category: 'payroll' | 'attendance' | 'documentation' | 'compliance' | 'reporting' | 'leadership' | 'finance' | 'systems' | 'recruitment'
  text: string
  highlight?: string
}

export interface ToolCategory {
  category: string
  description: string
  items: {
    name: string
    proficiency: string
    useCase: string
  }[]
}

export interface CredentialItem {
  title: string
  issuer: string
  year: string
  type: 'degree' | 'certification'
  gradeOrDetail?: string
}

export const portfolioContent = {
  personal: {
    name: 'Muhammad Furqan Tahir',
    monogram: 'MFT',
    title: 'HR Operations & Executive Administration',
    location: 'Rawalpindi, Pakistan',
    email: 'furqantahir2222@gmail.com',
    phone: '+92 315 0727514',
    phoneDisplay: '+92 315 0727514',
    linkedIn: 'https://www.linkedin.com/in/muhammad-f-0862171a0/',
    linkedInHandle: 'linkedin.com/in/muhammad-f-0862171a0',
    cvUrl: '/Muhammad_Furqan_Tahir_CV.pdf',
    positioning: 'Managing people operations, executive reporting, and digital administration with precision, data integrity, and zero tolerance for error.',
    summary: 'Detail-oriented HR operations and administration professional with hands-on experience in payroll processing (45 staff), attendance management, and executive reporting. Proficient in Excel, Word, and PowerPoint; strong at managing competing priorities and keeping error-free documentation in fast-paced environments.'
  },

  headlineMetrics: [
    {
      id: 'payroll',
      value: 45,
      suffix: '',
      label: 'Employees on End-to-End Payroll',
      subtext: 'Reconciled monthly in ERPNext & Excel with zero disbursement errors',
      sourceBullet: 'Administered end-to-end payroll processing for 45 employees, ensuring accurate salary computation, deductions, and timely disbursements in compliance with company policy.'
    },
    {
      id: 'attendance',
      value: 100,
      suffix: '%',
      label: 'Attendance & Leave Record Accuracy',
      subtext: 'Maintained across daily time records, leave audits, and absence logging',
      sourceBullet: 'Managed daily attendance tracking, leave records, and absence reporting using ERPNext — maintained 100% accuracy in employee time and attendance data.'
    },
    {
      id: 'efficiency',
      value: 40,
      suffix: '%',
      label: 'Reduction in Manual Processing Time',
      subtext: 'Achieved through ERPNext / Frappe HR module implementation',
      sourceBullet: 'Led the end-to-end implementation and configuration of ERPNext / Frappe HR for the organization — reduced manual HR processing workload by 40%.'
    }
  ] as Metric[],

  impactSteps: [
    {
      step: '01',
      title: 'Hire',
      description: 'Candidate screening, interview scheduling, and evaluation across technical and business roles.',
      metric: '1,500+ Screened',
      linkedBulletId: 'b-recruitment'
    },
    {
      step: '02',
      title: 'Onboard',
      description: 'Offer letters, employment agreements, portal setup, and structured orientation handoffs.',
      metric: 'Audit Ready',
      linkedBulletId: 'b-docs'
    },
    {
      step: '03',
      title: 'Payroll',
      description: 'Monthly salary calculation, statutory deductions, overtime reconciliation, and disbursements.',
      metric: '45 Employees',
      linkedBulletId: 'b-payroll'
    },
    {
      step: '04',
      title: 'Attendance',
      description: 'Daily biometric & cloud time tracking, leave approvals, and absence compliance.',
      metric: '100% Accuracy',
      linkedBulletId: 'b-attendance'
    },
    {
      step: '05',
      title: 'Report',
      description: 'Headcount metrics, operational expenses, attrition trends, and executive slide decks for leadership.',
      metric: 'Weekly Cadence',
      linkedBulletId: 'b-reports'
    }
  ] as ProcessStep[],

  experience: {
    company: 'Applivity',
    location: 'Islamabad, Pakistan',
    currentRole: 'HR Operations Specialist',
    period: 'May 2024 – Present',
    workMode: 'On-site / Hybrid',
    progression: [
      {
        role: 'HR Intern',
        period: 'May 2024',
        status: 'completed',
        highlight: 'Onboarding support, record audits & personnel file organization'
      },
      {
        role: 'Technical Recruiter',
        period: 'Jun 2024 – Aug 2024',
        status: 'completed',
        highlight: 'Candidate pipeline management, interview logistics & hiring handoffs'
      },
      {
        role: 'HR Operations Specialist',
        period: 'Aug 2024 – Present',
        status: 'current',
        highlight: 'Full payroll ownership (45 staff), ERPNext rollout & executive administration'
      }
    ] as PromotionStage[],

    bullets: [
      {
        id: 'b-payroll',
        category: 'payroll',
        text: 'Administered end-to-end payroll processing for 45 employees, ensuring accurate salary computation, deductions, and timely disbursements in compliance with company policy.',
        highlight: '45 employees managed'
      },
      {
        id: 'b-attendance',
        category: 'attendance',
        text: 'Managed daily attendance tracking, leave records, and absence reporting using ERPNext — maintained 100% accuracy in employee time and attendance data.',
        highlight: '100% time record accuracy'
      },
      {
        id: 'b-docs',
        category: 'documentation',
        text: 'Prepared and issued a full range of official business and HR documentation in Microsoft Word, including offer letters, employment contracts, experience letters, and employment verification certificates.',
        highlight: 'Complete document lifecycle'
      },
      {
        id: 'b-compliance',
        category: 'compliance',
        text: 'Maintained and updated employee master records and HR databases, ensuring data integrity, strict confidentiality, and audit-readiness across all personnel files.',
        highlight: 'Continuous audit readiness'
      },
      {
        id: 'b-reports',
        category: 'reporting',
        text: 'Generated HR and operational reports in Microsoft Excel and PowerPoint on headcount, attendance trends, leave utilization, and attrition for senior management review.',
        highlight: 'Executive leadership reporting'
      },
      {
        id: 'b-leadership',
        category: 'leadership',
        text: 'Provided executive administrative support to department leadership, managing calendars, organizing cross-functional meetings, and preparing agendas and meeting minutes.',
        highlight: 'Executive calendar & meeting support'
      },
      {
        id: 'b-finance',
        category: 'finance',
        text: 'Tracked, reconciled, and audited operational expenses, vendor invoices, and departmental supply requests in Microsoft Excel.',
        highlight: 'Expense & invoice reconciliation'
      },
      {
        id: 'b-systems',
        category: 'systems',
        text: 'Led the end-to-end implementation and configuration of ERPNext / Frappe HR for the organization — set up modules covering attendance management, leave policies, expense tracking, and employee self-service portals, cutting manual processing time by 40%.',
        highlight: '40% manual time reduction'
      },
      {
        id: 'b-recruitment',
        category: 'recruitment',
        text: 'Coordinated interview scheduling, candidate communications, job requirements alignment, offer negotiations, and onboarding handoffs across departments.',
        highlight: 'Candidate-to-employee handoff'
      }
    ] as ExperienceBullet[]
  },

  tools: [
    {
      category: 'HRMS & Operational Systems',
      description: 'Workforce management, attendance tracking, and self-service portals',
      items: [
        { name: 'ERPNext / Frappe HR', proficiency: 'Advanced Implementation', useCase: 'Full attendance, leave rules, payroll processing & employee self-service' },
        { name: 'Zoho HRMS', proficiency: 'Operational', useCase: 'Candidate pipeline tracking & employee record coordination' },
        { name: 'OpenCATS', proficiency: 'Proficient', useCase: 'Applicant tracking & hiring stage documentation' }
      ]
    },
    {
      category: 'Microsoft Office Suite',
      description: 'Executive documentation, financial modeling, and leadership review decks',
      items: [
        { name: 'Microsoft Excel', proficiency: 'Advanced Modeling', useCase: 'XLOOKUP, VLOOKUP, pivot tables, payroll computation & expense auditing' },
        { name: 'Microsoft Word', proficiency: 'Executive Standard', useCase: 'Offer letters, employment contracts, formal memos & standard operating procedures' },
        { name: 'Microsoft PowerPoint', proficiency: 'Executive Standard', useCase: 'Monthly operational reviews, headcount analytics & leadership briefings' }
      ]
    },
    {
      category: 'Analytics & Workspace',
      description: 'Data reporting, communication dispatch, and file management',
      items: [
        { name: 'Microsoft Power BI', proficiency: 'Certified (DAX / Modeling)', useCase: 'Real-time operational dashboards & workforce analytics' },
        { name: 'Google Workspace', proficiency: 'Daily Workflow', useCase: 'Docs, Sheets, Drive archives & shared team calendars' },
        { name: 'Slack & Microsoft Teams', proficiency: 'Daily Workflow', useCase: 'Cross-functional operational triage & meeting coordination' }
      ]
    }
  ] as ToolCategory[],

  credentials: [
    {
      title: 'Bachelor of Science in Software Engineering',
      issuer: 'International Islamic University, Islamabad, Pakistan',
      year: '2019 – 2024',
      type: 'degree',
      gradeOrDetail: 'GPA: 3.0 / 4.0 • Focus on Database Systems, Information Architecture & Technical Documentation'
    },
    {
      title: 'Human Resource Management',
      issuer: 'Great Learning',
      year: '2024',
      type: 'certification',
      gradeOrDetail: 'Comprehensive HR Operations & Organizational Administration'
    },
    {
      title: 'Hiring & Onboarding Employees',
      issuer: 'Coursera',
      year: '2024',
      type: 'certification',
      gradeOrDetail: 'Employee Lifecycle, Compliance & Onboarding Architecture'
    },
    {
      title: 'Recruitment Skills',
      issuer: 'Oxford Home Study Center',
      year: '2024',
      type: 'certification',
      gradeOrDetail: 'Talent Acquisition, Candidate Evaluation & Interview Coordination'
    },
    {
      title: 'Microsoft Power BI Data Analytics',
      issuer: 'Microsoft Certified Professional Training',
      year: '2024',
      type: 'certification',
      gradeOrDetail: 'Data Modeling, DAX Calculations & Executive Dashboard Design'
    }
  ] as CredentialItem[],

  navSections: [
    { id: 'summary', number: '01', label: 'Summary' },
    { id: 'impact', number: '02', label: 'Impact' },
    { id: 'experience', number: '03', label: 'Experience' },
    { id: 'systems', number: '04', label: 'Systems' },
    { id: 'credentials', number: '05', label: 'Credentials' },
    { id: 'contact', number: '06', label: 'Contact' }
  ]
}
