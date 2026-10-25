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
    summary: 'HR operations and administration professional experienced in payroll processing for 45 staff, attendance management, and executive reporting. Hands-on with ERPNext, Microsoft Office (Excel, Word, PowerPoint), and documentation in fast-paced environments.'
  },

  headlineMetrics: [
    {
      id: 'payroll',
      value: 45,
      suffix: '',
      label: 'Staff on Monthly Payroll',
      subtext: 'End-to-end processing in ERPNext & Excel',
      sourceBullet: 'Administered end-to-end payroll processing for 45 employees at Applivity, ensuring accurate salary computation and deductions.'
    },
    {
      id: 'attendance',
      value: 100,
      suffix: '%',
      label: 'Attendance & Leave Accuracy',
      subtext: 'Daily time tracking and leave records in ERPNext',
      sourceBullet: 'Managed daily attendance tracking, leave records, and absence reporting using ERPNext with 100% accuracy.'
    },
    {
      id: 'efficiency',
      value: 40,
      suffix: '%',
      label: 'Manual Workload Reduced',
      subtext: 'After ERPNext / Frappe HR module rollout',
      sourceBullet: 'Implemented ERPNext modules (attendance, leave policies, expense tracking, employee self-service), reducing manual HR workload by 40%.'
    }
  ] as Metric[],

  impactSteps: [
    {
      step: '01',
      title: 'Hiring Logistics',
      description: 'Interview scheduling, candidate communication, and onboarding handoffs.',
      metric: 'Coordination',
      linkedBulletId: 'b-recruitment'
    },
    {
      step: '02',
      title: 'Documentation',
      description: 'Offer letters, employment contracts, and employee file records.',
      metric: 'Contracts & Files',
      linkedBulletId: 'b-docs'
    },
    {
      step: '03',
      title: 'Payroll Run',
      description: 'Monthly salary computation, deductions, and disbursement records.',
      metric: '45 Staff',
      linkedBulletId: 'b-payroll'
    },
    {
      step: '04',
      title: 'Time & Leave',
      description: 'Daily attendance logs, leave balances, and policy tracking.',
      metric: '100% Accuracy',
      linkedBulletId: 'b-attendance'
    },
    {
      step: '05',
      title: 'Reporting',
      description: 'Headcount reports, expense tracking, and management review decks.',
      metric: 'Weekly Reports',
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
        highlight: 'Onboarding support, documentation, and personnel file management'
      },
      {
        role: 'Technical Recruiter',
        period: 'Jun 2024 – Aug 2024',
        status: 'completed',
        highlight: 'Candidate communication, interview scheduling, and hiring handoffs'
      },
      {
        role: 'HR Operations Specialist',
        period: 'Aug 2024 – Present',
        status: 'current',
        highlight: 'Payroll processing for 45 staff, ERPNext rollout, and executive support'
      }
    ] as PromotionStage[],

    bullets: [
      {
        id: 'b-payroll',
        category: 'payroll',
        text: 'Administered end-to-end payroll processing for 45 employees, ensuring accurate salary computation, deductions, and timely disbursements.',
        highlight: '45 employees'
      },
      {
        id: 'b-attendance',
        category: 'attendance',
        text: 'Managed daily attendance tracking, leave records, and absence reporting using ERPNext — maintained 100% accuracy in employee time records.',
        highlight: '100% accuracy'
      },
      {
        id: 'b-systems',
        category: 'systems',
        text: 'Implemented and configured ERPNext / Frappe HR modules for attendance, leave policies, expense tracking, and employee self-service, reducing manual processing time by 40%.',
        highlight: '40% time saved'
      },
      {
        id: 'b-docs',
        category: 'documentation',
        text: 'Prepared and issued official HR documentation in Microsoft Word, including offer letters, employment contracts, experience letters, and verification certificates.',
        highlight: 'Official contracts'
      },
      {
        id: 'b-compliance',
        category: 'compliance',
        text: 'Maintained and updated employee master records and HR databases, ensuring data integrity, strict confidentiality, and audit-readiness.',
        highlight: 'Master records'
      },
      {
        id: 'b-reports',
        category: 'reporting',
        text: 'Generated regular HR and operational reports in Microsoft Excel and PowerPoint on headcount, attendance trends, and leave utilization for senior management.',
        highlight: 'Management reports'
      },
      {
        id: 'b-leadership',
        category: 'leadership',
        text: 'Provided executive administrative support to leadership, managing calendars, organizing cross-functional meetings, and preparing agendas and minutes.',
        highlight: 'Calendar & meetings'
      },
      {
        id: 'b-finance',
        category: 'finance',
        text: 'Tracked, reconciled, and audited operational expenses, vendor invoices, and departmental supply requests in Microsoft Excel.',
        highlight: 'Invoices & expenses'
      },
      {
        id: 'b-recruitment',
        category: 'recruitment',
        text: 'Coordinated interview scheduling, candidate communications, and onboarding handoffs across departments.',
        highlight: 'Interview logistics'
      }
    ] as ExperienceBullet[]
  },

  tools: [
    {
      category: 'HRMS & Operations',
      description: 'Workforce records, attendance, and payroll modules',
      items: [
        { name: 'ERPNext / Frappe HR', useCase: 'Payroll processing, attendance rules, leave policies, and employee self-service portal' },
        { name: 'Zoho HRMS', useCase: 'Employee profiles and candidate stage tracking' },
        { name: 'OpenCATS', useCase: 'Applicant tracking and interview pipeline documentation' }
      ]
    },
    {
      category: 'Microsoft Office',
      description: 'Spreadsheets, official letters, and presentations',
      items: [
        { name: 'Microsoft Excel', useCase: 'XLOOKUP, pivot tables, payroll computation, and expense tracking' },
        { name: 'Microsoft Word', useCase: 'Offer letters, employment contracts, verification certificates, and meeting minutes' },
        { name: 'Microsoft PowerPoint', useCase: 'Operational reviews and management presentation decks' }
      ]
    },
    {
      category: 'Analytics & Workspace',
      description: 'Reporting dashboards and team collaboration',
      items: [
        { name: 'Microsoft Power BI', useCase: 'Data analytics and operational dashboards' },
        { name: 'Google Workspace', useCase: 'Docs, Sheets, Drive file management, and shared calendars' },
        { name: 'Slack & Microsoft Teams', useCase: 'Team communication and meeting coordination' }
      ]
    }
  ] as ToolCategory[],

  credentials: [
    {
      title: 'BSc Software Engineering',
      issuer: 'International Islamic University, Islamabad',
      year: '2019 – 2024',
      type: 'degree',
      gradeOrDetail: 'Graduated 2024'
    },
    {
      title: 'Human Resource Management',
      issuer: 'Great Learning',
      year: '2024',
      type: 'certification'
    },
    {
      title: 'Hiring & Onboarding Employees',
      issuer: 'Coursera',
      year: '2024',
      type: 'certification'
    },
    {
      title: 'Recruitment Skills',
      issuer: 'Oxford Home Study Center',
      year: '2024',
      type: 'certification'
    },
    {
      title: 'Microsoft Power BI Data Analytics',
      issuer: 'Microsoft Certified Course',
      year: '2024',
      type: 'certification'
    }
  ] as CredentialItem[],

  navSections: [
    { id: 'summary', number: '01', label: 'About' },
    { id: 'impact', number: '02', label: 'Workflow' },
    { id: 'experience', number: '03', label: 'Experience' },
    { id: 'systems', number: '04', label: 'Tools' },
    { id: 'credentials', number: '05', label: 'Education' },
    { id: 'contact', number: '06', label: 'Contact' }
  ]
}
