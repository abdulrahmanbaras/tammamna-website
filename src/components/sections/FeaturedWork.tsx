import { ProjectCard } from '@/components/cards/ProjectCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

/**
 * Deliberately asymmetric: the first project runs full width, the next two sit
 * side by side, and the fourth returns to full width. A uniform grid is the
 * fastest way to make good work look like a template.
 */
export function FeaturedWork() {
  const t = useT();
  const { featuredProjects } = useContent();
  const [lead, second, third, fourth] = featuredProjects;

  return (
    <Section id="work" bordered accent={['#7b5cff', '#3d8bff']}>
      <SectionHeading
        eyebrow={t.home.work.eyebrow}
        title={t.home.work.title}
        description={t.home.work.description}
        action={
          <ButtonLink to="/work" variant="secondary" withArrow>
            {t.common.allCaseStudies}
          </ButtonLink>
        }
      />

      <div className="mt-16 space-y-16 sm:space-y-24">
        {lead && <ProjectCard project={lead} index={0} />}

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          {second && <ProjectCard project={second} variant="list" index={1} />}
          {third && <ProjectCard project={third} variant="list" index={2} className="lg:mt-20" />}
        </div>

        {fourth && <ProjectCard project={fourth} index={3} />}
      </div>
    </Section>
  );
}
