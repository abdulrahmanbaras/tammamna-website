import { motion } from 'framer-motion';
import { LOCALES, useLocale } from '@/i18n/LocaleContext';
import { useT } from '@/i18n/useT';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

/**
 * A two-state segmented control rather than a dropdown: with exactly two
 * languages, a menu would add a click for no information gain — and showing
 * both labels in their own script makes the inactive option self-explanatory.
 */
export function LanguageSwitcher({
  className,
  size = 'sm',
  layoutId = 'locale-pill',
}: {
  className?: string;
  size?: 'sm' | 'md';
  layoutId?: string;
}) {
  const { locale, setLocale } = useLocale();
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className={cn(
        'relative inline-flex items-center rounded-full border border-white/[0.09] bg-white/[0.02] p-0.5',
        className,
      )}
    >
      {LOCALES.map((option) => {
        const isActive = option.code === locale;
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            onClick={() => setLocale(option.code)}
            aria-pressed={isActive}
            className={cn(
              'relative rounded-full transition-colors duration-300',
              size === 'sm' ? 'px-3 py-1 text-[12px]' : 'px-4 py-1.5 text-[13.5px]',
              isActive ? 'text-ink-950' : 'text-chalk-dim hover:text-chalk',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-chalk"
                transition={{ duration: 0.4, ease: EASE_EXPO }}
              />
            )}
            <span className="relative">{option.nativeLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
