import type { ReactNode } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
  size?: 'md' | 'lg';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
  size = 'md',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-8 md:flex-row md:items-end md:justify-between',
        centered && 'md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
        {eyebrow && (
          <Reveal>
            <div className={cn('mb-6 flex items-center gap-3', centered && 'justify-center')}>
              {/* Picks up whichever accent the current section owns. */}
              <span className="accent-rule h-px w-8" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </Reveal>
        )}

        <TextReveal
          text={title}
          as="h2"
          className={cn(
            'display text-balance text-chalk',
            size === 'lg'
              ? 'text-[clamp(2.4rem,6vw,4.75rem)]'
              : 'text-[clamp(2rem,4.4vw,3.5rem)]',
          )}
        />

        {description && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                'mt-6 max-w-2xl text-[15px] leading-relaxed text-chalk-dim sm:text-base',
                centered && 'mx-auto',
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={0.2} className={cn('shrink-0', centered && 'mt-2')}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
