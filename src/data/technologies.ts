import type { TechCategory, Technology } from '@/types';

export const techCategories: TechCategory[] = [
  'Frontend',
  'Backend',
  'Mobile',
  'Database',
  'Cloud',
  'DevOps',
  'AI',
];

export const categoryAccent: Record<TechCategory, [string, string]> = {
  Frontend: ['#ff5fa2', '#c74bff'],
  Backend: ['#7b5cff', '#3d8bff'],
  Mobile: ['#c74bff', '#7b5cff'],
  Database: ['#3d8bff', '#8ef0c0'],
  Cloud: ['#8ef0c0', '#3d8bff'],
  DevOps: ['#ffc8a2', '#ff5fa2'],
  AI: ['#c74bff', '#8ef0c0'],
};

export const categoryBlurb: Record<TechCategory, string> = {
  Frontend: 'Interfaces that stay fast on the devices your users actually own.',
  Backend: 'Services designed around domain boundaries and operated on purpose.',
  Mobile: 'Cross-platform where it fits, native where the platform demands it.',
  Database: 'Storage chosen for the access pattern, not for the résumé.',
  Cloud: 'Reproducible infrastructure defined entirely in code.',
  DevOps: 'Pipelines that catch problems earlier than production does.',
  AI: 'Applied models with evaluation, guardrails and a cost ceiling.',
};

