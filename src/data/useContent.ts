import type {
  Industry,
  IndustrySlug,
  Project,
  ProjectCategory,
  Service,
  ServiceSlug,
  TeamMember,
  Technology,
  Testimonial,
  ProcessStep,
  JobOpening,
  TechCategory,
} from '@/types';
import { useLocale, type Locale } from '@/i18n/LocaleContext';

import { services } from './services';
import { projects } from './projects';
import { industries } from './industries';
import { technologies, categoryBlurb, techCategories } from './technologies';
import { testimonials } from './testimonials';
import { processSteps, engagementModels } from './process';
import { openings, benefits, culture, hiringProcess } from './careers';
import { team, timeline } from './team';
import {
  company,
  metrics,
  clientLogos,
  whyUs,
  values,
  philosophy,
} from './company';
import { projectCategoryLabels, techCategoryLabels, techMaturityLabels } from './labels';

import { servicesAr } from './ar/services';
import { projectsAr } from './ar/projects';
import { industriesAr } from './ar/industries';
import {
  technologiesAr,
  techCategoryLabelsAr,
  techMaturityLabelsAr,
  categoryBlurbAr,
} from './ar/technologies';
import { testimonialsAr, processAr, jobsAr, teamAr, timelineAr } from './ar/misc';
import {
  companyAr,
  metricsAr,
  whyUsAr,
  valuesAr,
  philosophyAr,
  engagementModelsAr,
  benefitsAr,
  cultureAr,
  hiringProcessAr,
  projectCategoryLabelsAr,
} from './ar/company';

export interface Content {
  company: {
    name: string;
    legalName: string;
    tagline: string;
    founded: number;
    email: string;
    salesEmail: string;
    careersEmail: string;
    phone: string;
    locations: { city: string; label: string; role: string }[];
    socials: { label: string; href: string }[];
  };
  metrics: { value: number; suffix: string; label: string; detail: string }[];
  clientLogos: string[];
  whyUs: { title: string; description: string }[];
  values: { title: string; description: string }[];
  philosophy: { title: string; description: string }[];
  services: Service[];
  projects: Project[];
  featuredProjects: Project[];
  industries: Industry[];
  technologies: Technology[];
  techCategories: TechCategory[];
  categoryBlurb: Record<TechCategory, string>;
  techCategoryLabels: Record<TechCategory, string>;
  techMaturityLabels: Record<Technology['maturity'], string>;
  projectCategoryLabels: Record<ProjectCategory | 'All', string>;
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  engagementModels: { title: string; description: string; fit: string }[];
  openings: JobOpening[];
  benefits: { title: string; description: string }[];
  culture: { title: string; description: string }[];
  hiringProcess: { step: string; title: string; detail: string }[];
  team: TeamMember[];
  timeline: { year: string; title: string; detail: string }[];
  serviceBySlug: (slug: string) => Service | undefined;
  projectBySlug: (slug: string) => Project | undefined;
  industryBySlug: (slug: string) => Industry | undefined;
  technologyByName: (name: string) => Technology | undefined;
  projectsBySlugs: (slugs: string[]) => Project[];
}

const FEATURED_SLUGS = [
  'vaultline-treasury',
  'meridian-care-companion',
  'helix-research-copilot',
  'orbit-commerce-cloud',
];

/**
 * Merges the canonical (English) structural data with a locale's copy.
 *
 * Structure — slugs, icons, accent pairs, indices, technology stacks and
 * cross-references — only ever comes from the canonical modules, so a
 * translation cannot break routing or the visual identity of an entity.
 */
