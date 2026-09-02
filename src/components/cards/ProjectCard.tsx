import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { Tag } from '@/components/ui/Tag';
import { useT } from '@/i18n/useT';
import type { Project } from '@/types';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
  /** `feature` gets the taller visual used in the home-page grid. */
  variant?: 'feature' | 'list';
  className?: string;
  index?: number;
}

export function ProjectCard({
  project,
  variant = 'feature',
  className,
  index = 0,
}: ProjectCardProps) {
  const isFeature = variant === 'feature';
  const t = useT();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.75, delay: Math.min(index, 4) * 0.07, ease: EASE_EXPO }}
      className={cn('group relative', className)}
    >
      <Link to={`/work/${project.slug}`} className="block">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-white/[0.07] transition-colors duration-500 group-hover:border-white/[0.16]',
            isFeature ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[16/10]',
          )}
        >
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]">
            <ProjectVisual accent={project.accent} label={project.client} caption={project.year} />
          </div>

          {/* The project's own accent pair, always faintly present and
              resolving on hover — this is where colour lives in the grid. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `linear-gradient(140deg, ${project.accent[0]}2b 0%, transparent 45%, ${project.accent[1]}33 100%)`,
            }}
          />

          <div className="absolute end-5 top-5 translate-y-2 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/90 px-3.5 py-1.5 text-[12px] text-chalk lg:bg-ink-950/70 lg:backdrop-blur-md">
              {t.common.viewCaseStudy}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: project.accent[0] }}
                aria-hidden
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
                {project.industryLabel}
              </span>
              <span className="h-px w-6 bg-white/15" />
              <span className="font-mono text-[11px] text-chalk-faint">{project.year}</span>
            </div>
            <h3
              className={cn(
                'mt-3 font-medium tracking-tight text-chalk',
                isFeature ? 'text-[26px] sm:text-3xl' : 'text-xl sm:text-2xl',
              )}
            >
              {project.name}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-chalk-dim">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2 sm:max-w-[42%] sm:justify-end">
            {project.stack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
