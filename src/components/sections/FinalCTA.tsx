import { Aurora } from '@/components/ui/Aurora';
import { ButtonLink } from '@/components/ui/Button';
import { TextReveal } from '@/components/animations/TextReveal';
import { Reveal } from '@/components/animations/Reveal';
import { useAccentZone } from '@/components/theme/SectionThemeProvider';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

interface FinalCTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function FinalCTA({
  title,
  description,
  primaryLabel,
  primaryTo = '/contact',
  secondaryLabel,
  secondaryTo = '/work',
}: FinalCTAProps) {
  const t = useT();
  const { company } = useContent();
  const ref = useAccentZone<HTMLElement>(['#c74bff', '#3d8bff']);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/[0.07]">
      <Aurora intensity="ambient" />

      <div className="shell relative py-28 text-center sm:py-40">
        <TextReveal
          text={title ?? t.cta.title}
          as="h2"
          className="display mx-auto max-w-[15ch] text-balance text-[clamp(2.4rem,7vw,5.5rem)] text-chalk"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-chalk-dim sm:text-base">
            {description ?? t.cta.description}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <ButtonLink to={primaryTo} size="lg" withArrow magnetic>
              {primaryLabel ?? t.common.startProject}
            </ButtonLink>
            <ButtonLink to={secondaryTo} size="lg" variant="secondary" magnetic>
              {secondaryLabel ?? t.common.seeOurWork}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.24em] text-chalk-faint">
            {t.common.or}{' '}
            <a
              href={`mailto:${company.email}`}
              className="link-underline text-chalk-dim transition-colors hover:text-chalk"
              dir="ltr"
            >
              {company.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
