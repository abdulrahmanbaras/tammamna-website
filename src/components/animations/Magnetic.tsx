import { useCallback, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchOrSmall } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number;
}

/**
 * Pulls its child slightly toward the cursor while hovered. Uses motion values
 * and a spring rather than React state, so the pointer handler never triggers
 * a render. Disabled entirely on touch and under reduced-motion.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Both hooks must be called on every render. Combining them inline with `||`
  // short-circuits the second one the moment the first turns true, which
  // changes the hook count mid-session and crashes the tree on resize.
  const touchOrSmall = useIsTouchOrSmall();
  const reduced = usePrefersReducedMotion();
  const disabled = touchOrSmall || reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || disabled) return;
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      x.set(relX * strength * 2);
      y.set(relY * strength * 2);
    },
    [disabled, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (disabled) {
    return <div className={cn('inline-flex', className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
