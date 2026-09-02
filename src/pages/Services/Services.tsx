import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Tag } from '@/components/ui/Tag';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';
import { usePointerGlow } from '@/hooks/usePointerGlow';
import type { Service } from '@/types';

export default function Services() {
  const t = useT();
  const { services, engagementModels, company } = useContent();

  usePageMeta({
    title: `${t.nav.services} — ${company.name}`,
    description: t.servicesPage.description,
  });

  return (
    <>
      <PageHero
        eyebrow={t.servicesPage.eyebrow}
        title={t.servicesPage.title}
        description={t.servicesPage.description}
        accent={['#ff5fa2', '#c74bff']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.services }]}
      />

      <Section spacing="tight" accent={['#ff5fa2', '#7b5cff']}>
        <div className="border-t border-white/[0.07]">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Section>

      <Section bordered spacing="tight" accent={['#7b5cff', '#3d8bff']}>
        <Reveal>
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
            {t.servicesPage.engageTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-chalk-dim">
            {t.servicesPage.engageDescription}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          {engagementModels.map((model, index) => (
            <Reveal key={model.title} delay={index * 0.08} className="panel p-8">
              <h3 className="text-lg font-medium tracking-tight text-chalk">{model.title}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-chalk-dim">
                {model.description}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint">
                {t.common.bestFor} · {model.fit}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        title={t.servicesPage.ctaTitle}
        description={t.servicesPage.ctaDescription}
        primaryLabel={t.servicesPage.ctaPrimary}
        secondaryLabel={t.servicesPage.ctaSecondary}
        secondaryTo="/process"
      />
    </>
  );
}

/**
 * Full-width service rows rather than a card grid — six cards would repeat the
 * home page, and the extra width lets each practice carry its own detail and
 * its own colour.
 */
function ServiceRow({ service, index }: { service: Service; index: number }) {
  const { ref, onPointerMove, onPointerLeave, enabled } = usePointerGlow<HTMLAnchorElement>();
  const Icon = service.icon;
  const [from, to] = service.accent;

  return (
    <Reveal delay={Math.min(index, 3) * 0.06}>
      <Link
        ref={ref}
        to={`/services/${service.slug}`}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group relative block overflow-hidden border-b border-white/[0.07] py-10 sm:py-12"
        style={{ '--px': '50%', '--py': '50%' } as React.CSSProperties}
      >
        {enabled && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(520px circle at var(--px) var(--py), ${from}1f, transparent 65%)`,
            }}
          />
        )}

        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-12">
          <div className="flex items-center gap-5 lg:w-56">
            <span className="font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
              {service.index}
            </span>
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-transform duration-500 ease-expo group-hover:scale-105"
              style={{ color: from, borderColor: `${from}33`, backgroundColor: `${from}12` }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium tracking-tight text-chalk transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {service.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-chalk-dim">{service.tagline}</p>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-chalk-faint">
              {service.overview[0]}
            </p>
            <div className="mt-6 flex flex-wrap gap-2" lang="en" dir="ltr">
              {service.stack.slice(0, 6).map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
            <dl className="flex gap-8 lg:flex-col lg:gap-4 lg:text-end">
              {service.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}>
                  <dd className="text-xl font-medium tracking-tight" style={{ color: to }}>
                    <span dir="ltr" className="inline-block">
                      {metric.value}
                    </span>
                  </dd>
                  <dt className="mt-1 max-w-[18ch] text-[11px] leading-snug text-chalk-faint">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
            <span className="ms-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.08] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:bg-white/[0.05] group-hover:text-chalk lg:ms-0">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
