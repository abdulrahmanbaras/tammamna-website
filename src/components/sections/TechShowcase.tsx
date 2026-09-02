import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { TechTree } from '@/components/tech/TechTree';
import { categoryAccent } from '@/data/technologies';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import type { TechCategory } from '@/types';
import { EASE_EXPO } from '@/utils/motion';

/**
 * The stack as a tree: categories on the trunk, their members growing out along
 * branches. The panel alongside follows the pointer — the open category while
 * you are choosing a branch, the technology itself once you reach a leaf.
 */
export function TechShowcase() {
  const t = useT();
  const {
    technologies,
    techCategories,
    techCategoryLabels,
    techMaturityLabels,
    categoryBlurb,
    technologyByName,
  } = useContent();

  const [category, setCategory] = useState<TechCategory>(techCategories[0]);
  const [selected, setSelected] = useState<string | null>(null);

  const active = selected ? (technologyByName(selected) ?? null) : null;
  const categoryCount = technologies.filter((tech) => tech.category === category).length;

  return (
    // The section owns the page accent, so opening a branch recolours the whole
    // ambient field — the same feedback the industry switcher gives.
    <Section id="technologies" bordered accent={categoryAccent[category]}>
      <SectionHeading
        eyebrow={t.home.tech.eyebrow}
        title={t.home.tech.title}
        description={t.home.tech.description}
        action={
          <ButtonLink to="/technologies" variant="secondary" withArrow>
            {t.home.tech.fullStack}
          </ButtonLink>
        }
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
        <Reveal>
          <TechTree onHoverTech={setSelected} onCategoryChange={setCategory} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel relative min-h-[290px] overflow-hidden rounded-2xl border border-white/[0.07] p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
                    style={{
                      background: `radial-gradient(70% 100% at 20% 0%, ${categoryAccent[active.category][0]}66, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: categoryAccent[active.category][0] }}
                    >
                      {techCategoryLabels[active.category]}
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk-faint">
                      {techMaturityLabels[active.maturity]}
                    </span>
                  </div>

                  <h3
                    className="relative mt-5 text-2xl font-medium tracking-tight text-chalk"
                    lang="en"
                    dir="ltr"
                  >
                    {active.name}
                  </h3>
                  <p className="relative mt-3 text-[14.5px] leading-relaxed text-chalk-dim">
                    {active.description}
                  </p>

                  <div className="relative mt-6 border-t border-white/[0.07] pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                      {t.home.tech.pairedSince(active.since)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2" lang="en" dir="ltr">
                      {active.pairs.map((pair) => (
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
              ) : (
                <motion.div
                  key={`category-${category}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
                    style={{
                      background: `radial-gradient(70% 100% at 20% 0%, ${categoryAccent[category][0]}66, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: categoryAccent[category][0] }}
                    >
                      {techCategoryLabels[category]}
                    </span>
                    <span
                      className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-chalk-faint"
                      dir="ltr"
                    >
                      {categoryCount}
                    </span>
                  </div>

                  <p className="relative mt-5 text-[17px] leading-relaxed text-chalk">
                    {categoryBlurb[category]}
                  </p>

                  <div className="relative mt-6 border-t border-white/[0.07] pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                      {t.home.tech.idleCount(technologies.length)}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-chalk-dim">
                      {t.home.tech.idleBody}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
