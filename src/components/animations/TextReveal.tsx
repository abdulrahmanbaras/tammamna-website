import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);
  // Driving the reveal from `animate` rather than the `whileInView` gesture is
  // what lets the copy change without remounting. A viewport gesture with `once`
  // stops observing after it fires, so newly mounted word spans would never be
  // told to show — that is what made headings vanish on a language switch. As a
  // plain prop, `animate` still applies to children that mount later.
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });
  const Component = motion[as];
  const words = text.split(' ');

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Component
      ref={ref as never}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
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
