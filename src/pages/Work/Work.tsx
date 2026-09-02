import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { projectCategories } from '@/data/projects';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import type { ProjectCategory } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

type Filter = 'All' | ProjectCategory;

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const t = useT();
  const { projects, projectCategoryLabels, company } = useContent();

  usePageMeta({
    title: `${t.nav.work} — ${company.name}`,
    description: t.workPage.description,
  });

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter, projects],
  );

  // Counts are derived, not hard-coded, so the filter bar cannot drift from the data.
  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['All', projects.length]]);
    for (const category of projectCategories) {
      if (category === 'All') continue;
      map.set(category, projects.filter((project) => project.categories.includes(category)).length);
    }
    return map;
  }, [projects]);

  // The gallery takes its accent from the first visible project, so filtering
  // recolours the page as well as the grid.
  const accent = filtered[0]?.accent ?? (['#7b5cff', '#3d8bff'] as [string, string]);

  return (
    <>
      <PageHero
        eyebrow={t.workPage.eyebrow}
        title={t.workPage.title}
        description={t.workPage.description}
        accent={['#7b5cff', '#ff5fa2']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.work }]}
      />

      <Section spacing="tight" accent={accent}>
        <LayoutGroup>
          <div className="no-scrollbar -mx-[var(--shell-x)] flex gap-2 overflow-x-auto px-[var(--shell-x)] pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {projectCategories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'relative shrink-0 rounded-full px-5 py-2.5 text-[13.5px] transition-colors duration-300',
                    isActive ? 'text-ink-950' : 'text-chalk-dim hover:text-chalk',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 rounded-full bg-chalk"
                      transition={{ duration: 0.42, ease: EASE_EXPO }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {projectCategoryLabels[category]}
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        isActive ? 'text-ink-950/50' : 'text-chalk-faint',
                      )}
                    >
                      {counts.get(category) ?? 0}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <motion.div layout className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="list"
                index={index}
                className={index % 2 === 1 ? 'lg:mt-16' : undefined}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-20 text-center text-[15px] text-chalk-dim">{t.workPage.empty}</p>
        )}
      </Section>

      <FinalCTA
        title={t.workPage.ctaTitle}
        description={t.workPage.ctaDescription}
        secondaryLabel={t.common.ourServices}
        secondaryTo="/services"
      />
    </>
  );
}
