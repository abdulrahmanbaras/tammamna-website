import { Building2, HeartPulse, Landmark, ShoppingBag } from 'lucide-react';
import type { Industry } from '@/types';

export const industries: Industry[] = [
  {
    slug: 'fintech',
    name: 'FinTech',
    index: '01',
    icon: Landmark,
    accent: ['#ff5fa2', '#7b5cff'],
    headline: 'Money systems that are correct before they are fast.',
    description:
      'We build treasury platforms, risk engines, payment infrastructure and reporting systems for banks, funds and fintechs. In this domain a rounding error is an incident and an audit gap is an existential risk, so correctness, reproducibility and auditability come before everything else.',
    challenges: [
      'Reconciliation still performed manually across incompatible partner formats',
      'Approval workflows in email, with no enforceable segregation of duties',
      'Overnight batch cycles producing numbers that are stale on arrival',
      'Regulatory reporting assembled by hand under deadline pressure',
      'Legacy cores that cannot be replaced but must be integrated with',
    ],
    solutions: [
      {
        title: 'Canonical data models',
        description:
          'One internal representation with per-partner adapters, so a new banking relationship is an adapter rather than a rewrite.',
      },
      {
        title: 'Reproducible computation',
        description:
          'Immutable input snapshots and versioned models, so any published figure can be regenerated exactly on demand.',
      },
      {
        title: 'Policy-driven controls',
        description:
          'Configurable approval thresholds, four-eyes enforcement and hash-chained audit logs designed for external review.',
      },
      {
        title: 'Real-time positions',
        description:
          'Incremental recomputation on event arrival, replacing overnight batches with continuously current numbers.',
      },
    ],
    technologies: ['.NET', 'Node.js', 'Python', 'PostgreSQL', 'Kafka', 'Redis', 'Kubernetes', 'Terraform'],
    regulations: ['SAMA CSF', 'PCI DSS', 'SOC 2 Type II', 'PDPL', 'NCA ECC'],
    caseStudy: 'vaultline-treasury',
    stats: [
      { value: 'SAR 1.6B', label: 'Monthly volume on platforms we built' },
      { value: '3.8s', label: 'Full-book risk revaluation' },
      { value: '100%', label: 'Figures reproducible on demand' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    index: '02',
    icon: HeartPulse,
    accent: ['#8ef0c0', '#3d8bff'],
    headline: 'Clinical software where the edge case is a person.',
    description:
      'Patient-facing apps, clinician consoles, research tooling and the integration work that makes them talk to systems built in 1998. We treat safety, accessibility and privacy as engineering requirements with tests attached, not as a compliance checklist at the end.',
    challenges: [
      'Care gaps between appointments with no signal until readmission',
      'Data locked in systems that predate any usable integration standard',
      'Accessibility requirements for genuinely diverse patient populations',
      'PDPL and NPHIES obligations spanning every access path',
      'Clinician alert fatigue from thresholds tuned for a population, not a patient',
    ],
    solutions: [
      {
        title: 'Offline-first patient apps',
        description:
          'Local-first storage with documented conflict resolution, so care continues in a coverage gap.',
      },
      {
        title: 'Standards-based integration',
        description:
          'FHIR and HL7 adapters over legacy systems, normalising into a model your product can actually build on.',
      },
      {
        title: 'Trend-based clinical signals',
        description:
          'Risk scored against a personal baseline with explainable reasoning, tuned to protect against alert fatigue.',
      },
      {
        title: 'Accessibility as a requirement',
        description:
          'WCAG 2.2 AA, large-type modes and screen-reader paths validated with patients in the real age range.',
      },
    ],
    technologies: ['React Native', 'TypeScript', 'Python', 'PostgreSQL', 'Azure', 'FHIR', 'Docker', 'OpenTelemetry'],
    regulations: ['PDPL', 'SFDA', 'ISO 27001', 'IEC 62304', 'NPHIES'],
    caseStudy: 'meridian-care-companion',
    stats: [
      { value: '−31%', label: '30-day readmissions in our care platform' },
      { value: '14', label: 'Hospitals running our software' },
      { value: '2.4M', label: 'Research documents indexed' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    index: '03',
    icon: Building2,
    accent: ['#ffc8a2', '#8ef0c0'],
    headline: 'Property operations, digitised where it saves real hours.',
    description:
      'Resident portals, inspection tooling, portfolio analytics and the integration layers that unify a decade of accumulated property-management systems. The work is rarely glamorous; it is measured in hours returned to operations teams and calls that never get made.',
    challenges: [
      'Field work happening in basements and stairwells with no connectivity',
      'Portfolio data fragmented across four or more legacy systems',
      'Resident interactions defaulting to a phone line for routine requests',
      'Photo evidence in deposit disputes with no verifiable provenance',
      'Maintenance handled reactively with no condition trend data',
    ],
    solutions: [
      {
        title: 'Genuinely offline field tools',
        description:
          'Complete inspections without connectivity, with background sync and signed, bound photo evidence.',
      },
      {
        title: 'Ticket-led resident portals',
        description:
          'Journeys designed from the support-call log outward, which is what moves adoption past the usual ceiling.',
      },
      {
        title: 'Legacy integration layers',
        description:
          'Multiple back-office systems behind one stable API, with caching and graceful degradation.',
      },
      {
        title: 'Predictive maintenance',
        description:
          'Condition trends across the portfolio turning reactive repair into scheduled work.',
      },
    ],
    technologies: ['React Native', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Docker'],
    regulations: ['PDPL', 'Ejar tenancy rules', 'WCAG 2.2 AA', 'ISO 27001'],
    caseStudy: 'atlas-field',
    stats: [
      { value: '9,000', label: 'Units under our inspection tooling' },
      { value: '64%', label: 'Resident digital self-service reached' },
      { value: '−68%', label: 'Time per property inspection' },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    index: '04',
    icon: ShoppingBag,
    accent: ['#c74bff', '#ff5fa2'],
    headline: 'Storefronts and fulfilment that survive peak season.',
    description:
      'Headless replatforms, composable checkout, search and merchandising tooling, and the order orchestration behind them. Retail is where performance is directly measurable in revenue, so every millisecond has an owner.',
    challenges: [
      'Monolithic platforms where every merchandising change needs a developer',
      'Category pages taking many seconds to render on mid-tier mobile',
      'Infrastructure over-provisioned year-round for a two-week peak',
      'Replatforming risk on a storefront that cannot afford downtime',
      'Order routing logic buried in stored procedures nobody will touch',
    ],
    solutions: [
      {
        title: 'Zero-downtime replatforming',
        description:
          'Strangler-fig migration behind edge routing, moving route groups with per-route rollback.',
      },
      {
        title: 'Streamed personalisation',
        description:
          'Statically generated shells with live price, stock and recommendations hydrating in place.',
      },
      {
        title: 'Merchandiser-owned tooling',
        description:
          'Search ranking, boosts and campaign scheduling changeable without a deployment.',
      },
      {
        title: 'Observable order orchestration',
        description:
          'Event-driven routing with simulation mode and a full decision trace for every order.',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Kafka', 'Redis', 'AWS', 'GitHub Actions'],
    regulations: ['PCI DSS', 'PDPL', 'Saudi E-Commerce Law', 'WCAG 2.2 AA'],
    caseStudy: 'orbit-commerce-cloud',
    stats: [
      { value: '+27%', label: 'Mobile conversion after replatform' },
      { value: '9×', label: 'Peak traffic absorbed, no incident' },
      { value: '180k', label: 'Orders orchestrated per day' },
    ],
  },
];

export const industryBySlug = (slug: string): Industry | undefined =>
  industries.find((industry) => industry.slug === slug);
