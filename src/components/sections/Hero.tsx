import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Aurora } from '@/components/ui/Aurora';
import { ButtonLink } from '@/components/ui/Button';
import { useAccentZone } from '@/components/theme/SectionThemeProvider';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { EASE_EXPO } from '@/utils/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const lineVariants = {
  hidden: { y: '108%' },
  show: (index: number) => ({
    y: '0%',
    transition: { duration: 1.15, delay: 0.28 + index * 0.11, ease: EASE_EXPO },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const accentRef = useAccentZone<HTMLDivElement>(['#ff5fa2', '#7b5cff']);
  const reduced = usePrefersReducedMotion();
  const t = useT();
  const { company } = useContent();

  // The content lifts and fades slightly faster than the page scrolls, so the
  // gradient field behind it is revealed rather than simply scrolled past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const headline = [
    { text: t.hero.line1, aurora: false },
    { text: t.hero.line2, aurora: false },
    { text: t.hero.line3, aurora: true },
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32 sm:pb-28"
    >
      <div ref={accentRef} className="absolute inset-0" aria-hidden />
      <Aurora />

      <motion.div
        className="shell relative"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 lg:backdrop-blur-sm"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-mint opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aurora-mint" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-dim">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,8.4vw,7rem)] text-chalk">
          {headline.map((line, index) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={line.aurora ? 'aurora-text block' : 'block'}
                custom={index}
                variants={lineVariants}
                initial={reduced ? undefined : 'hidden'}
                animate={reduced ? undefined : 'show'}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-chalk-dim sm:text-[17px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE_EXPO }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.88, ease: EASE_EXPO }}
        >
          <ButtonLink to="/contact" size="lg" withArrow magnetic>
            {t.common.startProject}
          </ButtonLink>
          <ButtonLink to="/work" size="lg" variant="secondary" magnetic>
            {t.common.exploreWork}
          </ButtonLink>
        </motion.div>

        <motion.dl
          className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
        >
          {[
            [t.hero.stats.since, String(company.founded)],
            [t.hero.stats.shipped, '50+'],
            [t.hero.stats.availability, '99.95%'],
            [t.hero.stats.studios, 'MAK · RUH · JED'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                {label}
              </dt>
              <dd className="mt-1.5 text-[15px] text-chalk" dir="ltr">
                {value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#metrics"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-label={t.hero.scroll}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chalk-faint transition-colors group-hover:text-chalk-dim">
          {t.hero.scroll}
        </span>
        <motion.span
          className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.12] text-chalk-dim"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
