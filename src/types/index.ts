import type { LucideIcon } from 'lucide-react';

export type ServiceSlug =
  | 'web-development'
  | 'mobile-development'
  | 'software-development'
  | 'ui-ux'
  | 'ai-solutions'
  | 'cloud-devops';

export interface Capability {
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: string;
  short: string;
  /** One-line positioning statement used on the service hero. */
  tagline: string;
  overview: string[];
  icon: LucideIcon;
  deliverables: string[];
  capabilities: Capability[];
  stack: string[];
  metrics: { value: string; label: string }[];
  relatedProjects: string[];
  accent: [string, string];
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Software' | 'AI' | 'E-commerce';

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  industry: IndustrySlug;
  industryLabel: string;
  categories: ProjectCategory[];
  year: string;
  summary: string;
  description: string;
  challenge: string[];
  solution: string[];
  features: { title: string; description: string }[];
  stack: string[];
  results: CaseStudyMetric[];
  process: { phase: string; detail: string }[];
  screens: { label: string; caption: string }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  accent: [string, string];
  /** Layout hint for the featured-work section on the home page. */
  span: 'wide' | 'tall' | 'standard';
}

export type IndustrySlug = 'fintech' | 'healthcare' | 'real-estate' | 'ecommerce';

export interface Industry {
  slug: IndustrySlug;
  name: string;
  index: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  challenges: string[];
  solutions: { title: string; description: string }[];
  technologies: string[];
  regulations: string[];
  caseStudy: string;
  stats: { value: string; label: string }[];
  accent: [string, string];
}

export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'AI';

export interface Technology {
  name: string;
  category: TechCategory;
  description: string;
  /** Names of technologies we commonly pair this with. */
  pairs: string[];
  since: string;
  maturity: 'Core' | 'Production' | 'Exploratory';
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: [string, string];
}

export interface ProcessStep {
  index: string;
  title: string;
  duration: string;
  summary: string;
  detail: string;
  activities: string[];
  deliverables: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  level: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  focus: string;
  accent: [string, string];
}
