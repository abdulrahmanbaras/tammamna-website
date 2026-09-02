import type { Transition, Variants } from 'framer-motion';

/** Shared easing curve — a slow-out expo that reads as "engineered", not bouncy. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const transition = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_EXPO,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: transition(0.8) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(0.9) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: transition(0.9) },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Word/line reveal used by <TextReveal />. */
export const revealChild: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;
