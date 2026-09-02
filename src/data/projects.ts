import type { Project, ProjectCategory } from '@/types';

export const projects: Project[] = [
  {
    slug: 'vaultline-treasury',
    name: 'Vaultline Treasury',
    client: 'Vaultline',
    industry: 'fintech',
    industryLabel: 'FinTech',
    categories: ['Web', 'Software'],
    year: '2024',
    span: 'wide',
    accent: ['#ff5fa2', '#7b5cff'],
    summary:
      'A multi-entity treasury platform moving SAR 1.6B a month across eleven banking partners.',
    description:
      'Vaultline gives mid-market finance teams a single view of cash across every entity, currency and banking relationship they hold — and the controls to move it safely.',
    challenge: [
      'Finance teams were reconciling eleven bank portals by hand into a spreadsheet that four people had edit rights to. Cash positions were, at best, a day stale.',
      'Payment approvals lived in email. There was no enforceable segregation of duties and no audit trail an auditor would accept.',
      'An earlier vendor build had stalled: the integration layer could not handle bank statement formats that varied per partner and, occasionally, per file.',
    ],
    solution: [
      'We rebuilt the ingestion layer as a normalising pipeline — every statement format is parsed into one canonical transaction model, with per-partner adapters and a quarantine queue for anything that fails validation.',
      'Payment initiation runs through a policy engine with configurable approval thresholds, hard segregation of duties, and an append-only audit log backed by hash chaining.',
      'The front end is a real-time position dashboard: server-streamed balances, an FX exposure view, and cash-forecast scenarios that recompute client-side as you drag assumptions.',
    ],
    features: [
      { title: 'Unified cash position', description: 'Real-time balances across entities, currencies and partners, reconciled continuously rather than nightly.' },
      { title: 'Policy-driven approvals', description: 'Threshold-based routing, four-eyes enforcement and delegation rules that survive an audit.' },
      { title: 'Scenario forecasting', description: 'Drag-to-adjust cash forecasting with instant recalculation over an 18-month horizon.' },
      { title: 'Immutable audit trail', description: 'Hash-chained event log with export packs generated for external auditors on demand.' },
      { title: 'FX exposure monitor', description: 'Live currency exposure with configurable hedging alerts per entity.' },
      { title: 'Partner adapters', description: 'Eleven bank integrations behind one canonical model, each independently versioned and testable.' },
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'AWS', 'Terraform'],
    results: [
      { value: 'SAR 1.6B', label: 'Monthly volume processed' },
      { value: '−94%', label: 'Time spent on reconciliation' },
      { value: '99.98%', label: 'Platform availability' },
      { value: '11', label: 'Banking partners integrated' },
    ],
    process: [
      { phase: 'Discovery', detail: 'Four weeks embedded with the treasury team, mapping every manual step and its failure modes.' },
      { phase: 'Architecture', detail: 'Canonical transaction model and adapter contract agreed before a line of integration code.' },
      { phase: 'Build', detail: 'Nine two-week iterations, each ending in a demo against real anonymised bank files.' },
      { phase: 'Hardening', detail: 'External penetration test, load testing to 6× peak, and a full DR restore rehearsal.' },
      { phase: 'Rollout', detail: 'Entity-by-entity migration running in parallel with the spreadsheet for two close cycles.' },
    ],
    screens: [
      { label: 'Position dashboard', caption: 'Consolidated cash across entities, streamed live.' },
      { label: 'Approval queue', caption: 'Policy-routed payments with four-eyes enforcement.' },
      { label: 'Forecast scenarios', caption: 'Client-side recalculation over an 18-month horizon.' },
      { label: 'Audit export', caption: 'Hash-chained event history, auditor-ready.' },
    ],
    testimonial: {
      quote:
        'The previous build failed because nobody wanted to own the messy part. Tammamna started with the messy part. Month-end went from four days to four hours.',
      name: 'Reem Al-Suwailem',
      role: 'Group Treasurer, Vaultline',
    },
  },
  {
    slug: 'meridian-care-companion',
    name: 'Care Companion',
    client: 'Meridian Health',
    industry: 'healthcare',
    industryLabel: 'Healthcare',
    categories: ['Mobile', 'AI'],
    year: '2024',
    span: 'tall',
    accent: ['#8ef0c0', '#3d8bff'],
    summary:
      'A post-discharge care app that cut 30-day readmissions across a 14-hospital network.',
    description:
      'Care Companion follows patients from discharge through recovery: medication schedules, symptom check-ins, escalation to a clinician, and a care-team view that flags deterioration early.',
    challenge: [
      'Patients left hospital with a printed care plan and no follow-up until something went wrong badly enough for an ambulance.',
      'Care coordinators had no signal between appointments. Deterioration was discovered at readmission, not before it.',
      'Anything built had to work offline in rural coverage gaps, and had to satisfy PDPL plus the network’s own security review.',
    ],
    solution: [
      'An offline-first React Native app with a local-first data store and a documented conflict-resolution model — check-ins recorded on a farm with no bars sync cleanly the next morning.',
      'A triage model scores each check-in against the patient’s baseline and escalates on trend, not on a single reading. Every escalation carries the reasoning and the underlying data points.',
      'A clinician console prioritises the caseload by risk, with a full audit trail of who viewed what and when.',
    ],
    features: [
      { title: 'Offline-first check-ins', description: 'Symptom and medication logging with reliable sync and conflict resolution.' },
      { title: 'Trend-based escalation', description: 'Risk scoring against a personal baseline rather than population thresholds.' },
      { title: 'Medication scheduling', description: 'Adherence tracking with native reminders and caregiver visibility.' },
      { title: 'Clinician console', description: 'Risk-ranked caseload with drill-down into the data behind every flag.' },
      { title: 'Accessible by design', description: 'Large-type mode, full VoiceOver and TalkBack support, tested with patients over 70.' },
      { title: 'PDPL-grade audit', description: 'Every record access logged, retained and reportable.' },
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'Swift', 'Kotlin', 'Python', 'PostgreSQL', 'Azure', 'FHIR'],
    results: [
      { value: '−31%', label: '30-day readmission rate' },
      { value: '82%', label: 'Daily check-in adherence' },
      { value: '14', label: 'Hospitals live' },
      { value: '4.8★', label: 'Average store rating' },
    ],
    process: [
      { phase: 'Discovery', detail: 'Shadowed discharge rounds and interviewed 22 patients and coordinators.' },
      { phase: 'Design', detail: 'Accessibility-led prototypes validated with patients aged 61–88.' },
      { phase: 'Build', detail: 'Parallel mobile and clinical console tracks over six months.' },
      { phase: 'Validation', detail: 'Clinical safety case, PDPL review and a 3-hospital pilot before network rollout.' },
      { phase: 'Support', detail: 'Ongoing model monitoring with quarterly clinical review of escalation quality.' },
    ],
    screens: [
      { label: 'Daily check-in', caption: 'Three taps, works with no connection.' },
      { label: 'Medication plan', caption: 'Adherence tracking with caregiver visibility.' },
      { label: 'Clinician caseload', caption: 'Risk-ranked, with reasoning attached.' },
      { label: 'Escalation detail', caption: 'Every flag traceable to its underlying readings.' },
    ],
    testimonial: {
      quote:
        'They pushed back on our first triage design because it would have alarm-fatigued the coordinators within a fortnight. They were right, and they brought data.',
      name: 'Dr. Hind Al-Zahrani',
      role: 'Director of Digital Care, Meridian Health',
    },
  },
  {
    slug: 'orbit-commerce-cloud',
    name: 'Orbit Commerce Cloud',
    client: 'Orbit Retail',
    industry: 'ecommerce',
    industryLabel: 'E-commerce',
    categories: ['Web', 'E-commerce'],
    year: '2023',
    span: 'standard',
    accent: ['#ffc8a2', '#ff5fa2'],
    summary:
      'A headless replatform for a 40,000-SKU retailer, live in nine months with zero downtime.',
    description:
      'Orbit moved off a monolithic commerce suite onto a composable stack: headless storefront, dedicated search, and a product-data service the merchandising team can actually operate.',
    challenge: [
      'The legacy platform took eleven seconds to render a category page on mobile, and every merchandising change required a developer.',
      'Peak-season traffic required over-provisioning the entire monolith for two weeks a year.',
      'A hard cutover was unacceptable — the store does SAR 8M a week and could not go dark.',
    ],
    solution: [
      'We ran a strangler-fig migration behind an edge router, moving route groups one at a time with instant rollback per route.',
      'The storefront is statically generated with incremental revalidation and streamed personalisation, so the shell renders immediately and price and stock hydrate in place.',
      'Search moved to a dedicated engine with merchandising rules exposed through an internal console — the merchandising team now ships their own campaigns.',
    ],
    features: [
      { title: 'Route-by-route migration', description: 'Edge routing with per-route rollback, so no cutover was ever all-or-nothing.' },
      { title: 'Streamed personalisation', description: 'Static shell with live price, stock and recommendation hydration.' },
      { title: 'Merchandising console', description: 'Search ranking, boosts and campaign scheduling without a deployment.' },
      { title: 'Composable checkout', description: 'Payment, tax and fraud providers behind one stable internal interface.' },
      { title: 'Peak-ready infrastructure', description: 'Edge-cached catalogue that absorbed Black Friday at 9× baseline traffic.' },
      { title: 'Unified product data', description: 'One service feeding storefront, search, feeds and in-store screens.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GitHub Actions'],
    results: [
      { value: '1.2s', label: 'Median mobile LCP, from 11s' },
      { value: '+27%', label: 'Mobile conversion rate' },
      { value: '9×', label: 'Peak traffic absorbed without incident' },
      { value: '0', label: 'Minutes of downtime during migration' },
    ],
    process: [
      { phase: 'Audit', detail: 'Full performance and architecture audit of the existing monolith.' },
      { phase: 'Foundation', detail: 'Design system, product-data service and edge routing built first.' },
      { phase: 'Migration', detail: 'Route groups migrated over seven months with per-route rollback.' },
      { phase: 'Peak readiness', detail: 'Load testing to 12× baseline ahead of the Black Friday window.' },
      { phase: 'Handover', detail: 'Merchandising and platform training, with Orbit’s team owning releases by month nine.' },
    ],
    screens: [
      { label: 'Category page', caption: 'Statically generated, personalised on hydration.' },
      { label: 'Product detail', caption: 'Live stock and pricing streamed into a cached shell.' },
      { label: 'Merch console', caption: 'Ranking and campaigns without a deploy.' },
      { label: 'Checkout', caption: 'Composable providers behind a stable interface.' },
    ],
    testimonial: {
      quote:
        'Nine months, no downtime, and my merchandising team stopped filing tickets to change a banner. That last part changed how we work.',
      name: 'Khalid Al-Mutairi',
      role: 'VP Digital Transformation, Orbit Retail',
    },
  },
  {
    slug: 'helix-research-copilot',
    name: 'Research Copilot',
    client: 'Helix Labs',
    industry: 'healthcare',
    industryLabel: 'Life Sciences',
    categories: ['AI', 'Web'],
    year: '2025',
    span: 'wide',
    accent: ['#c74bff', '#3d8bff'],
    summary:
      'A citation-grounded research assistant over 2.4 million internal documents.',
    description:
      'Helix scientists were losing days to literature and internal-report search. Research Copilot answers in context, cites every claim, and refuses to answer when the corpus does not support it.',
    challenge: [
      'Twenty years of protocols, assay results and regulatory correspondence sat across four systems with incompatible search.',
      'An off-the-shelf assistant had been trialled and abandoned: it produced fluent answers with invented citations, which in a regulated lab is worse than no answer at all.',
      'Nothing could leave the tenant boundary, and every access had to be attributable.',
    ],
    solution: [
      'A hybrid retrieval pipeline — lexical plus dense vectors with a cross-encoder re-ranker — tuned against a 900-question golden set built with Helix scientists.',
      'Answers are constrained to retrieved context with span-level citations. Below a confidence threshold the system declines and offers the source documents instead.',
      'The evaluation harness runs on every prompt, model or index change, and gates deployment on recall and faithfulness regressions.',
    ],
    features: [
      { title: 'Span-level citations', description: 'Every claim links to the exact passage that supports it.' },
      { title: 'Calibrated refusal', description: 'Below-threshold queries return sources rather than a confident guess.' },
      { title: 'Evaluation gate', description: 'A 900-question golden set blocks deploys that regress faithfulness.' },
      { title: 'Tenant isolation', description: 'Per-project access control enforced at retrieval, not at render.' },
      { title: 'Injection defence', description: 'Untrusted document content structurally separated from instructions.' },
      { title: 'Spend controls', description: 'Per-team budget caps with live cost-per-query dashboards.' },
    ],
    stack: ['Python', 'FastAPI', 'Claude API', 'OpenAI', 'pgvector', 'PostgreSQL', 'React', 'TypeScript', 'Azure'],
    results: [
      { value: '92%', label: 'Faithfulness on the golden set' },
      { value: '2.4M', label: 'Documents indexed' },
      { value: '−73%', label: 'Median time to find a protocol' },
      { value: '0', label: 'Uncited claims in production sampling' },
    ],
    process: [
      { phase: 'Assessment', detail: 'Two-week feasibility study with a go / no-go recommendation before build.' },
      { phase: 'Golden set', detail: '900 questions and reference answers authored with Helix scientists.' },
      { phase: 'Retrieval', detail: 'Chunking, embedding and re-ranking tuned against measured recall@k.' },
      { phase: 'Guardrails', detail: 'Red-team exercise covering injection, exfiltration and over-confidence.' },
      { phase: 'Rollout', detail: 'Two research groups first, network-wide after a quarter of stable metrics.' },
    ],
    screens: [
      { label: 'Answer view', caption: 'Grounded response with span-level citations.' },
      { label: 'Source inspector', caption: 'The retrieved passages behind every claim.' },
      { label: 'Eval dashboard', caption: 'Faithfulness and recall tracked per release.' },
      { label: 'Cost monitor', caption: 'Per-team spend against configured caps.' },
    ],
    testimonial: {
      quote:
        'They spent the first fortnight telling us what would not work. That is the only reason I trusted what they said would.',
      name: 'Dr. Yasser Al-Amoudi',
      role: 'Head of Research Informatics, Helix Labs',
    },
  },
  {
    slug: 'kestrel-risk-engine',
    name: 'Kestrel Risk Engine',
    client: 'Kestrel Capital',
    industry: 'fintech',
    industryLabel: 'FinTech',
    categories: ['Software', 'AI'],
    year: '2023',
    span: 'standard',
    accent: ['#7b5cff', '#ff5fa2'],
    summary:
      'Intraday portfolio risk recomputed in under four seconds, down from an overnight batch.',
    description:
      'A distributed risk engine that revalues a multi-asset book continuously, with explainable attribution and a scenario workbench the risk desk drives directly.',
    challenge: [
      'Risk numbers arrived the next morning. By then the exposure they described had already changed.',
      'The existing engine was a single-node overnight batch that could not be scaled without a rewrite nobody wanted to fund.',
      'Regulators required every number to be reproducible, with the exact inputs and model version that produced it.',
    ],
    solution: [
      'A horizontally partitioned compute layer that revalues positions incrementally as market data arrives, with deterministic replay from an immutable input log.',
      'Scenario analysis moved from an overnight request queue to an interactive workbench — analysts define a shock and see attribution in seconds.',
      'Every published number carries its model version, input snapshot ID and computation lineage, satisfying the reproducibility requirement by construction.',
    ],
    features: [
      { title: 'Incremental revaluation', description: 'Only affected positions recompute as market data ticks in.' },
      { title: 'Deterministic replay', description: 'Any published figure reproducible from its immutable input snapshot.' },
      { title: 'Scenario workbench', description: 'Interactive shocks with attribution in under four seconds.' },
      { title: 'Model versioning', description: 'Every number tagged with the exact model revision that produced it.' },
      { title: 'Anomaly detection', description: 'Statistical flagging of implausible inputs before they reach the book.' },
      { title: 'Regulatory export', description: 'One-command generation of the full reporting pack.' },
    ],
    stack: ['.NET', 'Python', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'Terraform', 'Grafana'],
    results: [
      { value: '3.8s', label: 'Full-book revaluation, from 9 hours' },
      { value: '100%', label: 'Figures reproducible on demand' },
      { value: '−44%', label: 'Compute cost versus the batch system' },
      { value: '18', label: 'Asset classes supported' },
    ],
    process: [
      { phase: 'Discovery', detail: 'Modelled the existing batch and its correctness guarantees before replacing it.' },
      { phase: 'Parallel run', detail: 'New engine ran alongside the batch for three months, reconciled nightly.' },
      { phase: 'Cutover', detail: 'Switched only after 60 consecutive days of exact agreement.' },
      { phase: 'Extension', detail: 'Scenario workbench and anomaly detection added post-cutover.' },
      { phase: 'Operations', detail: 'Handed to Kestrel’s platform team with full runbooks and SLOs.' },
    ],
    screens: [
      { label: 'Risk overview', caption: 'Live book exposure across 18 asset classes.' },
      { label: 'Scenario workbench', caption: 'Define a shock, see attribution in seconds.' },
      { label: 'Lineage view', caption: 'Every figure traceable to its inputs and model version.' },
      { label: 'Anomaly queue', caption: 'Implausible market data caught before it lands.' },
    ],
    testimonial: {
      quote:
        'Sixty days of exact agreement before they would let us switch. No vendor has ever held themselves to that in front of me.',
      name: 'Bandar Al-Faisal',
      role: 'Chief Risk Officer, Kestrel Capital',
    },
  },
  {
    slug: 'atlas-field',
    name: 'Atlas Field',
    client: 'Atlas Properties',
    industry: 'real-estate',
    industryLabel: 'Real Estate',
    categories: ['Mobile', 'Software'],
    year: '2024',
    span: 'standard',
    accent: ['#ffc8a2', '#8ef0c0'],
    summary:
      'Property inspections for 9,000 units, on-site, offline, with the report generated before the inspector leaves.',
    description:
      'Atlas Field replaces the clipboard-and-camera inspection workflow with a mobile app that captures structured condition data and produces the tenant-facing report on the spot.',
    challenge: [
      'Inspectors captured findings on paper and photos on a phone, then spent an evening reassembling both into a report.',
      'Basements and stairwells have no signal, so anything requiring connectivity was unusable exactly where inspections happen.',
      'Disputed deposits hinged on photo evidence nobody could reliably tie to a date, unit and room.',
    ],
    solution: [
      'A fully offline React Native app with room-by-room structured capture, on-device photo compression and background sync when signal returns.',
      'Every photo is bound at capture time to unit, room, inspector and timestamp, and signed — the evidence chain holds up in a deposit dispute.',
      'Reports render on-device from the structured data and are counter-signed by the tenant before the inspector leaves the property.',
    ],
    features: [
      { title: 'Fully offline capture', description: 'Complete inspections with no connectivity, syncing when signal returns.' },
      { title: 'Bound photo evidence', description: 'Unit, room, timestamp and inspector signed at capture.' },
      { title: 'On-site reporting', description: 'Report generated and tenant-signed before leaving the property.' },
      { title: 'Condition history', description: 'Side-by-side comparison against the previous inspection per room.' },
      { title: 'Route planning', description: 'Daily inspection routes optimised across a portfolio.' },
      { title: 'Portfolio dashboard', description: 'Condition trends and maintenance forecasting across 9,000 units.' },
    ],
    stack: ['React Native', 'TypeScript', 'Kotlin', 'Swift', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    results: [
      { value: '9,000', label: 'Units under management' },
      { value: '−68%', label: 'Time per inspection' },
      { value: '−52%', label: 'Deposit disputes escalated' },
      { value: '100%', label: 'Reports completed on site' },
    ],
    process: [
      { phase: 'Field research', detail: 'Two weeks riding along on inspections before designing anything.' },
      { phase: 'Prototype', detail: 'Offline capture flow tested in actual basements, not a meeting room.' },
      { phase: 'Build', detail: 'Four months to first regional rollout.' },
      { phase: 'Rollout', detail: 'Region-by-region with inspector training and a paper fallback for one cycle.' },
      { phase: 'Support', detail: 'Quarterly releases driven by an inspector feedback channel.' },
    ],
    screens: [
      { label: 'Room capture', caption: 'Structured condition entry, fully offline.' },
      { label: 'Photo evidence', caption: 'Signed and bound to unit, room and time.' },
      { label: 'On-site report', caption: 'Generated and countersigned before leaving.' },
      { label: 'Portfolio view', caption: 'Condition trends across 9,000 units.' },
    ],
    testimonial: {
      quote:
        'They spent two weeks in the field before they drew a single screen. It shows in every interaction.',
      name: 'Saud Al-Shehri',
      role: 'Head of Operations, Atlas Properties',
    },
  },
  {
    slug: 'bluefin-orchestrator',
    name: 'Bluefin Orchestrator',
    client: 'Bluefin Logistics',
    industry: 'ecommerce',
    industryLabel: 'Logistics',
    categories: ['Software'],
    year: '2022',
    span: 'standard',
    accent: ['#3d8bff', '#7b5cff'],
    summary:
      'A fulfilment orchestration layer routing 180,000 orders a day across six warehouses.',
    description:
      'Bluefin’s order routing lived in a decade of stored procedures. We replaced it with an event-driven orchestrator that is observable, testable and changeable by the operations team.',
    challenge: [
      'Routing logic was encoded across 40,000 lines of stored procedures nobody was willing to modify.',
      'A single mis-routed batch could strand thousands of orders with no visibility into why.',
      'Peak-season throughput requirements were growing faster than the database could scale vertically.',
    ],
    solution: [
      'We extracted the routing rules into a versioned decision service with a simulation mode — operations can test a rule change against yesterday’s real order flow before enabling it.',
      'Order lifecycle moved onto an event stream with the outbox pattern and idempotent handlers, giving replayability and a complete per-order timeline.',
      'Every order carries a trace. "Why did this go to Rotterdam?" is now a click, not an investigation.',
    ],
    features: [
      { title: 'Versioned routing rules', description: 'Operations-editable rules with review, versioning and rollback.' },
      { title: 'Simulation mode', description: 'Replay a rule change against real historical order flow before enabling it.' },
      { title: 'Per-order tracing', description: 'Full decision timeline for every order, queryable in seconds.' },
      { title: 'Idempotent handlers', description: 'Outbox pattern and dedupe keys — at-least-once never means twice-shipped.' },
      { title: 'Warehouse balancing', description: 'Capacity-aware distribution across six sites with live rebalancing.' },
      { title: 'Replayable recovery', description: 'Any window of orders reprocessable after an upstream incident.' },
    ],
    stack: ['Node.js', '.NET', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'Terraform', 'OpenTelemetry'],
    results: [
      { value: '180k', label: 'Orders routed per day' },
      { value: '−91%', label: 'Mis-routing incidents' },
      { value: '6', label: 'Warehouses orchestrated' },
      { value: '<40ms', label: 'p95 routing decision latency' },
    ],
    process: [
      { phase: 'Archaeology', detail: 'Documented the existing stored-procedure behaviour, including the bugs operations relied on.' },
      { phase: 'Shadow mode', detail: 'New engine decided in parallel for eight weeks, differences reviewed daily.' },
      { phase: 'Migration', detail: 'Traffic shifted by order type, with instant fallback per type.' },
      { phase: 'Handover', detail: 'Operations trained to own rule changes without engineering.' },
      { phase: 'Scale-out', detail: 'Sixth warehouse onboarded post-launch in under two weeks.' },
    ],
    screens: [
      { label: 'Routing rules', caption: 'Versioned, reviewable, operations-owned.' },
      { label: 'Simulation', caption: 'Test a change against yesterday’s real flow.' },
      { label: 'Order trace', caption: 'The full decision timeline per order.' },
      { label: 'Capacity view', caption: 'Live balancing across six warehouses.' },
    ],
    testimonial: {
      quote:
        'They documented bugs our business had come to depend on, then asked us which ones to keep. Nobody had ever asked.',
      name: 'Maha Al-Sultan',
      role: 'Director of Fulfilment, Bluefin Logistics',
    },
  },
  {
    slug: 'fernwood-portal',
    name: 'Fernwood Resident Portal',
    client: 'Fernwood Living',
    industry: 'real-estate',
    industryLabel: 'Real Estate',
    categories: ['Web', 'E-commerce'],
    year: '2025',
    span: 'standard',
    accent: ['#ff5fa2', '#ffc8a2'],
    summary:
      'A resident portal that took a build-to-rent operator from 11% to 64% digital self-service.',
    description:
      'Leasing, payments, maintenance requests and building communications in one portal residents actually use — designed from the support-ticket log outward.',
    challenge: [
      'Ninety percent of resident interactions came through a phone line staffed nine to five, for requests that were almost entirely routine.',
      'A previous portal had 11% adoption because it mirrored the internal property-management system rather than the resident’s mental model.',
      'Four legacy systems held the data, none of them designed to be read by anything but their own UI.',
    ],
    solution: [
      'We started from twelve months of support tickets, ranked by volume, and designed the top eight journeys end to end. Everything else came later.',
      'An integration layer normalises the four legacy systems behind one resident-facing API, with caching and graceful degradation when a legacy system is down.',
      'The portal is progressive: it works on a five-year-old Android over a weak connection, because that describes a large share of the residents.',
    ],
    features: [
      { title: 'Ticket-led journeys', description: 'Top eight support reasons designed as complete self-service flows.' },
      { title: 'Maintenance with photos', description: 'Report, track and rate a repair, with photo evidence and live status.' },
      { title: 'Payments and statements', description: 'Rent, arrangements and downloadable statements in one place.' },
      { title: 'Legacy integration layer', description: 'Four back-office systems behind a single stable API.' },
      { title: 'Graceful degradation', description: 'Cached read paths keep the portal usable when a legacy system is offline.' },
      { title: 'Building communications', description: 'Targeted notices by building, floor or unit with read tracking.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Azure'],
    results: [
      { value: '64%', label: 'Digital self-service, from 11%' },
      { value: '−47%', label: 'Inbound call volume' },
      { value: '1.1s', label: 'Median LCP on mid-tier Android' },
      { value: '+22', label: 'Resident NPS improvement' },
    ],
    process: [
      { phase: 'Analysis', detail: 'Twelve months of support tickets categorised and ranked by volume and cost.' },
      { phase: 'Design', detail: 'Eight core journeys prototyped and tested with residents across age groups.' },
      { phase: 'Integration', detail: 'Legacy adapters and caching layer built before any portal feature.' },
      { phase: 'Build', detail: 'Journey-by-journey release, each measured against its ticket category.' },
      { phase: 'Iteration', detail: 'Monthly review of remaining call reasons driving the roadmap.' },
    ],
    screens: [
      { label: 'Resident home', caption: 'The eight things people actually call about.' },
      { label: 'Maintenance', caption: 'Report with photos, track to completion.' },
      { label: 'Payments', caption: 'Rent, arrangements and statements.' },
      { label: 'Notices', caption: 'Targeted building communications with read tracking.' },
    ],
    testimonial: {
      quote:
        'The first portal was built from our org chart. This one was built from our call log. Adoption went up six-fold.',
      name: 'Lubna Al-Rasheed',
      role: 'Managing Director, Fernwood Living',
    },
  },
];

export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Web',
  'Mobile',
  'Software',
  'AI',
  'E-commerce',
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const projectsBySlugs = (slugs: string[]): Project[] =>
  slugs.map(projectBySlug).filter((project): project is Project => Boolean(project));

export const featuredProjects = projectsBySlugs([
  'vaultline-treasury',
  'meridian-care-companion',
  'helix-research-copilot',
  'orbit-commerce-cloud',
]);
