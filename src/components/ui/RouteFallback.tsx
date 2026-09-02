import { motion } from 'framer-motion';
import { useT } from '@/i18n/useT';

/**
 * Shown while a lazily-loaded route chunk arrives. Sized to roughly the height
 * of an inner-page hero so the layout does not jump when content lands.
 */
export function RouteFallback() {
  const t = useT();

  return (
    <div
      className="flex min-h-[70svh] items-center justify-center pt-32"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/3"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent, var(--accent-a), transparent)',
            }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chalk-faint">
          {t.common.loading}
        </span>
      </div>
    </div>
  );
}
