import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

/** One accent per step, so scrolling the process walks the whole palette. */
const STEP_ACCENTS: [string, string][] = [
  ['#ffc8a2', '#ff5fa2'],
  ['#ff5fa2', '#c74bff'],
  ['#c74bff', '#7b5cff'],
  ['#7b5cff', '#3d8bff'],
  ['#3d8bff', '#8ef0c0'],
  ['#8ef0c0', '#3d8bff'],
  ['#3d8bff', '#c74bff'],
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useT();
  const { processSteps, engagementModels, company } = useContent();

  usePageMeta({
    title: `${t.nav.process} — ${company.name}`,
    description: t.processPage.description,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 70%'],
  });
  const railScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const steps = stepRefs.current.filter((step): step is HTMLElement => Boolean(step));
    if (steps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = steps.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [processSteps]);

  const activeAccent = STEP_ACCENTS[activeIndex % STEP_ACCENTS.length];

  return (
    <>
      <PageHero
        eyebrow={t.processPage.eyebrow}
        title={t.processPage.title}
        description={t.processPage.description}
        accent={['#ffc8a2', '#7b5cff']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.process }]}
      />

      {/* The section accent follows the step you are reading. */}
      <Section spacing="tight" accent={activeAccent}>
        <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Sticky step index — the reader's position in the process. */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow mb-6">{t.processPage.steps}</p>
              <ol className="space-y-1">
                {processSteps.map((step, index) => {
                  const isCurrent = index === activeIndex;
                  return (
                    <li key={step.index}>
                      <a
                        href={`#step-${step.index}`}
                        className={cn(
                          'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] transition-colors duration-300',
                          isCurrent
                            ? 'bg-white/[0.05] text-chalk'
                            : 'text-chalk-faint hover:text-chalk-dim',
                        )}
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
                          style={{
                            background: isCurrent
                              ? STEP_ACCENTS[index % STEP_ACCENTS.length][0]
                              : 'rgba(255,255,255,0.15)',
                          }}
                          aria-hidden
                        />
                        <span className="font-mono text-[10px] tracking-[0.14em]">
                          {step.index}
                        </span>
                        {step.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>

          <div ref={containerRef} className="relative">
            <div className="absolute bottom-0 start-[7px] top-0 hidden w-px bg-white/[0.08] sm:block">
              <motion.div
                className="h-full w-full origin-top"
                style={{
                  scaleY: railScale,
                  background:
                    'linear-gradient(180deg, #ffc8a2, #ff5fa2, #c74bff, #7b5cff, #3d8bff, #8ef0c0)',
                }}
              />
            </div>

            <div className="space-y-4">
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;
                const [from, to] = STEP_ACCENTS[index % STEP_ACCENTS.length];

                return (
                  <article
                    key={step.index}
                    id={`step-${step.index}`}
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                    className="relative scroll-mt-28 sm:ps-12"
                  >
                    <motion.span
                      aria-hidden
                      className="absolute start-0 top-9 hidden h-[15px] w-[15px] rounded-full border sm:block"
                      animate={{
                        borderColor: isActive ? from : 'rgba(255,255,255,0.12)',
                        backgroundColor: isActive ? from : '#050505',
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.5, ease: EASE_EXPO }}
                    />

                    <Reveal>
                      <div
                        className={cn(
                          'relative overflow-hidden rounded-2xl border p-8 transition-colors duration-700 sm:p-10',
                          isActive ? 'panel border-white/[0.14]' : 'border-white/[0.07]',
                        )}
                      >
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute inset-0"
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.7 }}
                          style={{
                            background: `radial-gradient(70% 100% at 0% 0%, ${from}1f 0%, transparent 60%)`,
                          }}
                        />

                        <div className="relative flex flex-wrap items-baseline justify-between gap-4">
                          <div className="flex items-baseline gap-5">
                            <span
                              className="font-mono text-[11px] tracking-[0.2em]"
                              style={{ color: isActive ? from : undefined }}
                            >
                              {step.index}
                            </span>
                            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium tracking-tight text-chalk">
                              {step.title}
                            </h2>
                          </div>
                          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk-faint">
                            {step.duration}
                          </span>
                        </div>

                        <p className="relative mt-6 max-w-2xl text-[15.5px] leading-relaxed text-chalk">
                          {step.summary}
                        </p>
                        <p className="relative mt-4 max-w-2xl text-[14.5px] leading-relaxed text-chalk-dim">
                          {step.detail}
                        </p>

                        <div className="relative mt-9 grid gap-8 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
                          <div>
                            <p className="eyebrow mb-4">{t.processPage.activities}</p>
                            <ul className="space-y-2.5">
                              {step.activities.map((activity) => (
                                <li
                                  key={activity}
                                  className="flex gap-3 text-[14px] leading-relaxed text-chalk-dim"
                                >
                                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/25" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="eyebrow mb-4">{t.processPage.receive}</p>
                            <ul className="space-y-2.5">
                              {step.deliverables.map((deliverable) => (
                                <li
                                  key={deliverable}
                                  className="flex gap-3 text-[14px] leading-relaxed text-chalk"
                                >
                                  <span
                                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                                    style={{ background: to }}
                                  />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section bordered spacing="tight" accent={['#c74bff', '#3d8bff']}>
        <SectionHeading
          eyebrow={t.processPage.engagementEyebrow}
          title={t.processPage.engagementTitle}
          description={t.processPage.engagementDescription}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          {engagementModels.map((model, index) => (
            <Reveal key={model.title} delay={index * 0.08} className="panel p-8">
              <h3 className="text-lg font-medium tracking-tight text-chalk">{model.title}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-chalk-dim">
                {model.description}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint">
                {t.common.bestFor} · {model.fit}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        title={t.processPage.ctaTitle}
        description={t.processPage.ctaDescription}
        secondaryLabel={t.common.seeOurWork}
        secondaryTo="/work"
      />
    </>
  );
}
