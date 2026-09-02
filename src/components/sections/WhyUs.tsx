import { Reveal } from '@/components/animations/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

export function WhyUs() {
  const t = useT();
  const { whyUs } = useContent();

  return (
    <Section id="why-us" bordered accent={['#8ef0c0', '#3d8bff']}>
      <SectionHeading
        eyebrow={t.home.whyUs.eyebrow}
        title={t.home.whyUs.title}
        description={t.home.whyUs.description}
      />

      <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        {whyUs.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 0.08} className="group">
            <div className="flex items-start gap-5">
              <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="relative inline-block text-lg font-medium tracking-tight text-chalk">
                  {item.title}
                  <span
                    aria-hidden
                    className="accent-rule absolute -bottom-1 start-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 rtl:origin-right"
                  />
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-chalk-dim">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
