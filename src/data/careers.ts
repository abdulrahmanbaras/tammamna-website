import type { JobOpening } from '@/types';

export const openings: JobOpening[] = [
  {
    id: 'senior-react-engineer',
    title: 'Senior React Engineer',
    team: 'Product Engineering',
    location: 'Makkah / Remote (AST ±3)',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Lead the front-end of a client product from architecture through production, working directly with the people who will use it.',
    responsibilities: [
      'Own front-end architecture on one or two concurrent client products',
      'Design and maintain component systems shared between design and engineering',
      'Set and defend performance and accessibility budgets in CI',
      'Review code and mentor mid-level engineers on the team',
      'Take part in discovery workshops directly with client stakeholders',
    ],
    requirements: [
      '5+ years building production React applications',
      'Deep TypeScript — generics, inference, and knowing when to stop',
      'Demonstrable performance work: profiling, bundle analysis, Core Web Vitals',
      'Solid accessibility practice, tested with real assistive technology',
      'Comfortable speaking to non-technical stakeholders about trade-offs',
    ],
    niceToHave: ['Next.js App Router at scale', 'Design system authorship', 'Framer Motion or WebGL experience'],
  },
  {
    id: 'nodejs-engineer',
    title: 'Node.js Engineer',
    team: 'Platform Engineering',
    location: 'Makkah / Remote (AST ±3)',
    type: 'Full-time',
    level: 'Mid–Senior',
    summary:
      'Build the services behind our client platforms: typed APIs, event pipelines, and integrations with systems that were not designed to be integrated with.',
    responsibilities: [
      'Design and implement typed service APIs and their generated clients',
      'Build event-driven pipelines with idempotency and replay guarantees',
      'Model data and own migration strategy on PostgreSQL',
      'Instrument services for tracing, metrics and SLO alerting',
      'Participate in a shared, humane on-call rotation',
    ],
    requirements: [
      '4+ years of production Node.js and TypeScript',
      'Strong relational data modelling and query-performance instincts',
      'Experience with message queues or event streaming in production',
      'Testing discipline: contract tests, integration tests, meaningful coverage',
      'Ability to reason about failure modes before they happen',
    ],
    niceToHave: ['Kafka', 'gRPC', '.NET or Go exposure', 'Regulated-domain experience'],
  },
  {
    id: 'mobile-engineer',
    title: 'Mobile Engineer',
    team: 'Product Engineering',
    location: 'Remote (AST ±3)',
    type: 'Full-time',
    level: 'Mid–Senior',
    summary:
      'Ship React Native products with native modules where it counts, for users on real devices in real conditions.',
    responsibilities: [
      'Build and release cross-platform apps in React Native and TypeScript',
      'Write native modules in Swift or Kotlin where the platform requires it',
      'Design offline-first data layers and conflict-resolution strategies',
      'Own the release pipeline: signing, phased rollout, crash triage',
      'Profile and optimise on low-end Android, not just current iPhones',
    ],
    requirements: [
      '3+ years shipping React Native apps to both stores',
      'Working knowledge of at least one native platform (Swift or Kotlin)',
      'Experience with offline sync and local-first data',
      'Familiarity with Reanimated and the mobile performance model',
      'Comfort owning a release end to end',
    ],
    niceToHave: ['Expo EAS', 'Detox or Maestro', 'Health, finance or BLE domain work'],
  },
  {
    id: 'product-designer',
    title: 'UI/UX Designer',
    team: 'Design',
    location: 'Makkah / Hybrid',
    type: 'Full-time',
    level: 'Mid–Senior',
    summary:
      'Design products end to end — research through coded design system — embedded in the same repository as the engineers building them.',
    responsibilities: [
      'Run discovery research and turn findings into design decisions',
      'Design complete product flows across every breakpoint and state',
      'Author and maintain design tokens and component documentation',
      'Prototype interaction and motion, and validate it with users',
      'Pair with engineers during implementation rather than handing off',
    ],
    requirements: [
      '4+ years designing complex product interfaces, not marketing pages',
      'A portfolio showing empty, error and edge states — not just happy paths',
      'Systems thinking: tokens, components, documented composition rules',
      'Fluency in accessibility standards and how to design against them',
      'Comfortable reading code and working in Git',
    ],
    niceToHave: ['Front-end implementation ability', 'Motion design', 'Research moderation at depth'],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    team: 'Platform Engineering',
    location: 'Remote (AST ±3)',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Build the infrastructure and pipelines our client platforms run on, and make operating them uneventful.',
    responsibilities: [
      'Define every environment in Terraform, reproducible from empty',
      'Build CI/CD pipelines with progressive delivery and automated rollback',
      'Own observability: tracing, dashboards, SLOs and meaningful alerts',
      'Run cost reviews and right-sizing across client cloud accounts',
      'Lead incident response and write the postmortems',
    ],
    requirements: [
      '5+ years in platform, SRE or DevOps roles',
      'Deep Terraform and at least one major cloud (AWS or Azure)',
      'Kubernetes in production, plus the judgement to know when not to use it',
      'Strong scripting in Python, Go or TypeScript',
      'Security posture: secrets management, least privilege, supply chain',
    ],
    niceToHave: ['OpenTelemetry', 'FinOps experience', 'SOC 2 or ISO 27001 audit support'],
  },
];

export const benefits = [
  { title: 'Four-day fortnight of focus', description: 'Two protected no-meeting days every fortnight, company-wide. Deep work is scheduled, not hoped for.' },
  { title: 'Senior-weighted teams', description: 'We hire slowly and keep teams small. You will not be the only experienced person on your project.' },
  { title: 'Learning budget', description: 'SAR 12,000 and eight days a year for conferences, courses or a book habit nobody questions.' },
  { title: 'Remote-first, meeting-light', description: 'Written-first culture across AST ±3. Optional Makkah and Riyadh studios when you want a desk.' },
  { title: 'Humane on-call', description: 'Shared rotation, paid, with a hard rule: every page becomes a fix or a deleted alert.' },
  { title: 'Real equipment budget', description: 'The machine, desk and chair you actually want, refreshed on a three-year cycle.' },
  { title: '30 days leave', description: 'Plus local public holidays, and a genuine expectation that you take it.' },
  { title: 'Open-source Thursdays', description: 'One Thursday a month on open source, internal tooling, or the thing that has been annoying you.' },
];

export const culture = [
  {
    title: 'Written first',
    description:
      'Decisions live in documents, not in someone’s memory of a call. It makes us slower for an hour and faster for a year.',
  },
  {
    title: 'Disagreement is cheap here',
    description:
      'Push back on a senior engineer, a designer, or a client. Bring the reasoning. We would rather argue in week two than rebuild in month six.',
  },
  {
    title: 'You will talk to clients',
    description:
      'Every engineer sits in workshops and demos. Nobody translates the business for you, because context is what makes the work good.',
  },
  {
    title: 'Sustainable pace, genuinely',
    description:
      'No crunch culture. If a deadline needs heroics, the plan was wrong and we fix the plan.',
  },
];

export const hiringProcess = [
  { step: '01', title: 'Intro call', detail: '30 minutes with someone from the team you would join. Mutual, not a screening.' },
  { step: '02', title: 'Technical conversation', detail: '90 minutes reviewing real work — yours or ours. No whiteboard algorithms.' },
  { step: '03', title: 'Paid work session', detail: 'A half-day on a realistic problem, paid at our day rate. Optional if you prefer a deeper conversation.' },
  { step: '04', title: 'Team and offer', detail: 'Meet the wider team, ask everything, and get a decision within three working days.' },
];
