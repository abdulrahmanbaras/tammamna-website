import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '@/utils/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Per-word stagger in seconds. */
  stagger?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  once?: boolean;
}

/**
 * Word-by-word mask reveal. Each word sits in an `overflow-hidden` wrapper so
 * it rises out of an invisible baseline rather than fading in place. The whole
 * string is exposed to assistive tech via aria-label; the fragments are hidden.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  as = 'h2',
  once = true,
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as];
  const words = text.split(' ');

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Component
      // Remount the whole reveal whenever the string changes — which is what a
      // language switch does. `whileInView` with `once` stops observing after it
      // fires, so the parent never re-runs; but the word spans are keyed by the
      // word, so new copy remounts them with `initial="hidden"` and nothing is
      // left to propagate "show". The heading would stay invisible until reload.
      key={text}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                show: { y: '0%', opacity: 1 },
              }}
              transition={{ duration: 0.95, ease: EASE_EXPO }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? <span aria-hidden>{' '}</span> : null}
        </Fragment>
      ))}
    </Component>
  );
}
