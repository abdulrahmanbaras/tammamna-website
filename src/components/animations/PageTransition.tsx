import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '@/utils/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Wraps each route. Deliberately restrained — a short fade with a few pixels of
 * lift. Anything longer makes navigation feel slow rather than considered.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
