import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, Check } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Tag } from '@/components/ui/Tag';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const { industryBySlug, industries, projectBySlug, projects, company } = useContent();
  const industry = slug ? industryBySlug(slug) : undefined;

  usePageMeta({
    title: industry ? `${industry.name} — ${company.name}` : `${t.nav.industries} — ${company.name}`,
    description: industry?.headline,
  });

  if (!industry) return <Navigate to="/industries" replace />;

  const featured = projectBySlug(industry.caseStudy);
  const others = projects.filter(
    (project) => project.industry === industry.slug && project.slug !== industry.caseStudy,
  );
  const flipped: [string, string] = [industry.accent[1], industry.accent[0]];

  return (
    <>
      <PageHero
        eyebrow={t.industryDetail.label(industry.index)}
        title={industry.headline}
        description={industry.description}
        accent={industry.accent}
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.nav.industries, to: '/industries' },
          { label: industry.name },
        ]}
      >
        <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8 sm:max-w-2xl">
          {industry.stats.map((stat) => (
            <div key={stat.label}>
              <dd
                className="display text-[clamp(1.5rem,3vw,2.25rem)]"
                style={{ color: industry.accent[0] }}
              >
                <span dir="ltr" className="inline-block">
                  {stat.value}
                </span>
              </dd>
              <dt className="mt-2 text-[12px] leading-snug text-chalk-faint">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Challenges vs solutions, side by side */}
      <Section spacing="tight" accent={industry.accent}>
        <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-chalk-faint" strokeWidth={1.5} />
              <p className="eyebrow">{t.industryDetail.challenges}</p>
            </div>
            <ul className="space-y-5">
              {industry.challenges.map((challenge, index) => (
                <Reveal key={challenge} delay={index * 0.06} as="li">
                  <span className="flex gap-4 border-b border-white/[0.06] pb-5 text-[15px] leading-relaxed text-chalk-dim">
                    <span className="font-mono text-[11px] text-chalk-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {challenge}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-8 flex items-center gap-3">
              <Check className="h-4 w-4" style={{ color: industry.accent[1] }} strokeWidth={2} />
              <p className="eyebrow">{t.industryDetail.solutions}</p>
            </div>
            <div className="space-y-5">
              {industry.solutions.map((solution, index) => (
                <Reveal key={solution.title} delay={index * 0.06}>
                  <div className="border-b border-white/[0.06] pb-5">
                    <h3 className="text-[16px] font-medium tracking-tight text-chalk">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-chalk-dim">
                      {solution.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stack + compliance */}
      <Section bordered spacing="tight" accent={flipped}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-6">{t.industryDetail.techTitle}</p>
            <div className="flex flex-wrap gap-2.5" lang="en" dir="ltr">
              {industry.technologies.map((tech) => (
                <Tag key={tech} className="px-4 py-2 text-[12px]">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">{t.industryDetail.standardsTitle}</p>
            <div className="flex flex-wrap gap-2.5">
              {industry.regulations.map((item) => (
                <Tag key={item} active className="px-4 py-2 text-[12px]">
                  {item}
                </Tag>
              ))}
            </div>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-chalk-faint">
              {t.industryDetail.standardsNote}
            </p>
          </div>
        </div>
      </Section>

      {/* Related work */}
      <Section bordered spacing="tight" accent={featured?.accent ?? industry.accent}>
        <p className="eyebrow mb-6">{t.industryDetail.caseStudyEyebrow}</p>
        <h2 className="display max-w-2xl text-[clamp(1.8rem,3.6vw,2.75rem)] text-chalk">
          {t.industryDetail.caseStudyTitle(industry.name)}
        </h2>

        <div className="mt-14 space-y-16">
          {featured && <ProjectCard project={featured} index={0} />}
          {others.length > 0 && (
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
              {others.map((project, index) => (
                <ProjectCard key={project.slug} project={project} variant="list" index={index + 1} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Other industries */}
      <Section bordered spacing="tight" accent={industry.accent}>
        <p className="eyebrow mb-8">{t.industryDetail.otherDomains}</p>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
          {industries
            .filter((item) => item.slug !== industry.slug)
            .map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.07} className="panel">
                <Link
                  to={`/industries/${item.slug}`}
                  className="group block h-full p-8 transition-colors duration-500 hover:bg-white/[0.02]"
                >
                  <span
                    className="mb-4 block h-1 w-8 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${item.accent[0]}, ${item.accent[1]})`,
                    }}
                    aria-hidden
                  />
                  <h3 className="text-lg font-medium tracking-tight text-chalk">{item.name}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-chalk-dim">{item.headline}</p>
                </Link>
              </Reveal>
            ))}
        </div>
      </Section>

      <FinalCTA
        title={t.industryDetail.ctaTitle(industry.name)}
        description={t.industryDetail.ctaDescription}
        secondaryLabel={t.common.allIndustries}
        secondaryTo="/industries"
      />
    </>
  );
}
