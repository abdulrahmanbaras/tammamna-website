/**
 * The page-wide colour wash that follows scroll position.
 *
 * Each blob's colour comes from `--accent-a` / `--accent-b`, which
 * `SectionThemeProvider` rewrites as sections enter the viewport. The colour is
 * applied as `background-color` on a blurred, masked circle rather than as a
 * gradient stop, because `background-color` is animatable — `background-image`
 * is not — so the whole page cross-fades between accents in pure CSS.
 */
export function AmbientField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-ink-950" />

      <span
        className="absolute -start-[15%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.16] blur-[45px] lg:blur-[110px] transition-[background-color] duration-[1400ms] ease-out"
        style={{ backgroundColor: 'var(--accent-a, #c74bff)' }}
      />
      <span
        className="absolute -end-[20%] top-[25%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.13] blur-[50px] lg:blur-[120px] transition-[background-color] duration-[1600ms] ease-out"
        style={{ backgroundColor: 'var(--accent-b, #3d8bff)' }}
      />
      <span
        className="absolute bottom-[-25%] start-[30%] hidden h-[55vmax] w-[55vmax] rounded-full opacity-[0.09] blur-[130px] lg:block transition-[background-color] duration-[1800ms] ease-out"
        style={{ backgroundColor: 'var(--accent-a, #c74bff)' }}
      />

      {/* Keeps the centre of the viewport dark enough for body copy to hold contrast. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 55% at 50% 50%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.5) 55%, rgba(5,5,5,0.25) 100%)',
        }}
      />
      <div className="grain absolute inset-0 hidden opacity-[0.14] lg:block" />
    </div>
  );
}
