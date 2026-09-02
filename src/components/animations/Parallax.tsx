import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouchOrSmall } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel across the element's full scroll pass, in px. */
  distance?: number;
}

/** Scroll-linked vertical drift. Skipped on small screens where it costs more than it gives. */
export function Parallax({ children, className, distance = 70 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Never combine these inline with `||` — see the note in Magnetic.tsx.
  const reduced = usePrefersReducedMotion();
  const touchOrSmall = useIsTouchOrSmall();
  const disabled = reduced || touchOrSmall;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={disabled ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
