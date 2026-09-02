import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Options {
  to: number;
  duration?: number;
  decimals?: number;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from 0 → `to` once the element enters the viewport. Driven by rAF
 * rather than state-per-frame from a timer so the number tracks real elapsed
 * time even when the main thread is busy.
 */
export function useCountUp<T extends HTMLElement>({ to, duration = 1900, decimals = 0 }: Options) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const next = to * easeOutExpo(t);
      setValue(Number(next.toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, decimals, reduced]);

  return { ref, value, inView };
}
