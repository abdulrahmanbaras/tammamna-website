import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

export function IndustriesSwitcher() {
  const t = useT();
  const { industries, projectBySlug } = useContent();
  const [activeSlug, setActiveSlug] = useState(industries[0].slug);
  const active = industries.find((industry) => industry.slug === activeSlug) ?? industries[0];
  const caseStudy = projectBySlug(active.caseStudy);

  return (
    <Section id="industries" bordered accent={active.accent}>
      <SectionHeading
        eyebrow={t.home.industries.eyebrow}
        title={t.home.industries.title}
        description={t.home.industries.description}
      />

      {/* Selector: oversized type, because the industry name is the interface. */}
      <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/[0.07] pb-6 sm:gap-x-12">
        {industries.map((industry) => {
          const isActive = industry.slug === activeSlug;
          return (
            <button
              key={industry.slug}
              type="button"
              onClick={() => setActiveSlug(industry.slug)}
              className="group relative"
              aria-pressed={isActive}
            >
              <span
                className={cn(
                  'display block text-[clamp(1.8rem,4.6vw,3.4rem)] transition-colors duration-500',
                  isActive ? 'text-chalk' : 'text-ink-500 hover:text-chalk-dim',
                )}
              >
                {industry.name}
              </span>
              {isActive && (
                <motion.span
                  layoutId="industry-underline"
                  className="absolute -bottom-[25px] inset-x-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${industry.accent[0]}, ${industry.accent[1]})`,
                  }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        >
          <div>
            <h3 className="max-w-lg text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-snug tracking-tight text-chalk">
              {active.headline}
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-chalk-dim">
              {active.description}
            </p>

            <div className="mt-10">
              <p className="eyebrow mb-5">{t.home.industries.whatWeSee}</p>
              <ul className="space-y-3">
                {active.challenges.map((challenge, index) => (
                  <motion.li
                    key={challenge}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE_EXPO }}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-chalk-dim"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: active.accent[0] }}
                    />
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">{t.common.technologies}</p>
              <div className="flex flex-wrap gap-2" lang="en" dir="ltr">
                {active.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
              {active.solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.06 * index, ease: EASE_EXPO }}
                  className="panel p-6"
                >
                  <div className="flex items-center gap-2.5">
                    <Check
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: active.accent[1] }}
                      strokeWidth={2}
                    />
                    <h4 className="text-[15px] font-medium text-chalk">{solution.title}</h4>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-chalk-faint">
                    {solution.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {caseStudy && (
              <Link
                to={`/work/${caseStudy.slug}`}
                className="panel group flex items-center justify-between gap-6 rounded-2xl border border-white/[0.07] p-6 transition-colors duration-500 hover:border-white/[0.16]"
              >
                <div>
                  <p className="eyebrow">{t.common.relatedCaseStudy}</p>
                  <p className="mt-2 text-lg font-medium tracking-tight text-chalk">
                    {caseStudy.name}
                  </p>
                  <p className="mt-1 text-[13.5px] text-chalk-dim">{caseStudy.summary}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.08] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:text-chalk">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </span>
              </Link>
            )}

            <Reveal>
              <dl className="grid grid-cols-3 gap-4">
                {active.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-white/[0.09] pt-4">
                    <dd
                      className="text-xl font-medium tracking-tight sm:text-2xl"
                      style={{ color: active.accent[0] }}
                    >
                      <span dir="ltr" className="inline-block">
                        {stat.value}
                      </span>
                    </dd>
                    <dt className="mt-1.5 text-[12px] leading-snug text-chalk-faint">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
