import { TOUCH_OR_SMALL } from '@/hooks/useMediaQuery';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export const LOCALES: { code: Locale; label: string; nativeLabel: string; dir: Direction }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
];

const STORAGE_KEY = 'tamamna:locale';

/** Returns false when storage is unavailable — private mode, blocked cookies. */
function persist(locale: Locale): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}

/**
 * Switching locale in place re-renders every component and flips `dir` on
 * <html>, which invalidates style and layout for the whole document in one
 * commit. On a phone that lands as a stall. Reloading does the same work from a
 * clean slate and reads as faster, at the cost of returning to the top of the
 * page — which is where a route change puts you anyway.
 */
function reloadsOnLocaleChange(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia(TOUCH_OR_SMALL).matches;
  } catch {
    return false;
  }
}

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    // Private mode or blocked storage — fall through to language detection.
  }

  return window.navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);
  const dir: Direction = locale === 'ar' ? 'rtl' : 'ltr';

  // The document element is the single source of truth for direction: every
  // `rtl:` utility and logical-property rule in the stylesheet keys off it.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    root.dataset.locale = locale;
  }, [locale, dir]);

  const apply = useCallback((next: Locale) => {
    // The reload path depends on storage: the choice is read back on boot. If
    // the write failed we would reload straight back into the old language, so
    // fall through to switching in place instead.
    const stored = persist(next);
    if (stored && reloadsOnLocaleChange()) {
      window.location.reload();
      return;
    }
    setLocaleState(next);
  }, []);

  const setLocale = useCallback((next: Locale) => apply(next), [apply]);

  const toggleLocale = useCallback(
    () => apply(locale === 'en' ? 'ar' : 'en'),
    [apply, locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir, isRTL: dir === 'rtl', setLocale, toggleLocale }),
    [locale, dir, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside <LocaleProvider>');
  return context;
}
