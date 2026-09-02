import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { Reveal } from '@/components/animations/Reveal';
import { useAccentZone, type Accent } from '@/components/theme/SectionThemeProvider';
import { useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/utils/cn';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Accent pair for the corner wash and for the page's ambient field. */
  accent?: Accent;
  className?: string;
}

/**
 * Shared inner-page hero. It owns the page accent while it is on screen, so
 * each service, industry and case study arrives in its own colour.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  accent = ['#c74bff', '#3d8bff'],
  className,
}: PageHeroProps) {
  const ref = useAccentZone<HTMLElement>(accent);
  const { isRTL } = useLocale();

  return (
    <section
      ref={ref}
      className={cn('relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(65% 60% at 82% 0%, ${accent[0]}30 0%, transparent 62%), radial-gradient(55% 55% at 0% 20%, ${accent[1]}24 0%, transparent 60%)`,
        }}
      />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="shell relative">
        {crumbs && crumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumb.to ? (
                      <Link to={crumb.to} className="transition-colors hover:text-chalk-dim">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-chalk-dim">{crumb.label}</span>
                    )}
                    {index < crumbs.length - 1 && (
                      <ChevronRight className="h-3 w-3 rtl:-scale-x-100" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(${isRTL ? 270 : 90}deg, ${accent[0]}, transparent)`,
              }}
            />
            <span className="eyebrow" style={{ color: accent[0] }}>
              {eyebrow}
            </span>
          </div>
        </Reveal>

        <TextReveal
          text={title}
          as="h1"
          className="display max-w-[18ch] text-balance text-[clamp(2.4rem,6.6vw,5.25rem)] text-chalk"
        />

        {description && (
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-chalk-dim sm:text-[17px]">
              {description}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.25}>{children}</Reveal>}
      </div>
    </section>
  );
}