export const technologies: Technology[] = [
  {
    name: 'React',
    category: 'Frontend',
    description:
      'Our default interface layer. Concurrent rendering, a component model our design system maps onto cleanly, and a hiring pool that keeps your product maintainable after we leave.',
    pairs: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description:
      'Used when a project needs per-route rendering strategy: static marketing pages, streamed server components for data-heavy views, and client rendering only where interaction requires it.',
    pairs: ['React', 'TypeScript', 'Vercel', 'PostgreSQL'],
    since: '2018',
    maturity: 'Core',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description:
      'Non-negotiable on every project. Types at every boundary — API, database, message queue — so integration mistakes fail at build time instead of at 3am.',
    pairs: ['React', 'Node.js', 'React Native', 'tRPC'],
    since: '2017',
    maturity: 'Core',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description:
      'Design tokens expressed directly in markup, which keeps the design system and the implementation from drifting apart over a two-year engagement.',
    pairs: ['React', 'Next.js', 'Framer Motion'],
    since: '2020',
    maturity: 'Core',
  },
  {
    name: 'Framer Motion',
    category: 'Frontend',
    description:
      'Declarative motion on transform and opacity only. Choreography that explains state change without dropping frames on a mid-tier device.',
    pairs: ['React', 'Tailwind CSS', 'Next.js'],
    since: '2021',
    maturity: 'Production',
  },
  {
    name: 'Vite',
    category: 'Frontend',
    description:
      'Build tooling for single-page applications and internal tools. Sub-second HMR matters more to delivery speed than most teams account for.',
    pairs: ['React', 'TypeScript', 'Vitest'],
    since: '2021',
    maturity: 'Core',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description:
      'Our default for I/O-bound services and API layers, sharing types end to end with the front end so the contract cannot silently diverge.',
    pairs: ['TypeScript', 'PostgreSQL', 'Redis', 'Kafka'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: '.NET',
    category: 'Backend',
    description:
      'Where throughput, numeric correctness and long-lived enterprise integration matter — risk engines, financial computation and systems that must run for a decade.',
    pairs: ['PostgreSQL', 'Kafka', 'Azure', 'Kubernetes'],
    since: '2017',
    maturity: 'Core',
  },
  {
    name: 'Python',
    category: 'Backend',
    description:
      'Data pipelines, model serving and anything living close to the ML ecosystem. Typed, packaged and deployed with the same rigour as our other services.',
    pairs: ['FastAPI', 'PostgreSQL', 'Ray', 'OpenAI'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    description:
      'Schema-first Python services with generated clients, used for model-serving and retrieval APIs where the contract must be explicit.',
    pairs: ['Python', 'pgvector', 'Claude API', 'Docker'],
    since: '2021',
    maturity: 'Production',
  },
  {
    name: 'Kafka',
    category: 'Backend',
    description:
      'Event backbone for systems that need replay and audit. Paired with the outbox pattern and idempotent handlers so at-least-once delivery is safe.',
    pairs: ['Node.js', '.NET', 'PostgreSQL', 'Kubernetes'],
    since: '2019',
    maturity: 'Production',
  },
  {
    name: 'gRPC',
    category: 'Backend',
    description:
      'Internal service-to-service contracts where latency and schema evolution matter more than browser reachability.',
    pairs: ['.NET', 'Node.js', 'Kubernetes', 'OpenTelemetry'],
    since: '2020',
    maturity: 'Production',
  },
  {
    name: 'React Native',
    category: 'Mobile',
    description:
      'One codebase for iOS and Android with native modules bridged in where the platform demands it. Animations run on the UI thread via Reanimated.',
    pairs: ['TypeScript', 'Expo', 'Swift', 'Kotlin'],
    since: '2018',
    maturity: 'Core',
  },
  {
    name: 'Expo',
    category: 'Mobile',
    description:
      'Managed builds, OTA updates and a device-testing pipeline that removes weeks of release engineering from a mobile project.',
    pairs: ['React Native', 'TypeScript', 'Firebase'],
    since: '2020',
    maturity: 'Production',
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    description:
      'Where a product needs one pixel-identical interface on both platforms, Flutter draws its own widgets instead of borrowing the system’s, so a heavily custom design stops fighting two sets of native defaults. We reach for it when the design is the differentiator; React Native stays the default otherwise.',
    pairs: ['Swift', 'Kotlin', 'Firebase'],
    since: '2021',
    maturity: 'Production',
  },
  {
    name: 'Swift',
    category: 'Mobile',
    description:
      'Native iOS modules for secure enclave access, background location, HealthKit and anything where the bridge would cost too much.',
    pairs: ['React Native', 'Flutter', 'Kotlin', 'Firebase'],
    since: '2018',
    maturity: 'Production',
  },
  {
    name: 'Kotlin',
    category: 'Mobile',
    description:
      'Native Android modules — background work, keystore, Bluetooth and camera pipelines — profiled on low-end hardware, not flagships.',
    pairs: ['React Native', 'Flutter', 'Swift', 'Firebase'],
    since: '2019',
    maturity: 'Production',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description:
      'Our default datastore. Strong transactional guarantees, JSONB where the schema is genuinely fluid, and extensions that cover far more ground than most teams assume.',
    pairs: ['Node.js', '.NET', 'pgvector', 'Redis'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: 'Redis',
    category: 'Database',
    description:
      'Caching, rate limiting, ephemeral state and queues. Used deliberately, with an explicit answer for what happens when it is cold.',
    pairs: ['Node.js', 'PostgreSQL', 'Kubernetes'],
    since: '2017',
    maturity: 'Core',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    description:
      'Chosen when the access pattern is genuinely document-shaped and the write model is aggregate-oriented — not as a default escape from schema design.',
    pairs: ['Node.js', 'TypeScript', 'AWS'],
    since: '2017',
    maturity: 'Production',
  },
  {
    name: 'pgvector',
    category: 'Database',
    description:
      'Vector search inside the database you already operate. For most retrieval workloads this removes an entire piece of infrastructure.',
    pairs: ['PostgreSQL', 'Python', 'Claude API', 'FastAPI'],
    since: '2023',
    maturity: 'Production',
  },
  {
    name: 'Pinecone',
    category: 'Database',
    description:
      'Managed vector search for corpora past the point where in-database indexes stop being the pragmatic answer.',
    pairs: ['Python', 'OpenAI', 'FastAPI'],
    since: '2023',
    maturity: 'Exploratory',
  },
  {
    name: 'AWS',
    category: 'Cloud',
    description:
      'Our most-used cloud. Every environment defined in Terraform and rebuildable from an empty account — no hand-configured production.',
    pairs: ['Terraform', 'Docker', 'Kubernetes', 'PostgreSQL'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: 'Azure',
    category: 'Cloud',
    description:
      'Common in healthcare and enterprise engagements, particularly where identity, compliance posture and .NET workloads already live there.',
    pairs: ['.NET', 'Terraform', 'Kubernetes'],
    since: '2018',
    maturity: 'Core',
  },
  {
    name: 'Vercel',
    category: 'Cloud',
    description:
      'Edge delivery for Next.js front ends where the operational simplicity is worth more than the control we give up.',
    pairs: ['Next.js', 'React', 'GitHub Actions'],
    since: '2020',
    maturity: 'Production',
  },
  {
    name: 'Docker',
    category: 'DevOps',
    description:
      'Reproducible builds from local development to production. Multi-stage, minimal base images, scanned in CI.',
    pairs: ['Kubernetes', 'GitHub Actions', 'Terraform'],
    since: '2016',
    maturity: 'Core',
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    description:
      'Used when the workload justifies it. Plenty of our platforms run happily on managed containers, and we say so rather than defaulting to a cluster.',
    pairs: ['Docker', 'Terraform', 'Grafana', 'OpenTelemetry'],
    since: '2019',
    maturity: 'Production',
  },
  {
    name: 'Terraform',
    category: 'DevOps',
    description:
      'Every environment as reviewed, versioned code. Infrastructure changes go through pull request like everything else.',
    pairs: ['AWS', 'Azure', 'Kubernetes', 'GitHub Actions'],
    since: '2018',
    maturity: 'Core',
  },
  {
    name: 'GitHub Actions',
    category: 'DevOps',
    description:
      'Build, test, scan, deploy. Performance budgets, accessibility checks and security scans are pipeline gates, not aspirations.',
    pairs: ['Docker', 'Terraform', 'Playwright', 'Vercel'],
    since: '2020',
    maturity: 'Core',
  },
  {
    name: 'OpenTelemetry',
    category: 'DevOps',
    description:
      'Vendor-neutral tracing, metrics and logs instrumented from the first sprint so the first incident is not also the first look inside.',
    pairs: ['Grafana', 'Kubernetes', 'Node.js', '.NET'],
    since: '2022',
    maturity: 'Production',
  },
  {
    name: 'Grafana',
    category: 'DevOps',
    description:
      'SLO dashboards and alerting tied to user-visible symptoms rather than infrastructure graphs nobody acts on.',
    pairs: ['OpenTelemetry', 'Kubernetes', 'Terraform'],
    since: '2020',
    maturity: 'Production',
  },
  {
    name: 'Playwright',
    category: 'DevOps',
    description:
      'End-to-end and visual-regression coverage across browsers, running on every pull request against a real deployed preview.',
    pairs: ['GitHub Actions', 'React', 'Next.js'],
    since: '2021',
    maturity: 'Core',
  },
  {
    name: 'OpenAI',
    category: 'AI',
    description:
      'Used for generation, extraction and embedding workloads, always behind an evaluation harness and a hard per-tenant spend ceiling.',
    pairs: ['Python', 'FastAPI', 'pgvector', 'Pinecone'],
    since: '2022',
    maturity: 'Production',
  },
  {
    name: 'Claude API',
    category: 'AI',
    description:
      'Our default for long-context reasoning, document analysis and tool-using agents where instruction-following discipline matters.',
    pairs: ['Python', 'FastAPI', 'LangGraph', 'pgvector'],
    since: '2023',
    maturity: 'Production',
  },
  {
    name: 'LangGraph',
    category: 'AI',
    description:
      'Explicit state machines for agentic workflows. When an agent takes real actions, the control flow needs to be inspectable and resumable.',
    pairs: ['Python', 'Claude API', 'FastAPI', 'Redis'],
    since: '2024',
    maturity: 'Exploratory',
  },
  {
    name: 'Ray',
    category: 'AI',
    description:
      'Distributed evaluation and batch inference — running a thousand-question golden set across model revisions without waiting a day for results.',
    pairs: ['Python', 'Kubernetes', 'AWS'],
    since: '2023',
    maturity: 'Exploratory',
  },
];

export const technologyByName = (name: string): Technology | undefined =>
  technologies.find((tech) => tech.name === name);
