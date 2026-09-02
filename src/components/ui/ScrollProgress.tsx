import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Hairline reading-progress bar. Its gradient is the live scroll accent, so the
 * bar changes colour along with the section you are reading.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left transition-[background-image] duration-1000 ease-out rtl:origin-right"
      style={{
        scaleX,
        backgroundImage:
          'linear-gradient(90deg, var(--accent-a), var(--accent-b), var(--accent-a))',
      }}
    />
  );
}
