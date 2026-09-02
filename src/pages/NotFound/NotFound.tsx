import { Aurora } from '@/components/ui/Aurora';
import { ButtonLink } from '@/components/ui/Button';
import { useAccentZone } from '@/components/theme/SectionThemeProvider';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  const t = useT();
  const { company } = useContent();
  const ref = useAccentZone<HTMLElement>(['#ff5fa2', '#3d8bff']);

  usePageMeta({ title: `${t.notFound.eyebrow} — ${company.name}` });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80svh] items-center overflow-hidden pt-32"
    >
      <Aurora intensity="ambient" />

      <div className="shell relative text-center">
        <p className="eyebrow">{t.notFound.eyebrow}</p>
        <h1 className="display mx-auto mt-6 max-w-[14ch] text-balance text-[clamp(2.5rem,8vw,6rem)] text-chalk">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-chalk-dim">
          {t.notFound.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" withArrow magnetic>
            {t.common.backToHome}
          </ButtonLink>
          <ButtonLink to="/work" variant="secondary" magnetic>
            {t.common.seeOurWork}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
