import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Coarse pointer / small viewport. Exported so non-hook code can test it too. */
export const TOUCH_OR_SMALL = '(max-width: 1023px), (pointer: coarse)';

/** Coarse pointer / small viewport — used to drop cursor-driven effects. */
export function useIsTouchOrSmall(): boolean {
  return useMediaQuery(TOUCH_OR_SMALL);
}
