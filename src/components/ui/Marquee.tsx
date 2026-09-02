import { cn } from '@/utils/cn';

/**
 * Infinite logo rail. The track holds two identical copies and translates by
 * exactly -50%, so the loop point is seamless without measuring anything.
 * Forced to LTR: the rail is a continuous strip of Latin wordmarks, and letting
 * it reverse under RTL would only make the loop seam visible.
 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('mask-fade-x group relative overflow-hidden', className)} dir="ltr">
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="whitespace-nowrap px-8 font-mono text-[13px] uppercase tracking-[0.3em] text-chalk-faint transition-colors duration-500 hover:text-chalk-dim sm:px-12 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
