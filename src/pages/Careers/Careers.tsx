import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import type { JobOpening } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_EXPO } from '@/utils/motion';

export default function Careers() {
  const [openId, setOpenId] = useState<string | null>(null);
  const t = useT();
  const { openings, benefits, culture, hiringProcess, company } = useContent();

  usePageMeta({
    title: `${t.nav.careers} — ${company.name}`,
    description: t.careers.description,
  });

  return (
    <>
      <PageHero
        eyebrow={t.careers.eyebrow}
        title={t.careers.title}
        description={t.careers.description}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.careers }]}
        accent={['#8ef0c0', '#7b5cff']}
      />

      {/* Culture */}
      <Section spacing="tight" accent={['#8ef0c0', '#3d8bff']}>
        <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <p className="eyebrow">{t.careers.whyWorkHere}</p>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {culture.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 0.08}>
                <h3 className="text-lg font-medium tracking-tight text-chalk">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-chalk-dim">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section bordered spacing="tight" accent={['#ffc8a2', '#ff5fa2']}>
        <SectionHeading
          eyebrow={t.careers.benefitsEyebrow}
          title={t.careers.benefitsTitle}
          description={t.careers.benefitsDescription}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={(index % 4) * 0.06} className="panel group p-7">
              <span
                aria-hidden
                className="accent-rule mb-5 block h-px w-6 origin-left transition-transform duration-500 ease-expo group-hover:scale-x-[2] rtl:origin-right"
              />
              <h3 className="text-[15.5px] font-medium tracking-tight text-chalk">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-chalk-dim">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Openings */}
      <Section bordered spacing="tight" accent={['#c74bff', '#3d8bff']}>
        <SectionHeading
          eyebrow={t.careers.openingsEyebrow(openings.length)}
          title={t.careers.openingsTitle}
          description={t.careers.openingsDescription}
        />

        <div className="mt-14 border-t border-white/[0.07]">
          {openings.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              careersEmail={company.careersEmail}
              open={openId === job.id}
              onToggle={() => setOpenId((current) => (current === job.id ? null : job.id))}
            />
          ))}
        </div>
      </Section>

      {/* Hiring process */}
      <Section bordered spacing="tight" accent={['#7b5cff', '#8ef0c0']}>
        <SectionHeading
          eyebrow={t.careers.hiringEyebrow}
          title={t.careers.hiringTitle}
          description={t.careers.hiringDescription}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {hiringProcess.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.07} className="panel p-8">
              <span className="accent-text font-mono text-[11px] tracking-[0.2em]">
                {step.step}
              </span>
              <h3 className="mt-4 text-[16.5px] font-medium tracking-tight text-chalk">
                {step.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-chalk-dim">{step.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        title={t.careers.ctaTitle}
        description={t.careers.ctaDescription(company.careersEmail)}
        primaryLabel={t.careers.ctaPrimary}
        primaryTo="/contact"
        secondaryLabel={t.careers.ctaSecondary}
        secondaryTo="/about"
      />
    </>
  );
}

function JobCard({
  job,
  index,
  open,
  onToggle,
  careersEmail,
}: {
  job: JobOpening;
  index: number;
  open: boolean;
  onToggle: () => void;
  careersEmail: string;
}) {
  const t = useT();
  const panelId = `${job.id}-panel`;

  return (
    <Reveal delay={Math.min(index, 4) * 0.05}>
      <div className="border-b border-white/[0.07]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-6 py-8 text-start"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-[clamp(1.3rem,2.8vw,1.85rem)] font-medium tracking-tight text-chalk transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {job.title}
              </h3>
              <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-faint">
                {job.level}
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
              {job.team} · {job.location} · {job.type}
            </p>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-chalk-dim">
              {job.summary}
            </p>
          </div>

          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.09] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:text-chalk">
            {open ? (
              <Minus className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={1.5} />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="overflow-hidden"
            >
              <div className="grid gap-10 pb-10 md:grid-cols-3">
                <JobList title={t.careers.responsibilities} items={job.responsibilities} />
                <JobList title={t.careers.requirements} items={job.requirements} />
                <div>
                  <JobList title={t.careers.niceToHave} items={job.niceToHave} muted />
                  <a
                    href={`mailto:${careersEmail}?subject=${encodeURIComponent(
                      t.careers.applySubject(job.title),
                    )}`}
                    className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-chalk px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-white"
                  >
                    {t.careers.apply}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function JobList({ title, items, muted }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={`flex gap-3 text-[14px] leading-relaxed ${
              muted ? 'text-chalk-faint' : 'text-chalk-dim'
            }`}
          >
            <span className="accent-dot mt-[9px] h-1 w-1 shrink-0 rounded-full opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
