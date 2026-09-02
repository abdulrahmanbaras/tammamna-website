import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { categoryAccent } from '@/data/technologies';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import type { TechCategory, Technology } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

type Filter = 'All' | TechCategory;

export default function Technologies() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<string | null>(null);
  const t = useT();
  const {
    technologies,
    techCategories,
    techCategoryLabels,
    techMaturityLabels,
    categoryBlurb,
    technologyByName,
    company,
  } = useContent();

  usePageMeta({
    title: `${t.nav.technologies} — ${company.name}`,
    description: t.technologiesPage.description,
  });

  /**
   * Every card in one flat grid is a wall — the category is the thing
   * that makes the list readable, so the grid is always grouped by it. A filter
   * narrows the page to a single group rather than reshuffling one big grid.
   */
  const groups = useMemo(
    () =>
      (filter === 'All' ? techCategories : [filter]).map((category) => ({
        category,
        items: technologies.filter((tech) => tech.category === category),
      })),
    [filter, technologies, techCategories],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['All', technologies.length]]);
    for (const category of techCategories) {
      map.set(category, technologies.filter((tech) => tech.category === category).length);
    }
    return map;
  }, [technologies, techCategories]);

  const active = selected ? technologyByName(selected) : null;

  // The page takes the colour of whichever category is in focus.
  const pageAccent = filter === 'All' ? (['#3d8bff', '#c74bff'] as const) : categoryAccent[filter];

  return (
    <>
      <PageHero
        eyebrow={t.technologiesPage.eyebrow}
        title={t.technologiesPage.title}
        description={t.technologiesPage.description}
        accent={['#3d8bff', '#8ef0c0']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.technologies }]}
      />

      <Section spacing="tight" accent={pageAccent}>
        {/* Category filter */}
        <LayoutGroup>
          <div className="no-scrollbar -mx-[var(--shell-x)] flex gap-2 overflow-x-auto px-[var(--shell-x)] pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {(['All', ...techCategories] as Filter[]).map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setFilter(category);
                    setSelected(null);
                  }}
                  aria-pressed={isActive}
                  className={cn(
                    'relative shrink-0 rounded-full px-5 py-2.5 text-[13.5px] transition-colors duration-300',
                    isActive ? 'text-ink-950' : 'text-chalk-dim hover:text-chalk',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tech-filter"
                      className="absolute inset-0 rounded-full bg-chalk"
                      transition={{ duration: 0.42, ease: EASE_EXPO }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {category === 'All' ? t.technologiesPage.all : techCategoryLabels[category]}
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

        {filter !== 'All' && (
          <Reveal>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-chalk-dim">
              {categoryBlurb[filter]}
            </p>
          </Reveal>
        )}

        {/* Grouped grid — one block per category, each with its own heading. */}
        <div className="mt-12 flex flex-col gap-14">
          {groups.map(({ category, items }) => (
            <div key={category}>
              {/* The heading is redundant when a filter has already narrowed the
                  page to this one category and printed its blurb above. */}
              {filter === 'All' && (
                <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/[0.07] pt-6">
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${categoryAccent[category][0]}, ${categoryAccent[category][1]})`,
                    }}
                  />
                  <h2 className="text-lg font-medium tracking-tight text-chalk">
                    {techCategoryLabels[category]}
                  </h2>
                  <span className="font-mono text-[11px] text-chalk-faint" dir="ltr">
                    {items.length}
                  </span>
                  <p className="ms-auto max-w-md text-[13.5px] leading-relaxed text-chalk-dim">
                    {categoryBlurb[category]}
                  </p>
                </div>
              )}

              <motion.div
                layout
                className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((tech, index) => (
                    <TechCard
                      key={tech.name}
                      tech={tech}
                      index={index}
                      open={selected === tech.name}
                      categoryLabel={techCategoryLabels[tech.category]}
                      maturityLabel={techMaturityLabels[tech.maturity]}
                      sinceLabel={t.technologiesPage.since(tech.since)}
                      onToggle={() =>
                        setSelected((current) => (current === tech.name ? null : tech.name))
                      }
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </Section>

      {/* Selection detail bar — a persistent readout of the current choice. */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.09] bg-ink-950/85 backdrop-blur-xl"
          >
            <div className="shell flex items-center justify-between gap-6 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className="h-9 w-1 shrink-0 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${categoryAccent[active.category][0]}, ${categoryAccent[active.category][1]})`,
                  }}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-[15px] text-chalk" lang="en" dir="ltr">
                    {active.name}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint">
                    {t.technologiesPage.barMeta(
                      techCategoryLabels[active.category],
                      techMaturityLabels[active.maturity],
                      active.since,
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-chalk-dim transition-colors hover:border-white/25 hover:text-chalk"
                aria-label={t.common.clearSelection}
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FinalCTA
        title={t.technologiesPage.ctaTitle}
        description={t.technologiesPage.ctaDescription}
        secondaryLabel={t.common.ourServices}
        secondaryTo="/services"
      />
    </>
  );
}

function TechCard({
  tech,
  index,
  open,
  categoryLabel,
  maturityLabel,
  sinceLabel,
  onToggle,
}: {
  tech: Technology;
  index: number;
  open: boolean;
  categoryLabel: string;
  maturityLabel: string;
  sinceLabel: string;
  onToggle: () => void;
}) {
  const [from, to] = categoryAccent[tech.category];

  return (
    <motion.button
      layout
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.03, ease: EASE_EXPO }}
      onClick={onToggle}
      aria-expanded={open}
      className="panel group relative overflow-hidden p-7 text-start transition-colors duration-500 hover:bg-white/[0.02]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(150deg, ${from}14, transparent 60%)` }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 rtl:origin-right"
        style={{ background: `linear-gradient(90deg, ${from}, ${to}, transparent)` }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight text-chalk" lang="en" dir="ltr">
          {tech.name}
        </h3>
        <span
          className="mt-1 h-2 w-2 shrink-0 rounded-full transition-transform duration-500 ease-expo group-hover:scale-150"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          aria-hidden
        />
      </div>

      <p
        className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: from }}
      >
        {categoryLabel} · {maturityLabel}
      </p>

      <p className="relative mt-4 text-[14px] leading-relaxed text-chalk-dim">{tech.description}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE_EXPO }}
            className="relative overflow-hidden"
          >
            <div className="mt-5 border-t border-white/[0.08] pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint">
                {sinceLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" lang="en" dir="ltr">
                {tech.pairs.map((pair) => (
                  <span
                    key={pair}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-chalk-dim"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
