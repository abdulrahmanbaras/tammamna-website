import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_EXPO, VIEWPORT } from '@/utils/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * The workhorse scroll-reveal. One-shot by design: re-animating on every pass
 * is the fastest way to make a site feel like a template.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 28,
  direction = 'up',
  as = 'div',
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_EXPO }}
    >
      {children}
    </Component>
  );
}
