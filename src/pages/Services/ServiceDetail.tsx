import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const { serviceBySlug, services, projectsBySlugs, company } = useContent();
  const service = slug ? serviceBySlug(slug) : undefined;

  usePageMeta({
    title: service ? `${service.title} — ${company.name}` : `${t.nav.services} — ${company.name}`,
    description: service?.tagline,
  });

  if (!service) return <Navigate to="/services" replace />;

  const related = projectsBySlugs(service.relatedProjects);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={t.serviceDetail.label(service.index)}
        title={service.tagline}
        description={service.short}
        accent={service.accent}
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.nav.services, to: '/services' },
          { label: service.title },
        ]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink to="/contact" withArrow magnetic>
            {t.serviceDetail.discuss(service.title)}
          </ButtonLink>
          <span
            className="grid h-11 w-11 place-items-center rounded-xl border"
            style={{
              color: service.accent[0],
              borderColor: `${service.accent[0]}33`,
              backgroundColor: `${service.accent[0]}12`,
            }}
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </div>
      </PageHero>

      {/* Overview + metrics */}
      <Section spacing="tight" accent={service.accent}>
        <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{t.serviceDetail.overview}</p>
            {service.overview.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="mb-5 max-w-2xl text-[15.5px] leading-relaxed text-chalk-dim">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <dl className="space-y-6">
              {service.metrics.map((metric) => (
                <div key={metric.label} className="border-t border-white/[0.09] pt-5">
                  <dd className="display accent-text text-[clamp(1.8rem,3.4vw,2.6rem)]">
                    <span dir="ltr" className="inline-block">
                      {metric.value}
                    </span>
                  </dd>
                  <dt className="mt-2 text-[13.5px] leading-relaxed text-chalk-faint">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* What we provide */}
      <Section bordered spacing="tight" accent={[service.accent[1], service.accent[0]]}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{t.serviceDetail.provideEyebrow}</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
              {t.serviceDetail.provideTitle}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-chalk-dim">
              {t.serviceDetail.provideDescription}
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
            {service.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} as="li" className="panel p-6">
                <span className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: service.accent[1] }}
                    strokeWidth={2}
                  />
                  <span className="text-[14.5px] leading-relaxed text-chalk-dim">{item}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Capabilities */}
      <Section bordered spacing="tight" accent={service.accent}>
        <p className="eyebrow mb-6">{t.serviceDetail.capabilitiesEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.serviceDetail.capabilitiesTitle}
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {service.capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={(index % 2) * 0.08} className="group">
              <div className="flex items-start gap-5">
                <span
                  className="mt-1.5 font-mono text-[11px] tracking-[0.2em]"
                  style={{ color: index % 2 === 0 ? service.accent[0] : service.accent[1] }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-chalk">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-chalk-dim">
                    {capability.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section bordered spacing="tight" accent={[service.accent[1], service.accent[0]]}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">{t.common.technologies}</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
              {t.serviceDetail.stackTitle}
            </h2>
          </div>
          <ButtonLink to="/technologies" variant="secondary" withArrow>
            {t.serviceDetail.whyThese}
          </ButtonLink>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5" lang="en" dir="ltr">
            {service.stack.map((tech) => (
              <Tag key={tech} className="px-4 py-2 text-[12px]">
                {tech}
              </Tag>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Related work */}
      {related.length > 0 && (
        <Section bordered spacing="tight" accent={related[0].accent}>
          <p className="eyebrow mb-6">{t.serviceDetail.relatedEyebrow}</p>
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
            {t.serviceDetail.relatedTitle}
          </h2>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
            {related.map((project, index) => (
              <ProjectCard key={project.slug} project={project} variant="list" index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Other services */}
      <Section bordered spacing="tight" accent={service.accent}>
        <p className="eyebrow mb-8">{t.serviceDetail.otherPractices}</p>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          {others.map((other, index) => (
            <Reveal key={other.slug} delay={index * 0.07} className="panel">
              <Link
                to={`/services/${other.slug}`}
                className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-white/[0.02]"
              >
                <div>
                  <span
                    className="font-mono text-[11px] tracking-[0.2em]"
                    style={{ color: other.accent[0] }}
                  >
                    {other.index}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight text-chalk">
                    {other.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-chalk-dim">{other.short}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-chalk-faint transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:text-chalk rtl:-scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        title={t.serviceDetail.ctaTitle(service.title)}
        description={t.serviceDetail.ctaDescription}
        secondaryLabel={t.common.allServices}
        secondaryTo="/services"
      />
    </>
  );
}
