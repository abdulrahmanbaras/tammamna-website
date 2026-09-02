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
import type { Industry } from '@/types';

export default function Industries() {
  const t = useT();
  const { industries, company } = useContent();

  usePageMeta({
    title: `${t.nav.industries} — ${company.name}`,
    description: t.industriesPage.description,
  });

  return (
    <>
      <PageHero
        eyebrow={t.industriesPage.eyebrow}
        title={t.industriesPage.title}
        description={t.industriesPage.description}
        accent={['#c74bff', '#ff5fa2']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.industries }]}
      />

      <Section spacing="tight" accent={industries[0].accent}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-2">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={(index % 2) * 0.08} className="panel">
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        title={t.industriesPage.ctaTitle}
        description={t.industriesPage.ctaDescription}
        secondaryLabel={t.common.ourProcess}
        secondaryTo="/process"
      />
    </>
  );
}

function IndustryCard({ industry }: { industry: Industry }) {
  const { ref, onPointerMove, onPointerLeave, enabled } = usePointerGlow<HTMLAnchorElement>();
  const Icon = industry.icon;
  const [from, to] = industry.accent;

  return (
    <Link
      ref={ref}
      to={`/industries/${industry.slug}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="group relative flex h-full flex-col overflow-hidden p-8 sm:p-12"
      style={{ '--px': '50%', '--py': '50%' } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] transition-opacity duration-700 group-hover:opacity-[0.14]"
        style={{ background: `linear-gradient(150deg, ${from} 0%, transparent 60%, ${to} 100%)` }}
      />

      {enabled && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--px) var(--py), ${from}24, transparent 68%)`,
          }}
        />
      )}

      <div className="relative flex items-start justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl border transition-transform duration-500 ease-expo group-hover:-translate-y-0.5"
          style={{ color: from, borderColor: `${from}33`, backgroundColor: `${from}12` }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
          {industry.index}
        </span>
      </div>

      <h2 className="relative mt-9 text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium tracking-tight text-chalk">
        {industry.name}
      </h2>
      <p className="relative mt-3 text-[15px] leading-snug text-chalk">{industry.headline}</p>
      <p className="relative mt-4 flex-1 text-[14.5px] leading-relaxed text-chalk-dim">
        {industry.description}
      </p>

      <dl className="relative mt-8 grid grid-cols-3 gap-4">
        {industry.stats.map((stat) => (
          <div key={stat.label} className="border-t border-white/[0.09] pt-4">
            <dd className="text-lg font-medium tracking-tight" style={{ color: to }}>
              <span dir="ltr" className="inline-block">
                {stat.value}
              </span>
            </dd>
            <dt className="mt-1 text-[11px] leading-snug text-chalk-faint">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {industry.regulations.slice(0, 3).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.08] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:text-chalk">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
