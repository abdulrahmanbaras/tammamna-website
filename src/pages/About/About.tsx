import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { WhyUs } from '@/components/sections/WhyUs';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Counter } from '@/components/ui/Counter';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function About() {
  const t = useT();
  const { company, metrics, philosophy, values, team, timeline } = useContent();

  usePageMeta({
    title: `${t.nav.about} — ${company.name}`,
    description: t.about.description(company.founded),
  });

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description(company.founded)}
        accent={['#ffc8a2', '#c74bff']}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.about }]}
      />

      {/* Who we are */}
      <Section spacing="tight" accent={['#ff5fa2', '#7b5cff']}>
        <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-[0.75fr_1.4fr] lg:gap-20">
          <p className="eyebrow">{t.about.whoWeAre}</p>
          <div className="max-w-3xl space-y-6 text-[16px] leading-relaxed text-chalk-dim">
            {t.about.story.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission / vision */}
      <Section bordered spacing="tight" accent={['#c74bff', '#3d8bff']}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-2">
          {[
            { label: t.about.mission, text: t.about.missionText, accent: '#ff5fa2' },
            { label: t.about.vision, text: t.about.visionText, accent: '#3d8bff' },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className="panel relative p-9 sm:p-12">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
              />
              <p className="eyebrow mb-6" style={{ color: item.accent }}>
                {item.label}
              </p>
              <p className="text-[clamp(1.25rem,2.4vw,1.7rem)] font-light leading-snug tracking-tight text-chalk">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Metrics */}
      <Section bordered spacing="tight" accent={['#8ef0c0', '#3d8bff']}>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.07}>
              <dd className="display accent-text text-[clamp(2.6rem,6vw,4.25rem)]">
                <span dir="ltr" className="inline-block">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </span>
              </dd>
              <dt className="mt-3 text-[15px] text-chalk">{metric.label}</dt>
              <p className="mt-1.5 text-[13px] leading-relaxed text-chalk-faint">{metric.detail}</p>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Values */}
      <Section bordered spacing="tight" accent={['#ff5fa2', '#ffc8a2']}>
        <SectionHeading
          eyebrow={t.about.valuesEyebrow}
          title={t.about.valuesTitle}
          description={t.about.valuesDescription}
        />
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={(index % 2) * 0.08}>
              <div className="accent-border border-t pt-6">
                <h3 className="text-lg font-medium tracking-tight text-chalk">{value.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-chalk-dim">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engineering philosophy */}
      <Section bordered spacing="tight" accent={['#7b5cff', '#8ef0c0']}>
        <SectionHeading eyebrow={t.about.philosophyEyebrow} title={t.about.philosophyTitle} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
          {philosophy.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 0.08} className="panel p-8">
              <span className="accent-text font-mono text-[11px] tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-chalk">{item.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-chalk-dim">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section bordered spacing="tight" accent={['#3d8bff', '#c74bff']}>
        <SectionHeading eyebrow={t.about.historyEyebrow} title={t.about.historyTitle} />
        <ol className="mt-14 border-t border-white/[0.07]">
          {timeline.map((entry, index) => (
            <Reveal key={entry.year} delay={Math.min(index, 4) * 0.06} as="li">
              <div className="grid gap-3 border-b border-white/[0.07] py-7 md:grid-cols-[110px_260px_1fr] md:items-baseline md:gap-8">
                <span className="font-mono text-[13px] tracking-[0.12em] text-chalk-faint" dir="ltr">
                  {entry.year}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-chalk">{entry.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-chalk-dim">{entry.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Team */}
      <Section bordered spacing="tight" accent={['#ff5fa2', '#c74bff']}>
        <SectionHeading
          eyebrow={t.about.teamEyebrow}
          title={t.about.teamTitle}
          description={t.about.teamDescription}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={(index % 4) * 0.06} className="panel group p-7">
              <span
                className="grid h-14 w-14 place-items-center rounded-full font-mono text-[15px] text-ink-950 transition-transform duration-500 ease-expo group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${member.accent[0]}, ${member.accent[1]})`,
                }}
                aria-hidden
                lang="en"
                dir="ltr"
              >
                {member.initials}
              </span>
              <h3 className="mt-6 text-[16px] font-medium tracking-tight text-chalk">
                {member.name}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-chalk-dim">{member.role}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk-faint">
                {member.focus}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <WhyUs />

      <FinalCTA
        title={t.about.ctaTitle}
        description={t.about.ctaDescription}
        secondaryLabel={t.about.ctaSecondary}
        secondaryTo="/careers"
      />
    </>
  );
}
