import { Reveal } from '@/components/animations/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Marquee } from '@/components/ui/Marquee';
import { Section } from '@/components/ui/Section';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

export function Metrics() {
  const t = useT();
  const { metrics, clientLogos } = useContent();

  return (
    <Section
      id="metrics"
      spacing="tight"
      className="border-t border-white/[0.07]"
      accent={['#ffc8a2', '#ff5fa2']}
    >
      <Reveal>
        <p className="eyebrow mb-10 text-center">{t.home.trustedBy}</p>
      </Reveal>

      <Marquee items={clientLogos} className="mb-20" />

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.08} className="group relative panel p-7 sm:p-9">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 rtl:origin-right"
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--accent-a), var(--accent-b))',
              }}
            />
            <dd className="display accent-text text-[clamp(2.4rem,5vw,3.6rem)]">
              {/* Isolated as LTR so a trailing "+" or "%" stays on the right
                  of the digits when the page direction is RTL. */}
              <span dir="ltr" className="inline-block">
                <Counter value={metric.value} suffix={metric.suffix} />
              </span>
            </dd>
            <dt className="mt-3 text-sm text-chalk">{metric.label}</dt>
            <p className="mt-1.5 text-[13px] leading-relaxed text-chalk-faint">{metric.detail}</p>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
