import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

export type Accent = readonly [string, string];

/** Default palette — the site's resting state before any section takes over. */
export const DEFAULT_ACCENT: Accent = ['#c74bff', '#3d8bff'];

interface SectionThemeContextValue {
  /** Registers an element as an accent zone. Returns an unregister callback. */
  register: (element: Element, accent: Accent) => () => void;
}

const SectionThemeContext = createContext<SectionThemeContextValue | null>(null);

/**
 * Drives a page-wide accent colour from scroll position.
 *
 * Sections register themselves with an accent pair; a single
 * IntersectionObserver picks whichever registered element is most visible and
 * writes its colours into CSS custom properties on `:root`. Everything that
 * reacts — the ambient gradient field, the progress bar, eyebrow rules,
 * selection colour — reads those variables and transitions in CSS.
 *
 * Doing it this way means scrolling the whole page triggers **zero** React
 * renders: the colour change is a handful of custom-property writes and the
 * browser interpolates the rest on the compositor.
 */
export function SectionThemeProvider({ children }: { children: ReactNode }) {
  const accents = useRef(new Map<Element, Accent>());
  const ratios = useRef(new Map<Element, number>());
  const observer = useRef<IntersectionObserver | null>(null);
  const current = useRef<Accent | null>(null);

  const apply = useCallback((accent: Accent) => {
    if (current.current && current.current[0] === accent[0] && current.current[1] === accent[1]) {
      return;
    }
    current.current = accent;
    const root = document.documentElement;
    root.style.setProperty('--accent-a', accent[0]);
    root.style.setProperty('--accent-b', accent[1]);
  }, []);

  const recompute = useCallback(() => {
    let best: Element | null = null;
    let bestRatio = 0;

    for (const [element, ratio] of ratios.current) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = element;
      }
    }

    // Nothing registered is meaningfully on screen — fall back to the default
    // palette rather than leaving the last section's colour stuck on.
    const accent = best ? accents.current.get(best) : undefined;
    apply(accent ?? DEFAULT_ACCENT);
  }, [apply]);

  useEffect(() => {
    apply(DEFAULT_ACCENT);

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        recompute();
      },
      {
        // A band across the middle of the viewport: the section the reader is
        // actually looking at wins, not the one merely clipping the edge.
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    const instance = observer.current;
    accents.current.forEach((_, element) => instance.observe(element));

    return () => {
      instance.disconnect();
      observer.current = null;
    };
  }, [apply, recompute]);

  const register = useCallback(
    (element: Element, accent: Accent) => {
      accents.current.set(element, accent);
      observer.current?.observe(element);

      return () => {
        accents.current.delete(element);
        ratios.current.delete(element);
        observer.current?.unobserve(element);
      };
    },
    [],
  );

  const value = useMemo<SectionThemeContextValue>(() => ({ register }), [register]);

  return (
    <SectionThemeContext.Provider value={value}>{children}</SectionThemeContext.Provider>
  );
}

/**
 * Attach to a section to make it own the page accent while it is on screen.
 * Safe to call outside the provider — it simply does nothing.
 */
export function useAccentZone<T extends HTMLElement>(accent?: Accent) {
  const ref = useRef<T>(null);
  const context = useContext(SectionThemeContext);

  useEffect(() => {
    const element = ref.current;
    if (!element || !context || !accent) return;
    return context.register(element, accent);
    // Spreading the tuple keeps the effect from re-running on a new array
    // identity that holds the same two colours.
  }, [context, accent?.[0], accent?.[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
