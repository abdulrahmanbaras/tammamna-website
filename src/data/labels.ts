import type { ProjectCategory, TechCategory, Technology } from '@/types';

/** English display labels for values that are unions in the type system. */
export const techCategoryLabels: Record<TechCategory, string> = {
  Frontend: 'Frontend',
  Backend: 'Backend',
  Mobile: 'Mobile',
  Database: 'Database',
  Cloud: 'Cloud',
  DevOps: 'DevOps',
  AI: 'AI',
};

export const techMaturityLabels: Record<Technology['maturity'], string> = {
  Core: 'Core',
  Production: 'Production',
  Exploratory: 'Exploratory',
};

export const projectCategoryLabels: Record<ProjectCategory | 'All', string> = {
  All: 'All',
  Web: 'Web',
  Mobile: 'Mobile',
  Software: 'Software',
  AI: 'AI',
  'E-commerce': 'E-commerce',
};
