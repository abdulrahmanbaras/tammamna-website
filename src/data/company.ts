export const company = {
  // Latinised with a double "m" to carry the Arabic shadda in تمَّمنا.
  name: 'Tammamna',
  legalName: 'Tammamna Software Engineering',
  tagline: 'Engineering studio for products that have to hold up.',
  founded: 2016,
  email: 'hello@tamamna.dev',
  salesEmail: 'newbusiness@tamamna.dev',
  careersEmail: 'careers@tamamna.dev',
  phone: '+966 12 555 0182',
  locations: [
    { city: 'Makkah', label: 'Al-Rusaifah District', role: 'HQ' },
    { city: 'Riyadh', label: 'Al-Olaya, King Fahd Road', role: 'Delivery' },
    { city: 'Jeddah', label: 'Al-Rawdah District', role: 'Delivery' },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
} as const;

export const metrics = [
  { value: 50, suffix: '+', label: 'Projects delivered', detail: 'Shipped to production since 2016' },
  { value: 20, suffix: '+', label: 'Engineers & designers', detail: 'Senior-weighted, no bench staffing' },
  { value: 12, suffix: '+', label: 'Industries served', detail: 'Regulated and high-scale domains' },
  { value: 98, suffix: '%', label: 'Client satisfaction', detail: 'Post-engagement CSAT, 3-year average' },
];

export const clientLogos = [
  'NORTHWIND',
  'Vaultline',
  'MERIDIAN HEALTH',
  'Kestrel Capital',
  'ATLAS PROPERTIES',
  'Orbit Retail',
  'HELIX LABS',
  'Bluefin Logistics',
  'CANTON BANK',
  'Fernwood',
];

export const whyUs = [
  {
    title: 'Engineering first',
    description:
      'Every engagement is led by a senior engineer who writes code on it. No account layer translating between you and the people building your product.',
  },
  {
    title: 'Architecture that scales',
    description:
      'We design for the load you will have in three years, not the demo you need next week — and we tell you honestly when that is over-engineering.',
  },
  {
    title: 'Modern, boring technology',
    description:
      'We adopt new tools once they earn it. Your stack should be exciting to use and unremarkable to operate at 3am.',
  },
  {
    title: 'Transparent communication',
    description:
      'Shared boards, weekly demos, and a written decision log. You always know what changed, what it cost, and what is next.',
  },
  {
    title: 'Security & quality built in',
    description:
      'Threat modelling in discovery, automated checks in CI, and independent review before release. Quality is a process, not a phase.',
  },
  {
    title: 'Long-term partnership',
    description:
      'Most of our clients are still with us after three years. We hand over clean code and documentation — staying is your choice, not a lock-in.',
  },
];

export const values = [
  {
    title: 'Say the hard thing early',
    description:
      'A difficult scope conversation in week two is cheaper than a rescue in month six. We flag risk while it is still cheap to fix.',
  },
  {
    title: 'Own the outcome',
    description:
      'We are not finished when the ticket closes. We are finished when the thing works in production for real users.',
  },
  {
    title: 'Craft is measurable',
    description:
      'Performance budgets, error rates, accessibility scores. If we call it quality, we can show you the number.',
  },
  {
    title: 'Leave it better documented',
    description:
      'The next engineer to open this repo may not be us. We write for them.',
  },
];

export const philosophy = [
  {
    title: 'Small teams, high trust',
    description:
      'Four to six people per product team. Enough to move in parallel, small enough that everyone holds the whole picture in their head.',
  },
  {
    title: 'Ship weekly, review continuously',
    description:
      'Trunk-based development, feature flags, and a deploy pipeline that runs on every merge. Big-bang releases are a failure of tooling.',
  },
  {
    title: 'Types at the boundaries',
    description:
      'Schemas at every edge — API, database, message queue. If it can be checked at build time, it should never be a runtime surprise.',
  },
  {
    title: 'Observability is a feature',
    description:
      'Tracing, structured logs, and SLOs land in the first sprint, not after the first incident.',
  },
];
