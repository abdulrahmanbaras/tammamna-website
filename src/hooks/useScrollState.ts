import { useEffect, useRef, useState } from 'react';

export interface ScrollState {
  y: number;
  /** Past the threshold where the navbar switches to its glass treatment. */
  scrolled: boolean;
  /** Direction of the last meaningful scroll movement. */
  direction: 'up' | 'down';
  /** 0 → 1 progress through the whole document. */
  progress: number;
}

const THRESHOLD = 24;

/**
 * A single rAF-throttled scroll listener. Components subscribe to this instead
 * of registering their own listeners, which keeps scroll work to one handler.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    scrolled: false,
    direction: 'up',
    progress: 0,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const measure = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const delta = y - lastY.current;

      setState((prev) => {
        const direction =
          Math.abs(delta) < 4 ? prev.direction : delta > 0 ? 'down' : 'up';
        const scrolled = y > THRESHOLD;
        const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

        if (
          prev.scrolled === scrolled &&
          prev.direction === direction &&
          Math.abs(prev.y - y) < 2 &&
          Math.abs(prev.progress - progress) < 0.002
        ) {
          return prev;
        }
        return { y, scrolled, direction, progress };
      });

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return state;
}
