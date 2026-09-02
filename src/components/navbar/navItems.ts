import type { LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionary.en';
import type { Content } from '@/data/useContent';

/**
 * A sub-link carries the whole entity, not just a href: the mega-panel renders
 * a preview pane for whichever child is hovered, and that pane needs the same
 * icon, index and accent pair the entity uses everywhere else on the site.
 */
export interface NavChild {
  label: string;
  to: string;
  description: string;
  icon: LucideIcon;
  index: string;
  accent: [string, string];
  /** Short Latin tokens (stack names) shown as chips under the preview. */
  meta: string[];
}

export interface NavItem {
  label: string;
  to: string;
  /** Sub-links surfaced in the desktop mega-panel and the mobile drawer. */
  children?: NavChild[];
  /** Label for the "see all" link at the foot of the mega-panel. */
  overviewLabel?: string;
}

/**
 * Nav structure is derived rather than stored as a static const: paths stay
 * fixed, while labels come from the active locale's dictionary and the service
 * and industry names come from the locale-merged content bundle.
 */
export function buildNavItems(t: Dictionary, content: Content): NavItem[] {
  return [
    {
      label: t.nav.services,
      to: '/services',
      children: content.services.map((service) => ({
        label: service.title,
        to: `/services/${service.slug}`,
        description: t.nav.serviceDescriptions[service.slug],
        icon: service.icon,
        index: service.index,
        accent: service.accent,
        meta: service.stack.slice(0, 4),
      })),
      overviewLabel: t.common.allServices,
    },
    { label: t.nav.work, to: '/work' },
    {
      label: t.nav.industries,
      to: '/industries',
      children: content.industries.map((industry) => ({
        label: industry.name,
        to: `/industries/${industry.slug}`,
        description: t.nav.industryDescriptions[industry.slug],
        icon: industry.icon,
        index: industry.index,
        accent: industry.accent,
        meta: industry.technologies.slice(0, 4),
      })),
      overviewLabel: t.common.allIndustries,
    },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.technologies, to: '/technologies' },
    { label: t.nav.process, to: '/process' },
  ];
}

export function buildSecondaryNavItems(t: Dictionary) {
  return [
    { label: t.nav.careers, to: '/careers' },
    { label: t.nav.contact, to: '/contact' },
  ];
}
