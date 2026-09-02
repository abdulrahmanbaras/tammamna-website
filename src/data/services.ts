import {
  Blocks,
  BrainCircuit,
  CloudCog,
  Globe,
  PenTool,
  Smartphone,
} from 'lucide-react';
import type { Service, ServiceSlug } from '@/types';

export const services: Service[] = [
  {
    slug: 'web-development',
    index: '01',
    title: 'Web Development',
    short: 'Fast, accessible web platforms that hold up under real traffic.',
    tagline: 'Web platforms engineered for scale, speed and search.',
    icon: Globe,
    accent: ['#ff5fa2', '#c74bff'],
    overview: [
      'We build the web surface of your business: marketing sites that convert, customer portals that people actually log into, and internal tools your team stops complaining about.',
      'Every build starts from a performance budget and an accessibility target. Those numbers go into CI on day one, so a regression fails the pipeline instead of quietly shipping.',
    ],
    deliverables: [
      'Design-system-backed component library',
      'Server-rendered or statically generated front end',
      'Typed API layer and data-fetching strategy',
      'Automated Lighthouse, axe and visual-regression gates',
      'Analytics, consent management and SEO instrumentation',
      'Runbook and handover documentation',
    ],
    capabilities: [
      {
        title: 'Rendering strategy that fits the page',
        description:
          'Static where it can be, streamed server components where it should be, client-side only where interaction demands it. We pick per route, not per project.',
      },
      {
        title: 'Design systems, not page templates',
        description:
          'Tokens, primitives and documented composition rules so your team can build the twentieth page without calling us.',
      },
      {
        title: 'Core Web Vitals as a contract',
        description:
          'LCP under 2.0s on a mid-tier device over 4G, INP under 200ms, CLS effectively zero. Enforced in CI against real field data.',
      },
      {
        title: 'Accessibility to WCAG 2.2 AA',
        description:
          'Keyboard paths, focus management and screen-reader semantics tested with real assistive tech, not just an automated scan.',
      },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'Playwright'],
    metrics: [
      { value: '1.4s', label: 'Median LCP across shipped builds' },
      { value: '98', label: 'Average Lighthouse performance' },
      { value: '0', label: 'Known WCAG AA violations at launch' },
    ],
    relatedProjects: ['vaultline-treasury', 'orbit-commerce-cloud'],
  },
  {
    slug: 'mobile-development',
    index: '02',
    title: 'Mobile Development',
    short: 'iOS and Android products that feel native because they behave native.',
    tagline: 'Mobile apps built for the messy realities of real devices.',
    icon: Smartphone,
    accent: ['#c74bff', '#7b5cff'],
    overview: [
      'We ship cross-platform apps in React Native and native modules in Swift and Kotlin where the platform demands it — background location, secure enclaves, health data, offline-first sync.',
      'Store submission, phased rollout, crash triage and OTA updates are part of the engagement. An app that cannot be released safely is not finished.',
    ],
    deliverables: [
      'React Native application with typed navigation',
      'Native modules for platform-specific capability',
      'Offline-first data layer with conflict resolution',
      'Automated device-farm test matrix',
      'App Store and Play Console release pipeline',
      'Crash reporting, analytics and phased rollout config',
    ],
    capabilities: [
      {
        title: 'Offline-first by default',
        description:
          'Local-first storage with a documented sync and conflict-resolution model, so a lift with no signal is not a bug report.',
      },
      {
        title: 'Native where it counts',
        description:
          'Biometrics, secure keystores, background tasks, Bluetooth and camera pipelines written against the platform SDK, bridged cleanly.',
      },
      {
        title: '60fps interaction budget',
        description:
          'Animations on the UI thread via Reanimated, list virtualisation, and profiling on low-end Android — not just the newest iPhone.',
      },
      {
        title: 'Release engineering',
        description:
          'Fastlane pipelines, signed builds, staged rollout percentages and OTA hotfix paths for anything that does not need review.',
      },
    ],
    stack: [
      'React Native',
      'TypeScript',
      'Expo',
      'Flutter',
      'Swift',
      'Kotlin',
      'Reanimated',
      'Firebase',
      'Detox',
    ],
    metrics: [
      { value: '99.7%', label: 'Median crash-free session rate' },
      { value: '4.7★', label: 'Average store rating post-launch' },
      { value: '2 wks', label: 'Typical release cadence' },
    ],
    relatedProjects: ['meridian-care-companion', 'atlas-field'],
  },
  {
    slug: 'software-development',
    index: '03',
    title: 'Software Development',
    short: 'Backend systems, integrations and platforms that carry the business.',
    tagline: 'The systems your business runs on, built to be operated.',
    icon: Blocks,
    accent: ['#7b5cff', '#3d8bff'],
    overview: [
      'Custom platforms, workflow engines, integration layers and the unglamorous middleware that ties a company together. This is where most of our senior time goes.',
      'We work in domain boundaries, event-driven where it earns its keep, and relentlessly boring where it does not. Complexity is a cost you pay every month.',
    ],
    deliverables: [
      'Domain model and service boundary documentation',
      'Typed APIs (REST or GraphQL) with generated clients',
      'Event pipeline and idempotent message handling',
      'Migration strategy from legacy systems',
      'Load and soak test results against agreed SLOs',
      'Operational runbooks and on-call handover',
    ],
    capabilities: [
      {
        title: 'Domain-driven service design',
        description:
          'Boundaries drawn around business capability, not around team convenience. Fewer, better-defined services beat a fashionable mesh.',
      },
      {
        title: 'Legacy migration without a freeze',
        description:
          'Strangler-fig migrations behind a routing layer so the old system keeps earning while the new one takes over route by route.',
      },
      {
        title: 'Event-driven where it pays',
        description:
          'Outbox pattern, idempotency keys and replayable streams — so an at-least-once delivery guarantee does not become a double-charge incident.',
      },
      {
        title: 'Correctness you can test',
        description:
          'Property-based tests on core invariants, contract tests between services, and load tests that run before the traffic does.',
      },
    ],
    stack: ['Node.js', '.NET', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'Terraform'],
    metrics: [
      { value: '99.95%', label: 'Availability on platforms we operate' },
      { value: '<120ms', label: 'p95 API latency at target load' },
      { value: '0', label: 'Data-loss incidents to date' },
    ],
    relatedProjects: ['kestrel-risk-engine', 'bluefin-orchestrator'],
  },
  {
    slug: 'ui-ux',
    index: '04',
    title: 'UI/UX Design',
    short: 'Interface design grounded in research, delivered as a working system.',
    tagline: 'Product design that survives contact with engineering.',
    icon: PenTool,
    accent: ['#ffc8a2', '#ff5fa2'],
    overview: [
      'Research, information architecture, interaction design and a coded design system. Our designers work in the same repository as the engineers, so what gets approved is what gets built.',
      'We design the empty states, the error states, the 400-row table and the slow connection — the screens that decide whether a product feels considered.',
    ],
    deliverables: [
      'Discovery research and usability findings',
      'Information architecture and user flows',
      'High-fidelity interface design across breakpoints',
      'Design tokens and coded component library',
      'Prototype for validation and stakeholder sign-off',
      'Accessibility annotations and content guidelines',
    ],
    capabilities: [
      {
        title: 'Research with real users',
        description:
          'Moderated sessions, task success rates and a findings document that names the decisions it should change.',
      },
      {
        title: 'Systems, not screens',
        description:
          'Tokens for colour, type, spacing and motion, mapped one-to-one onto code. Design drift becomes a build failure.',
      },
      {
        title: 'Motion with intent',
        description:
          'Choreography that explains state change and spatial relationship. Every animation has to justify its milliseconds.',
      },
      {
        title: 'Designed for the edge cases',
        description:
          'Loading, empty, partial, error, offline and permission-denied. The states that make software feel finished.',
      },
    ],
    stack: ['Figma', 'Design tokens', 'Storybook', 'Framer Motion', 'React', 'Tailwind CSS'],
    metrics: [
      { value: '+34%', label: 'Median task-completion improvement' },
      { value: '6 wks', label: 'Typical discovery-to-system timeline' },
      { value: '100%', label: 'Components shipped as code' },
    ],
    relatedProjects: ['fernwood-portal', 'orbit-commerce-cloud'],
  },
  {
    slug: 'ai-solutions',
    index: '05',
    title: 'AI Solutions',
    short: 'Applied AI with evaluation, guardrails and a cost model attached.',
    tagline: 'AI features that pass review, not just a demo.',
    icon: BrainCircuit,
    accent: ['#8ef0c0', '#3d8bff'],
    overview: [
      'Retrieval systems over your own documents, agentic workflows that take real actions, document extraction, classification and forecasting — built with the evaluation harness that tells you whether any of it works.',
      'We start with the failure modes: hallucination, prompt injection, data leakage and unbounded spend. If those cannot be controlled for your use case, we say so before the budget is spent.',
    ],
    deliverables: [
      'Use-case assessment with a go / no-go recommendation',
      'Retrieval pipeline with chunking and re-ranking strategy',
      'Evaluation harness with a labelled golden dataset',
      'Guardrails: injection defence, PII redaction, spend caps',
      'Human-in-the-loop review interfaces',
      'Cost-per-request model and monitoring dashboards',
    ],
    capabilities: [
      {
        title: 'Retrieval that actually retrieves',
        description:
          'Hybrid search, semantic re-ranking and citation-backed answers, measured on recall@k against your own corpus rather than a public benchmark.',
      },
      {
        title: 'Evaluation before deployment',
        description:
          'A golden dataset, automated scoring and regression gates on every prompt or model change. No silent quality drift.',
      },
      {
        title: 'Guardrails and containment',
        description:
          'Injection-resistant prompt architecture, tool permission scoping, output validation and hard budget ceilings per tenant.',
      },
      {
        title: 'Humans in the loop',
        description:
          'Review queues, confidence thresholds and audit trails for anything that touches money, health or legal outcomes.',
      },
    ],
    stack: ['Python', 'OpenAI', 'Claude API', 'LangGraph', 'pgvector', 'Pinecone', 'FastAPI', 'Ray'],
    metrics: [
      { value: '92%', label: 'Answer accuracy on client golden sets' },
      { value: '−61%', label: 'Median cost per request after tuning' },
      { value: '100%', label: 'Responses with source citations' },
    ],
    relatedProjects: ['helix-research-copilot', 'kestrel-risk-engine'],
  },
  {
    slug: 'cloud-devops',
    index: '06',
    title: 'Cloud & DevOps',
    short: 'Infrastructure as code, pipelines that catch things, and calm on-call.',
    tagline: 'Platforms your team can deploy to on a Thursday.',
    icon: CloudCog,
    accent: ['#3d8bff', '#8ef0c0'],
    overview: [
      'We build and operate the infrastructure underneath everything else: reproducible environments, deployment pipelines with real gates, observability that answers questions, and cost that does not drift.',
      'The goal is unremarkable operations. Deploys are boring, rollbacks take one command, and alerts mean something is genuinely wrong.',
    ],
    deliverables: [
      'Terraform modules for every environment',
      'CI/CD pipelines with progressive delivery',
      'Container and Kubernetes topology, or serverless equivalent',
      'Observability stack: metrics, traces, logs, SLOs',
      'Disaster-recovery plan with a tested restore',
      'Cost baseline, budgets and anomaly alerting',
    ],
    capabilities: [
      {
        title: 'Reproducible environments',
        description:
          'Every environment defined in Terraform and rebuildable from an empty account. No hand-configured production.',
      },
      {
        title: 'Progressive delivery',
        description:
          'Canary and blue-green rollouts driven by real SLO signals, with automatic rollback when error budgets burn.',
      },
      {
        title: 'Observability that answers questions',
        description:
          'Distributed tracing, RED and USE dashboards, and alerts tied to user-visible symptoms rather than CPU graphs.',
      },
      {
        title: 'FinOps discipline',
        description:
          'Tagged spend, right-sizing reviews and anomaly detection. Most platforms we inherit are 30–50% over-provisioned.',
      },
    ],
    stack: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana', 'OpenTelemetry'],
    metrics: [
      { value: '14×', label: 'Median deploy-frequency increase' },
      { value: '−38%', label: 'Average cloud spend after review' },
      { value: '<9 min', label: 'Median lead time, commit to production' },
    ],
    relatedProjects: ['bluefin-orchestrator', 'vaultline-treasury'],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const serviceSlugs = services.map((service) => service.slug) as ServiceSlug[];
