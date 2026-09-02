import { Hero } from '@/components/sections/Hero';
import { Metrics } from '@/components/sections/Metrics';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { TechShowcase } from '@/components/sections/TechShowcase';
import { IndustriesSwitcher } from '@/components/sections/IndustriesSwitcher';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { WhyUs } from '@/components/sections/WhyUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useT } from '@/i18n/useT';
import { useContent } from '@/data/useContent';

export default function Home() {
  const t = useT();
  const { company } = useContent();

  usePageMeta({
    title: `${company.name} — ${company.tagline}`,
    description: t.hero.description,
  });

  return (
    <>
      <Hero />
      <Metrics />
      <ServicesGrid />
      <FeaturedWork />
      <TechShowcase />
      <IndustriesSwitcher />
      <ProcessTimeline />
      <WhyUs />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
