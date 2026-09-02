import { useMemo } from 'react';
import { useLocale } from './LocaleContext';
import { en, type Dictionary } from './dictionary.en';
import { ar } from './dictionary.ar';

const dictionaries: Record<'en' | 'ar', Dictionary> = { en, ar };

/**
 * Returns the whole dictionary tree for the active locale rather than a
 * `t('some.key')` lookup function — direct property access keeps every string
 * type-checked and renameable, and a missing key fails the build.
 */
export function useT(): Dictionary {
  const { locale } = useLocale();
  return useMemo(() => dictionaries[locale], [locale]);
}
