import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery',
    duration: '1–3 weeks',
    summary: 'Understand the business before proposing the software.',
    detail:
      'We sit with the people who will use the thing. We map the current workflow including the workarounds, identify where the money and the hours actually go, and write down the constraints that will shape every later decision. Most projects fail here, quietly, by skipping it.',
    activities: [
      'Stakeholder and end-user interviews',
      'Current-state workflow and systems mapping',
      'Technical audit of existing code and infrastructure',
      'Risk, compliance and constraint register',
    ],
    deliverables: ['Discovery report', 'Prioritised opportunity map', 'Constraint and risk register'],
  },
  {
    index: '02',
    title: 'Strategy',
    duration: '1–2 weeks',
    summary: 'Decide what to build, in what order, and what not to build.',
    detail:
      'Scope is shaped against a delivery budget and a target architecture. We agree on the smallest thing that proves the hypothesis, the sequence that gets value into production earliest, and the explicit list of things we are deliberately not doing yet.',
    activities: [
      'Target architecture and integration strategy',
      'Scope shaping against budget and timeline',
      'Delivery plan with release milestones',
      'Success metrics and measurement plan',
    ],
    deliverables: ['Architecture decision records', 'Delivery roadmap', 'Agreed success metrics'],
  },
  {
    index: '03',
    title: 'UI/UX Design',
    duration: '2–6 weeks',
    summary: 'Design the system, including every state nobody demos.',
    detail:
      'Information architecture, flows and high-fidelity interface design across breakpoints — then the design system in code. Designers work in the same repository as engineers, so what gets signed off is what gets built, not an approximation of it.',
    activities: [
      'Information architecture and user flows',
      'Interface design across all breakpoints',
      'Design tokens and coded component library',
      'Prototype validation with real users',
    ],
    deliverables: ['Design system in code', 'Interactive prototype', 'Accessibility annotations'],
  },
  {
    index: '04',
    title: 'Development',
    duration: '6–24 weeks',
    summary: 'Two-week iterations, each ending in something deployable.',
    detail:
      'Trunk-based development behind feature flags, with continuous deployment to a staging environment from the first week. Every iteration closes with a demo of working software against real data, not a status document.',
    activities: [
      'Two-week iterations with a demo at each close',
      'Continuous integration with automated quality gates',
      'Code review on every change, no exceptions',
      'Instrumentation and observability from sprint one',
    ],
    deliverables: ['Working software each iteration', 'Living technical documentation', 'Decision log'],
  },
  {
    index: '05',
    title: 'Testing',
    duration: 'Continuous',
    summary: 'Automated throughout, adversarial before release.',
    detail:
      'Unit, integration, contract and end-to-end coverage runs on every pull request. Before a release we go adversarial: load testing to a multiple of expected peak, an accessibility audit with assistive technology, and a security review or external penetration test where the domain warrants it.',
    activities: [
      'Automated test suites gating every merge',
      'Load and soak testing against agreed SLOs',
      'Accessibility audit with real assistive technology',
      'Security review and penetration testing',
    ],
    deliverables: ['Test coverage and results report', 'Load test findings', 'Security assessment'],
  },
  {
    index: '06',
    title: 'Deployment',
    duration: '1–2 weeks',
    summary: 'Progressive rollout with an unremarkable rollback path.',
    detail:
      'Infrastructure is code, environments are reproducible, and releases go out as canary or blue-green rollouts driven by real SLO signals. Automatic rollback fires when the error budget burns. Nobody should need to be awake for a deploy.',
    activities: [
      'Production infrastructure provisioned via Terraform',
      'Progressive rollout with automated rollback',
      'Cutover or migration rehearsal',
      'Runbook writing and on-call handover',
    ],
    deliverables: ['Production environment', 'Operational runbooks', 'Rehearsed rollback plan'],
  },
  {
    index: '07',
    title: 'Support',
    duration: 'Ongoing',
    summary: 'Measured, improved, and handed over cleanly when you want it.',
    detail:
      'Post-launch we monitor against the success metrics agreed in strategy, run quarterly architecture and cost reviews, and keep dependencies current. When you want to bring it in-house, you get documentation and a real handover — the exit is designed in from the start.',
    activities: [
      'SLO monitoring and incident response',
      'Quarterly architecture and cloud-cost review',
      'Dependency and security patch management',
      'Roadmap iteration against measured outcomes',
    ],
    deliverables: ['Monthly performance reporting', 'Quarterly review', 'Handover documentation'],
  },
];

export const engagementModels = [
  {
    title: 'Product team',
    description:
      'A cross-functional squad — engineers, designer, delivery lead — embedded on your product for a quarter or more. The default for building something new.',
    fit: 'New products, major platform work',
  },
  {
    title: 'Fixed-scope build',
    description:
      'Defined scope, fixed price, agreed milestones. Works when discovery has already produced a clear specification and the boundaries are genuinely stable.',
    fit: 'Well-defined replatforms and integrations',
  },
  {
    title: 'Technical partnership',
    description:
      'Ongoing architecture, review and platform support alongside your in-house team. Senior capacity without the permanent headcount.',
    fit: 'Teams that need depth, not volume',
  },
];
