import { useCallback, useRef } from 'react';
import { useIsTouchOrSmall } from './useMediaQuery';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Writes the pointer position into CSS custom properties on the target element.
 * Deliberately avoids React state: the glow updates on every pointer move, and
 * re-rendering a card subtree at 120Hz is exactly the kind of waste that makes
 * "premium" sites feel cheap.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  // Never combine these inline with `||` — see the note in Magnetic.tsx.
  const touchOrSmall = useIsTouchOrSmall();
  const reduced = usePrefersReducedMotion();
  const disabled = touchOrSmall || reduced;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;

      const { clientX, clientY } = event;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--px', `${clientX - rect.left}px`);
        el.style.setProperty('--py', `${clientY - rect.top}px`);
      });
    },
    [disabled],
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
  }, []);

  return { ref, onPointerMove, onPointerLeave, enabled: !disabled };
}
