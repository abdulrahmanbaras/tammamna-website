import type { ReactNode } from 'react';
import { useAccentZone, type Accent } from '@/components/theme/SectionThemeProvider';
import { cn } from '@/utils/cn';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `tight` is used where two sections read as one block. */
  spacing?: 'tight' | 'default' | 'loose';
  bordered?: boolean;
  full?: boolean;
  /**
   * Colour this section owns. While it is the most visible section on screen,
   * the whole page's ambient field and accent details shift to these two hues.
   */
  accent?: Accent;
}

const spacings = {
  tight: 'py-16 sm:py-20',
  default: 'py-24 sm:py-32',
  loose: 'py-28 sm:py-40',
};

export function Section({
  children,
  id,
  className,
  spacing = 'default',
  bordered = false,
  full = false,
  accent,
}: SectionProps) {
  const ref = useAccentZone<HTMLElement>(accent);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative',
        spacings[spacing],
        bordered && 'border-t border-white/[0.07]',
        className,
      )}
    >
      {full ? children : <div className="shell">{children}</div>}
    </section>
  );
}
