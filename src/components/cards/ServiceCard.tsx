import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePointerGlow } from '@/hooks/usePointerGlow';
import { Tag } from '@/components/ui/Tag';
import { useT } from '@/i18n/useT';
import type { Service } from '@/types';
import { cn } from '@/utils/cn';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const { ref, onPointerMove, onPointerLeave, enabled } = usePointerGlow<HTMLAnchorElement>();
  const t = useT();
  const Icon = service.icon;
  const [from, to] = service.accent;

  return (
    <Link
      ref={ref}
      to={`/services/${service.slug}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group relative flex flex-col overflow-hidden border border-white/[0.07] p-8 transition-colors duration-500 hover:border-white/[0.14] sm:p-10',
        className,
      )}
      style={{ '--px': '50%', '--py': '50%' } as React.CSSProperties}
    >
      {/* Each card keeps its own hue so the grid reads as six distinct
          practices; the cursor glow is what makes that colour visible. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.13]"
        style={{ background: `linear-gradient(155deg, ${from} 0%, transparent 55%, ${to} 100%)` }}
      />

      {enabled && (
        // Cursor-tracked glow. Positioned from CSS variables written by a rAF
        // handler, so hovering never re-renders the card.
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at var(--px) var(--py), ${from}26, transparent 70%)`,
          }}
        />
      )}

      {/* Top hairline that draws in from the leading edge on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 rtl:origin-right"
        style={{ background: `linear-gradient(90deg, ${from}, ${to}, transparent)` }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl border transition-all duration-500 ease-expo group-hover:-translate-y-0.5"
          style={{
            color: from,
            borderColor: `${from}33`,
            backgroundColor: `${from}12`,
          }}
        >
          <Icon
            className="h-5 w-5 transition-transform duration-500 ease-expo group-hover:scale-110"
            strokeWidth={1.5}
          />
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-chalk-faint">
          {service.index}
        </span>
      </div>

      <h3 className="relative mt-8 text-[22px] font-medium tracking-tight text-chalk sm:text-2xl">
        {service.title}
      </h3>
      <p className="relative mt-3 flex-1 text-[14.5px] leading-relaxed text-chalk-dim">
        {service.short}
      </p>

      <div className="relative mt-7 flex flex-wrap gap-2">
        {service.stack.slice(0, 4).map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.07] pt-6">
        <span className="text-[13px] text-chalk-dim transition-colors duration-500 group-hover:text-chalk">
          {t.common.exploreService}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-chalk-dim transition-all duration-500 ease-expo group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:text-chalk">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
