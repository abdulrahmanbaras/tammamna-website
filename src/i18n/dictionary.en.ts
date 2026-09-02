/**
 * The English dictionary is the canonical shape. `dictionary.ar.ts` is typed
 * against `Dictionary`, so a missing or renamed key is a compile error rather
 * than a blank space discovered in production.
 */
export const en = {
  common: {
    skipToContent: 'Skip to content',
    loading: 'Loading',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    letsTalk: 'Let’s talk',
    startProject: 'Start a project',
    exploreWork: 'Explore our work',
    allServices: 'All services',
    allCaseStudies: 'All case studies',
    allIndustries: 'All industries',
    viewCaseStudy: 'View case study',
    exploreService: 'Explore service',
    ourServices: 'Our services',
    ourProcess: 'Our process',
    seeOurWork: 'See our work',
    backToHome: 'Back to home',
    home: 'Home',
    or: 'or email',
    language: 'Language',
    switchLanguage: 'Switch language',
    technologies: 'Technologies',
    relatedCaseStudy: 'Related case study',
    bestFor: 'Best for',
    expand: 'Expand',
    collapse: 'Collapse',
    clearSelection: 'Clear selection',
  },

  nav: {
    services: 'Services',
    work: 'Work',
    industries: 'Industries',
    about: 'About',
    technologies: 'Technologies',
    process: 'Process',
    careers: 'Careers',
    contact: 'Contact',
    serviceDescriptions: {
      'web-development': 'Fast, accessible web platforms',
      'mobile-development': 'iOS and Android that feel native',
      'software-development': 'Backend systems and integrations',
      'ui-ux': 'Research-led product design',
      'ai-solutions': 'Applied AI with guardrails',
      'cloud-devops': 'Infrastructure and delivery',
    },
    industryDescriptions: {
      fintech: 'Treasury, risk and payments',
      healthcare: 'Clinical and patient software',
      'real-estate': 'Portfolio and field operations',
      ecommerce: 'Storefronts and fulfilment',
    },
  },

  hero: {
    badge: 'Taking on Q3 engagements',
    line1: 'We build digital',
    line2: 'products that move',
    line3: 'businesses forward.',
    description:
      'Tammamna is a senior engineering studio. We design and build web, mobile, AI and cloud products for companies where correctness, scale and uptime are not negotiable — and we stay on them after launch.',
    scroll: 'Scroll to explore',
    stats: {
      since: 'Since',
      shipped: 'Products shipped',
      availability: 'Availability',
      studios: 'Studios',
    },
  },

  home: {
    trustedBy: 'Trusted by teams who ship',
    services: {
      eyebrow: 'Capabilities',
      title: 'What we build',
      description:
        'Six practices, one team. Most engagements draw on three or four of them at once — which is the point of keeping them under the same roof.',
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Products in production',
      description:
        'Four engagements that show the range — regulated finance, clinical care, applied AI and high-traffic retail.',
    },
    tech: {
      eyebrow: 'Stack',
      title: 'Technology we stand behind',
      description:
        'We adopt tools once they have earned it, and we can tell you why each one is here. Hover any technology to see where it sits and what we pair it with.',
      fullStack: 'Full stack',
      idleCount: (count: number) => `${count} technologies · 7 categories`,
      idleBody:
        'Select a technology to see its category, why it is in our stack, and the tools we most often deploy alongside it.',
      pairedSince: (year: string) => `In production since ${year} · commonly paired with`,
    },
    industries: {
      eyebrow: 'Domains',
      title: 'Where we go deep',
      description:
        'Domain knowledge compounds. These four are where we have spent enough years that we can argue with your regulator’s interpretation — politely.',
      whatWeSee: 'What we see',
    },
    process: {
      eyebrow: 'How we work',
      title: 'Seven steps, no theatre',
      description:
        'The same sequence on every engagement, scaled to the size of the problem. Each step has a defined output, so you always know what you are receiving.',
      detail: 'Process in detail',
    },
    whyUs: {
      eyebrow: 'Why Tammamna',
      title: 'What you actually get',
      description:
        'Every studio claims quality. These are the six things our clients tell us made the difference, in their words more than ours.',
    },
    testimonials: {
      eyebrow: 'Clients',
      title: 'In their words',
      region: 'Client testimonials',
      choose: 'Choose testimonial',
      previous: 'Previous testimonial',
      next: 'Next testimonial',
      from: (name: string) => `Testimonial from ${name}`,
    },
  },

  cta: {
    title: 'Have an idea? Let’s build it.',
    description:
      'Tell us what you are trying to ship and what is currently in the way. You will hear back from an engineer, not a sales team, within one working day.',
  },

  footer: {
    tagline:
      'Web, mobile, software, design, AI and cloud — built by senior engineers who stay on the project.',
    services: 'Services',
    industries: 'Industries',
    company: 'Company',
    rights: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
  },

  servicesPage: {
    eyebrow: 'Services',
    title: 'Six practices. One engineering team.',
    description:
      'Most engagements need three or four of these at once. Keeping them under one roof is why our handovers do not lose information — because there aren’t any.',
    engageTitle: 'How we engage',
    engageDescription:
      'Three shapes, chosen in the first conversation. We will tell you which one fits, even when it is the smaller one.',
    ctaTitle: 'Not sure which you need?',
    ctaDescription:
      'Describe the problem in plain language. We will tell you which practices it touches, roughly what it costs, and whether it is worth doing at all.',
    ctaPrimary: 'Talk to an engineer',
    ctaSecondary: 'See the process',
  },

  serviceDetail: {
    label: (index: string) => `Service ${index}`,
    discuss: (title: string) => `Discuss a ${title.toLowerCase()} project`,
    overview: 'Overview',
    provideEyebrow: 'What we provide',
    provideTitle: 'Everything you receive',
    provideDescription:
      'Concrete outputs, agreed in the delivery plan before work starts. No line item here is a “best effort”.',
    capabilitiesEyebrow: 'Key capabilities',
    capabilitiesTitle: 'How we approach it',
    stackTitle: 'The stack we use here',
    whyThese: 'Why these',
    relatedEyebrow: 'Related work',
    relatedTitle: 'Where we have done this',
    otherPractices: 'Other practices',
    ctaTitle: (title: string) => `Let’s talk about ${title.toLowerCase()}.`,
    ctaDescription:
      'Send us the shape of the problem. We will come back with an approach, a rough range, and the parts we think you should cut.',
  },

  workPage: {
    eyebrow: 'Work',
    title: 'Software that went to production and stayed there.',
    description:
      'Eight engagements across regulated finance, healthcare, property, retail and logistics. Every number on these pages came from the client’s own reporting.',
    all: 'All',
    empty: 'No projects in this category yet.',
    ctaTitle: 'Your product could be next.',
    ctaDescription:
      'Tell us what you are building and what is currently blocking it. We reply with an approach, not a brochure.',
  },

  caseStudy: {
    meta: {
      client: 'Client',
      industry: 'Industry',
      year: 'Year',
      disciplines: 'Disciplines',
    },
    challengeEyebrow: 'The challenge',
    challengeTitle: 'Where they started',
    solutionEyebrow: 'Our solution',
    solutionTitle: 'What we built',
    featuresEyebrow: 'Features',
    featuresTitle: 'What it does',
    screensEyebrow: 'Interface',
    screensTitle: 'Selected screens',
    screensNote:
      'Client interfaces are under NDA, so these are abstracted representations of the real layouts.',
    stackEyebrow: 'Technology',
    stackTitle: 'The stack',
    resultsEyebrow: 'Results',
    resultsTitle: 'What changed',
    deliveryEyebrow: 'Delivery',
    deliveryTitle: 'How it was built',
    nextEyebrow: 'Next case study',
    ctaTitle: 'Building something like this?',
    ctaDescription:
      'We are happy to walk through the architecture behind this project and what it would take for yours.',
  },

  industriesPage: {
    eyebrow: 'Industries',
    title: 'Domain knowledge you cannot fake.',
    description:
      'We work in four domains deeply rather than twenty superficially. It means we arrive already knowing which constraints are real and which ones your last vendor invented.',
    ctaTitle: 'Working in another domain?',
    ctaDescription:
      'We take on work outside these four when the engineering problem is one we have solved before. Ask us — we will tell you honestly if it is not a fit.',
  },

  industryDetail: {
    label: (index: string) => `Industry ${index}`,
    challenges: 'Common challenges',
    solutions: 'How we solve them',
    techTitle: 'Technologies we deploy here',
    standardsTitle: 'Standards we build against',
    standardsNote:
      'We are not your compliance function, but we build so that satisfying it is a matter of generating evidence, not reconstructing it.',
    caseStudyEyebrow: 'Case study',
    caseStudyTitle: (name: string) => `${name} in production`,
    otherDomains: 'Other domains',
    ctaTitle: (name: string) => `Building for ${name.toLowerCase()}?`,
    ctaDescription:
      'Come with the constraint that is making it hard. Those conversations are where we are most useful.',
  },

  about: {
    eyebrow: 'About',
    title: 'A studio built around the people who write the code.',
    description: (founded: number) =>
      `Founded in ${founded}, Tammamna is twenty-odd engineers and designers who would rather do a small number of things properly than a large number quickly. We are senior-weighted on purpose — the person who scopes your project is the person who builds it.`,
    whoWeAre: 'Who we are',
    story: [
      'We started in Makkah in 2016 with three engineers and one rule: every decision that matters gets written down. Nine years later the rule has survived two office moves, a second studio in Riyadh, and roughly fifty products going to production.',
      'Most of our work lives in places where software failing is expensive — treasury platforms, clinical systems, risk engines, high-traffic retail. That has shaped how we work more than any methodology: we front-load the unglamorous parts, we test the thing that would hurt most if it broke, and we say the difficult thing in week two rather than month six.',
      'We are not the cheapest option and we do not pretend to be. What we offer is a small team of experienced people who stay on your product, tell you the truth about it, and leave it documented well enough that you could take it in-house tomorrow.',
    ],
    mission: 'Mission',
    missionText:
      'To build software that businesses can depend on for a decade — and to be honest about what that costs.',
    vision: 'Vision',
    visionText:
      'An engineering studio where senior people do the work, stay on the work, and are proud to put their name on it.',
    valuesEyebrow: 'Values',
    valuesTitle: 'Four things we actually enforce',
    valuesDescription: 'Values are only real if they cost something. These four regularly do.',
    philosophyEyebrow: 'Engineering philosophy',
    philosophyTitle: 'How we build, in four rules',
    historyEyebrow: 'History',
    historyTitle: 'Nine years, briefly',
    teamEyebrow: 'Team',
    teamTitle: 'The people you will work with',
    teamDescription:
      'No account managers between you and the build. These are the people in your workshops and on your pull requests.',
    ctaTitle: 'Come and argue with us.',
    ctaDescription:
      'The best first meetings are the ones where someone brings a problem they think is unsolvable. Bring yours.',
    ctaSecondary: 'See open roles',
  },

  technologiesPage: {
    eyebrow: 'Technologies',
    title: 'Every tool here had to earn its place.',
    description:
      'We are deliberately conservative about adoption and deliberately ruthless about removal. Select any technology to see what we use it for and what we pair it with.',
    all: 'All',
    since: (year: string) => `In production since ${year} · paired with`,
    barMeta: (category: string, maturity: string, year: string) =>
      `${category} · ${maturity} · since ${year}`,
    ctaTitle: 'Wondering if your stack is a fit?',
    ctaDescription:
      'We inherit other people’s codebases regularly. Send us the repository shape and we will tell you what we would keep.',
  },

  processPage: {
    eyebrow: 'Process',
    title: 'Seven steps, each with a defined output.',
    description:
      'This is the sequence on every engagement, scaled to the size of the problem. You always know which step you are in, what it produces, and what it costs to change your mind.',
    steps: 'Steps',
    activities: 'Activities',
    receive: 'You receive',
    engagementEyebrow: 'Engagement',
    engagementTitle: 'Three ways to work with us',
    engagementDescription:
      'We will recommend the one that fits, including when that is the smallest and cheapest of the three.',
    ctaTitle: 'Start with discovery.',
    ctaDescription:
      'Most engagements begin with a paid two-week discovery. If it tells us the project should not go ahead, we will say so and you keep the report.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Tell us what you are building.',
    description:
      'You will hear back from an engineer, not a sales team, within one working day. If we are not the right fit we will say so and point you somewhere better.',
    fields: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project type',
      budget: 'Budget range',
      message: 'What are you building?',
    },
    placeholders: {
      name: 'Faisal Al-Harbi',
      company: 'Northwind Group',
      email: 'faisal@northwind.com',
      phone: '+966 12 000 0000',
      message: 'The product, where you are today, and what is currently in the way.',
      select: 'Select…',
      optional: 'Optional',
    },
    projectTypes: [
      'Web platform',
      'Mobile application',
      'Custom software',
      'UI/UX design',
      'AI solution',
      'Cloud & DevOps',
      'Not sure yet',
    ],
    budgets: [
      'Under SAR 100k',
      'SAR 100k – 300k',
      'SAR 300k – 600k',
      'SAR 600k – 1.5M',
      'SAR 1.5M+',
      'To be discussed',
    ],
    errors: {
      nameRequired: 'Please tell us your name.',
      nameShort: 'That looks a little short.',
      emailRequired: 'We need an email to reply to.',
      emailInvalid: 'That does not look like a valid email address.',
      phoneInvalid: 'Use digits, spaces, and an optional +.',
      projectTypeRequired: 'Pick the closest match — you can change it later.',
      messageRequired: 'A sentence or two is plenty to start.',
      messageShort: (length: number) => `A little more detail helps (${length}/20 characters).`,
    },
    submit: 'Send message',
    sending: 'Sending',
    requiredNote: 'Fields marked * are required. We reply within one working day.',
    successTitle: (firstName: string) => `Thanks, ${firstName}. Message received.`,
    successBody: (email: string, phone: string) =>
      `An engineer will read this and reply to ${email} within one working day. If it is urgent, call ${phone}.`,
    successNote:
      'Note: this is a front-end demonstration build. The submission was validated and handled entirely in the browser — no data was sent anywhere.',
    sendAnother: 'Send another message',
    sidebar: {
      email: 'Email',
      newBusiness: (address: string) => `New business: ${address}`,
      phone: 'Phone',
      responseTime: 'Response time',
      responseValue: 'Within one working day',
      responseHours: 'Sun–Thu, 09:00–18:00 AST',
      studios: 'Studios',
      elsewhere: 'Elsewhere',
    },
  },

  careers: {
    eyebrow: 'Careers',
    title: 'Work with people who write things down.',
    description:
      'We hire slowly, keep teams small, and expect you to disagree with us in writing. If that sounds like a relief rather than a chore, we should talk.',
    whyWorkHere: 'Why work here',
    benefitsEyebrow: 'Benefits',
    benefitsTitle: 'The practical part',
    benefitsDescription: 'Everything here applies from day one, wherever you are in AST ±3.',
    openingsEyebrow: (count: number) => `${count} open positions`,
    openingsTitle: 'Where we need people',
    openingsDescription:
      'Nothing here quite fits? Write to us anyway — we have created roles for the right person before.',
    responsibilities: 'What you will do',
    requirements: 'What we are looking for',
    niceToHave: 'Nice to have',
    apply: 'Apply for this role',
    applySubject: (title: string) => `Application — ${title}`,
    hiringEyebrow: 'Hiring',
    hiringTitle: 'What the process looks like',
    hiringDescription:
      'Four steps, roughly two weeks end to end. No unpaid take-homes and no algorithm puzzles.',
    ctaTitle: 'Think you would fit here?',
    ctaDescription: (address: string) =>
      `Send your work and a paragraph about what you want to be doing in two years to ${address}. We read everything.`,
    ctaPrimary: 'Email careers',
    ctaSecondary: 'About the studio',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'This route was never deployed.',
    description:
      'The page you asked for does not exist. Nothing is broken — the URL simply does not map to anything we built.',
  },
};

// Deliberately not `as const`: the Arabic dictionary must be assignable to this
// type, so the values need to widen to `string` rather than stay literals.
export type Dictionary = typeof en;
