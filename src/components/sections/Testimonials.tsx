import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { useLocale } from '@/i18n/LocaleContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const { isRTL } = useLocale();
  const { testimonials } = useContent();

  const go = useCallback(
    (next: number, dir: number) => {
      const total = testimonials.length;
      setState([(next + total) % total, dir]);
    },
    [testimonials.length],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const previous = useCallback(() => go(index - 1, -1), [go, index]);

  // Autoplay, suspended on hover, on focus within, and when the section is off
  // screen — an invisible carousel advancing in the background is wasted work.
  useEffect(() => {
    if (paused || reduced) return;

    const element = containerRef.current;
    let visible = true;
    const observer = element
      ? new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0.3 },
        )
      : null;
    if (element && observer) observer.observe(element);

    const id = window.setInterval(() => {
      if (visible && !document.hidden) next();
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(id);
      observer?.disconnect();
    };
  }, [paused, reduced, next]);

  const active = testimonials[index];
  const [from, to] = active.accent;
  // Slide direction has to follow reading direction, or "next" appears to
  // arrive from the wrong side of the screen in Arabic.
  const axis = isRTL ? -1 : 1;

  return (
    <Section id="testimonials" bordered accent={['#ff5fa2', '#ffc8a2']}>
      <SectionHeading eyebrow={t.home.testimonials.eyebrow} title={t.home.testimonials.title} />

      <div
        ref={containerRef}
        className="mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.home.testimonials.region}
      >
        <div className="panel relative min-h-[380px] overflow-hidden rounded-2xl border border-white/[0.07] p-8 sm:min-h-[340px] sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(60% 90% at 8% 0%, ${from}30 0%, transparent 62%), radial-gradient(50% 80% at 100% 100%, ${to}2b 0%, transparent 60%)`,
            }}
          />

          <Quote className="relative h-8 w-8 rtl:-scale-x-100" style={{ color: from }} strokeWidth={1.2} aria-hidden />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={active.name}
              custom={direction}
              initial={{ opacity: 0, x: direction * axis * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * axis * -40 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
              className="relative mt-6"
            >
              <p className="max-w-3xl text-[clamp(1.15rem,2.4vw,1.75rem)] font-light leading-relaxed tracking-tight text-chalk">
                “{active.quote}”
              </p>

              <footer className="mt-10 flex items-center gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-[13px] text-ink-950"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                  aria-hidden
                  lang="en"
                  dir="ltr"
                >
                  {active.initials}
                </span>
                <div>
                  <cite className="text-[15px] not-italic text-chalk">{active.name}</cite>
                  <p className="mt-0.5 text-[13px] text-chalk-faint">
                    {active.role} · {active.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2" role="tablist" aria-label={t.home.testimonials.choose}>
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.name}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={t.home.testimonials.from(testimonial.name)}
                onClick={() => go(dotIndex, dotIndex > index ? 1 : -1)}
                className="group py-2"
              >
                <span
                  className={cn(
                    'block h-[3px] rounded-full transition-all duration-500 ease-expo',
                    dotIndex === index ? 'w-10' : 'w-5 bg-white/15 group-hover:bg-white/30',
                  )}
                  style={
                    dotIndex === index
                      ? { background: `linear-gradient(90deg, ${from}, ${to})` }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CarouselButton onClick={previous} label={t.home.testimonials.previous}>
              <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </CarouselButton>
            <CarouselButton onClick={next} label={t.home.testimonials.next}>
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </CarouselButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CarouselButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.09] text-chalk-dim transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-chalk"
    >
      {children}
    </button>
  );
}
