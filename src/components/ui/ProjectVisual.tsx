import { cn } from '@/utils/cn';

interface ProjectVisualProps {
  accent: [string, string];
  label: string;
  caption?: string;
  className?: string;
  /** Small variants drop the internal chrome so they stay readable. */
  density?: 'full' | 'compact';
}

/**
 * A generated abstract "screenshot" stand-in. Real client UI is under NDA on
 * most engagements, and stock mockups look like stock mockups — so we render a
 * deterministic composition from the project's own accent pair instead.
 */
export function ProjectVisual({
  accent,
  label,
  caption,
  className,
  density = 'full',
}: ProjectVisualProps) {
  const [from, to] = accent;

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-ink-900',
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.55] transition-opacity duration-700"
        style={{
          background: `radial-gradient(90% 80% at 18% 8%, ${from}66 0%, transparent 60%), radial-gradient(80% 90% at 88% 92%, ${to}59 0%, transparent 62%)`,
        }}
      />
      <div className="grid-lines absolute inset-0 opacity-70" />

      {/* A suggestion of an interface: a rail, a header bar, and data rows. */}
      {density === 'full' && (
        <div className="absolute inset-0 flex">
          <div className="hidden w-[18%] flex-col gap-3 border-e border-white/[0.06] p-5 sm:flex">
            <div className="h-2 w-10 rounded-full bg-white/20" />
            {[0.5, 0.35, 0.28, 0.2, 0.16].map((opacity, index) => (
              <div
                key={index}
                className="h-1.5 rounded-full bg-white"
                style={{ opacity: opacity * 0.35, width: `${50 + index * 8}%` }}
              />
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-6 rounded-md"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              />
              <div className="h-2 w-24 rounded-full bg-white/15" />
              <div className="ms-auto h-2 w-12 rounded-full bg-white/10" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3"
                >
                  <div className="h-1.5 w-8 rounded-full bg-white/15" />
                  <div
                    className="mt-3 h-3 rounded-full"
                    style={{
                      width: `${58 + index * 12}%`,
                      background: `linear-gradient(90deg, ${from}, ${to})`,
                      opacity: 0.7,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-1 items-end gap-1.5">
              {[38, 62, 48, 74, 55, 88, 66, 92, 71, 58, 80, 46].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(180deg, ${index % 3 === 0 ? to : from}bb, transparent)`,
                    opacity: 0.42,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-dim">
          {label}
        </span>
        {caption && (
          <span className="hidden max-w-[45%] text-end text-[11px] leading-snug text-chalk-faint sm:block">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