function build(locale: Locale): Content {
  const isAr = locale === 'ar';

  const localisedServices: Service[] = isAr
    ? services.map((service) => ({ ...service, ...servicesAr[service.slug as ServiceSlug] }))
    : services;

  const localisedProjects: Project[] = isAr
    ? projects.map((project) => ({ ...project, ...(projectsAr[project.slug] ?? {}) }))
    : projects;

  const localisedIndustries: Industry[] = isAr
    ? industries.map((industry) => ({
        ...industry,
        ...industriesAr[industry.slug as IndustrySlug],
      }))
    : industries;

  const localisedTechnologies: Technology[] = isAr
    ? technologies.map((tech) => ({ ...tech, ...(technologiesAr[tech.name] ?? {}) }))
    : technologies;

  const localisedTestimonials: Testimonial[] = isAr
    ? testimonials.map((item) => ({ ...item, ...(testimonialsAr[item.name] ?? {}) }))
    : testimonials;

  const localisedProcess: ProcessStep[] = isAr
    ? processSteps.map((step) => ({ ...step, ...(processAr[step.index] ?? {}) }))
    : processSteps;

  const localisedOpenings: JobOpening[] = isAr
    ? openings.map((job) => ({ ...job, ...(jobsAr[job.id] ?? {}) }))
    : openings;

  const localisedTeam: TeamMember[] = isAr
    ? team.map((member) => ({ ...member, ...(teamAr[member.name] ?? {}) }))
    : team;

  const localisedTimeline = isAr
    ? timeline.map((entry) => ({ ...entry, ...(timelineAr[entry.year] ?? {}) }))
    : timeline;

  const byIndex = <T, U>(base: T[], overrides: U[]): (T & Partial<U>)[] =>
    base.map((item, index) => ({ ...item, ...(overrides[index] ?? {}) }));

  const localisedCompany: Content['company'] = isAr
    ? {
        ...company,
        name: companyAr.name,
        legalName: companyAr.legalName,
        tagline: companyAr.tagline,
        locations: byIndex([...company.locations], companyAr.locations),
        socials: byIndex([...company.socials], companyAr.socials),
      }
    : {
        ...company,
        locations: [...company.locations],
        socials: [...company.socials],
      };

  return {
    company: localisedCompany,
    metrics: isAr ? byIndex(metrics, metricsAr) : metrics,
    clientLogos,
    whyUs: isAr ? whyUsAr : whyUs,
    values: isAr ? valuesAr : values,
    philosophy: isAr ? philosophyAr : philosophy,
    services: localisedServices,
    projects: localisedProjects,
    featuredProjects: FEATURED_SLUGS.map((slug) =>
      localisedProjects.find((project) => project.slug === slug),
    ).filter((project): project is Project => Boolean(project)),
    industries: localisedIndustries,
    technologies: localisedTechnologies,
    techCategories,
    categoryBlurb: isAr ? categoryBlurbAr : categoryBlurb,
    techCategoryLabels: isAr ? techCategoryLabelsAr : techCategoryLabels,
    techMaturityLabels: isAr ? techMaturityLabelsAr : techMaturityLabels,
    projectCategoryLabels: isAr ? projectCategoryLabelsAr : projectCategoryLabels,
    testimonials: localisedTestimonials,
    processSteps: localisedProcess,
    engagementModels: isAr ? engagementModelsAr : engagementModels,
    openings: localisedOpenings,
    benefits: isAr ? benefitsAr : benefits,
    culture: isAr ? cultureAr : culture,
    hiringProcess: isAr ? byIndex(hiringProcess, hiringProcessAr) : hiringProcess,
    team: localisedTeam,
    timeline: localisedTimeline,
    serviceBySlug: (slug) => localisedServices.find((service) => service.slug === slug),
    projectBySlug: (slug) => localisedProjects.find((project) => project.slug === slug),
    industryBySlug: (slug) => localisedIndustries.find((industry) => industry.slug === slug),
    technologyByName: (name) => localisedTechnologies.find((tech) => tech.name === name),
    projectsBySlugs: (slugs) =>
      slugs
        .map((slug) => localisedProjects.find((project) => project.slug === slug))
        .filter((project): project is Project => Boolean(project)),
  };
}

// Built once per locale at module load rather than per render — the merge is
// pure and the result is shared by every component on the page.
const bundles: Record<Locale, Content> = {
  en: build('en'),
  ar: build('ar'),
};

export function useContent(): Content {
  const { locale } = useLocale();
  return bundles[locale];
}
