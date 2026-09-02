import { Reveal } from '@/components/animations/Reveal';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

export function ServicesGrid() {
  const t = useT();
  const { services } = useContent();

  return (
    <Section id="services" bordered accent={['#ff5fa2', '#c74bff']}>
      <SectionHeading
        eyebrow={t.home.services.eyebrow}
        title={t.home.services.title}
        description={t.home.services.description}
        action={
          <ButtonLink to="/services" variant="secondary" withArrow>
            {t.common.allServices}
          </ButtonLink>
        }
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            key={service.slug}
            delay={(index % 3) * 0.08}
            distance={22}
            className="panel h-full"
          >
            <ServiceCard service={service} className="h-full border-0 bg-transparent" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
