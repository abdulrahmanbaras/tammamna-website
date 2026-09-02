import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { Tag } from '@/components/ui/Tag';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { useLocale } from '@/i18n/LocaleContext';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const { isRTL } = useLocale();
  const { projectBySlug, projects, projectCategoryLabels, company } = useContent();
  const project = slug ? projectBySlug(slug) : undefined;

  usePageMeta({
    title: project ? `${project.name} — ${company.name}` : `${t.nav.work} — ${company.name}`,
    description: project?.summary,
  });

  if (!project) return <Navigate to="/work" replace />;

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const flipped: [string, string] = [project.accent[1], project.accent[0]];

  return (
    <>
      <PageHero
        eyebrow={`${project.industryLabel} · ${project.year}`}
        title={project.name}
        description={project.description}
        accent={project.accent}
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.nav.work, to: '/work' },
          { label: project.name },
        ]}
      >
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
          {[
            [t.caseStudy.meta.client, project.client],
            [t.caseStudy.meta.industry, project.industryLabel],
            [t.caseStudy.meta.year, project.year],
            [
              t.caseStudy.meta.disciplines,
              project.categories
                .map((category) => projectCategoryLabels[category])
                .join(isRTL ? '، ' : ', '),
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                {label}
              </dt>
              <dd className="mt-2 text-[14.5px] text-chalk">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Hero visual */}
      <Section spacing="tight" full accent={project.accent}>
        <div className="shell">
          <Reveal>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.07] sm:aspect-[21/9]">
              <ProjectVisual
                accent={project.accent}
                label={project.client}
                caption={project.summary}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Challenge */}
      <Section bordered spacing="tight" accent={flipped}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{t.caseStudy.challengeEyebrow}</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
              {t.caseStudy.challengeTitle}
            </h2>
          </div>
          <div>
            {project.challenge.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="mb-6 text-[15.5px] leading-relaxed text-chalk-dim">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section bordered spacing="tight" accent={project.accent}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{t.caseStudy.solutionEyebrow}</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
              {t.caseStudy.solutionTitle}
            </h2>
          </div>
          <div>
            {project.solution.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="mb-6 text-[15.5px] leading-relaxed text-chalk-dim">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section bordered spacing="tight" accent={flipped}>
        <p className="eyebrow mb-6">{t.caseStudy.featuresEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.caseStudy.featuresTitle}
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.07} className="panel p-7">
              <span
                className="font-mono text-[11px] tracking-[0.2em]"
                style={{ color: index % 2 === 0 ? project.accent[0] : project.accent[1] }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-[16.5px] font-medium tracking-tight text-chalk">
                {feature.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-chalk-dim">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Screens */}
      <Section bordered spacing="tight" accent={project.accent}>
        <p className="eyebrow mb-6">{t.caseStudy.screensEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.caseStudy.screensTitle}
        </h2>
        <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-chalk-faint">
          {t.caseStudy.screensNote}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {project.screens.map((screen, index) => (
            <Parallax key={screen.label} distance={index % 2 === 0 ? 28 : 46}>
              <Reveal delay={(index % 2) * 0.08}>
                <div className="aspect-[16/11] overflow-hidden rounded-xl border border-white/[0.07]">
                  <ProjectVisual
                    accent={index % 2 === 0 ? project.accent : flipped}
                    label={screen.label}
                    caption={screen.caption}
                    density={index % 3 === 2 ? 'compact' : 'full'}
                  />
                </div>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section bordered spacing="tight" accent={flipped}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">{t.caseStudy.stackEyebrow}</p>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
              {t.caseStudy.stackTitle}
            </h2>
          </div>
          <Reveal>
            <div className="flex flex-wrap gap-2.5" lang="en" dir="ltr">
              {project.stack.map((tech) => (
                <Tag key={tech} className="px-4 py-2 text-[12px]">
                  {tech}
                </Tag>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Results */}
      <Section bordered spacing="tight" accent={project.accent}>
        <p className="eyebrow mb-6">{t.caseStudy.resultsEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.caseStudy.resultsTitle}
        </h2>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
          {project.results.map((result, index) => (
            <Reveal key={result.label} delay={index * 0.07} className="panel p-7 sm:p-9">
              <dd
                className="display text-[clamp(2rem,4vw,3rem)]"
                style={{ color: index % 2 === 0 ? project.accent[0] : project.accent[1] }}
              >
                <span dir="ltr" className="inline-block">
                  {result.value}
                </span>
              </dd>
              <dt className="mt-3 text-[13.5px] leading-relaxed text-chalk-dim">{result.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Process */}
      <Section bordered spacing="tight" accent={flipped}>
        <p className="eyebrow mb-6">{t.caseStudy.deliveryEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.caseStudy.deliveryTitle}
        </h2>

        <ol className="mt-14 border-t border-white/[0.07]">
          {project.process.map((phase, index) => (
            <Reveal key={phase.phase} delay={Math.min(index, 4) * 0.06} as="li">
              <div className="grid gap-3 border-b border-white/[0.07] py-7 md:grid-cols-[80px_200px_1fr] md:items-baseline md:gap-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-chalk">{phase.phase}</h3>
                <p className="text-[14.5px] leading-relaxed text-chalk-dim">{phase.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Testimonial */}
      {project.testimonial && (
        <Section bordered spacing="tight" accent={project.accent}>
          <Reveal>
            <figure className="panel relative overflow-hidden rounded-2xl border border-white/[0.07] p-8 sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background: `radial-gradient(60% 90% at 10% 0%, ${project.accent[0]}2b 0%, transparent 60%)`,
                }}
              />
              <Quote
                className="relative h-8 w-8 rtl:-scale-x-100"
                style={{ color: project.accent[0] }}
                strokeWidth={1.2}
                aria-hidden
              />
              <blockquote className="relative mt-6 max-w-3xl text-[clamp(1.15rem,2.4vw,1.7rem)] font-light leading-relaxed tracking-tight text-chalk">
                “{project.testimonial.quote}”
              </blockquote>
              <figcaption className="relative mt-8 text-[14px] text-chalk-dim">
                <span className="text-chalk">{project.testimonial.name}</span> ·{' '}
                {project.testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        </Section>
      )}

      {/* Next project */}
      <Section bordered spacing="tight" accent={nextProject.accent}>
        <Link
          to={`/work/${nextProject.slug}`}
          className="group flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow mb-4">{t.caseStudy.nextEyebrow}</p>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-chalk transition-transform duration-700 ease-expo group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
              {nextProject.name}
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] text-chalk-dim">{nextProject.summary}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/[0.09] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:bg-white/[0.05] group-hover:text-chalk">
            <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:-scale-x-100" />
          </span>
        </Link>
      </Section>

      <FinalCTA
        title={t.caseStudy.ctaTitle}
        description={t.caseStudy.ctaDescription}
        secondaryLabel={t.common.allCaseStudies}
        secondaryTo="/work"
      />
    </>
  );
}
