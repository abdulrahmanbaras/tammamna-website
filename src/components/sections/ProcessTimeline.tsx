import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

/**
 * The rail fills with scroll progress through the section, and the active step
 * is derived from which row is nearest the viewport's midline — measured with
 * one IntersectionObserver rather than a per-row scroll listener.
 */
export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useT();
  const { processSteps } = useContent();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 65%'],
  });
  const railScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const rows = rowRefs.current.filter((row): row is HTMLDivElement => Boolean(row));
    if (rows.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = rows.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      // A thin band across the middle of the viewport: whichever row crosses it
      // is the one the reader is looking at.
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [processSteps]);

  return (
    <Section id="process" bordered accent={['#ffc8a2', '#7b5cff']}>
      <SectionHeading
        eyebrow={t.home.process.eyebrow}
        title={t.home.process.title}
        description={t.home.process.description}
        action={
          <ButtonLink to="/process" variant="secondary" withArrow>
            {t.home.process.detail}
          </ButtonLink>
        }
      />

      <div ref={containerRef} className="relative mt-16">
        {/* Rail */}
        <div className="absolute bottom-0 start-[11px] top-0 w-px bg-white/[0.08] sm:start-[15px]">
          <motion.div
            className="h-full w-full origin-top"
            style={{
              scaleY: railScale,
              background: 'linear-gradient(180deg, #ffc8a2, #ff5fa2, #c74bff, #7b5cff, #3d8bff)',
            }}
          />
        </div>

        <div>
          {processSteps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={step.index}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className="relative grid grid-cols-[24px_1fr] gap-6 py-8 sm:grid-cols-[32px_1fr] sm:gap-10 sm:py-10"
              >
                <div className="relative pt-1.5">
                  <motion.span
                    className="block h-[23px] w-[23px] rounded-full border sm:h-[31px] sm:w-[31px]"
                    animate={{
                      borderColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(5,5,5,1)',
                      scale: isActive ? 1 : 0.86,
                    }}
                    transition={{ duration: 0.5, ease: EASE_EXPO }}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="process-dot"
                      className="accent-dot absolute start-[8px] top-[9.5px] h-[7px] w-[7px] rounded-full sm:start-[12px] sm:top-[13.5px]"
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                    />
                  )}
                </div>

                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.42 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="grid gap-4 md:grid-cols-[1fr_1.1fr] md:gap-10"
                >
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
                        {step.index}
                      </span>
                      <h3
                        className={cn(
                          'text-[clamp(1.35rem,3vw,2rem)] font-medium tracking-tight transition-colors duration-500',
                          isActive ? 'text-chalk' : 'text-chalk-dim',
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
                      {step.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-[15px] leading-relaxed text-chalk-dim">{step.summary}</p>
                    <motion.p
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 12 : 0,
                      }}
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                      className="overflow-hidden text-[14px] leading-relaxed text-chalk-faint"
                    >
                      {step.detail}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
