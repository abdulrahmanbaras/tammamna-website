import { Fragment, useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { categoryAccent } from '@/data/technologies';
import { useContent } from '@/data/useContent';
import { useLocale } from '@/i18n/LocaleContext';
import { useIsTouchOrSmall } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { TechCategory, Technology } from '@/types';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface TechTreeProps {
  /** Fires with the technology under the pointer, or null when it leaves. */
  onHoverTech?: (name: string | null) => void;
  /** Fires with the category whose branch is currently open. */
  onCategoryChange?: (category: TechCategory) => void;
  className?: string;
}

/* Stage geometry, in the SVG's 0–100 space. The HTML nodes and leaves are
   positioned from these same numbers, which is what keeps the branches
   attached without measuring anything in the DOM. */
const TRUNK_X = 32;
const LEAF_X = 64;
const LEAF_TOP = 8;
const LEAF_BOTTOM = 92;

const nodeY = (index: number, total: number) => ((index + 0.5) / total) * 100;

const leafY = (index: number, total: number) =>
  total === 1 ? 50 : LEAF_TOP + (index / (total - 1)) * (LEAF_BOTTOM - LEAF_TOP);

/**
 * The stack as a tree rather than a list: a trunk of categories on the reading
 * side, and the members of the open category growing out along drawn branches.
 *
 * Every name in one flat cloud is a wall of text — the grouping is the
 * information, so the layout is built around it. Under a coarse pointer or a
 * small viewport the branch geometry has nowhere to go, so it degrades to the
 * same grouping as plain chip lists.
 */
export function TechTree({ onHoverTech, onCategoryChange, className }: TechTreeProps) {
  const { technologies, techCategories, techCategoryLabels } = useContent();
  const [active, setActive] = useState<TechCategory>(techCategories[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const compact = useIsTouchOrSmall();
  const { isRTL } = useLocale();
  const gradientId = useId();

  const grouped = useMemo(() => {
    const map = new Map<TechCategory, Technology[]>(
      techCategories.map((category) => [category, []]),
    );
    for (const tech of technologies) map.get(tech.category)?.push(tech);
    return map;
  }, [technologies, techCategories]);

  const selectCategory = (category: TechCategory) => {
    setActive(category);
    setHovered(null);
    onHoverTech?.(null);
    onCategoryChange?.(category);
  };

  const hoverTech = (name: string | null) => {
    setHovered(name);
    onHoverTech?.(name);
  };

  const leaves = grouped.get(active) ?? [];
  const activeY = nodeY(techCategories.indexOf(active), techCategories.length);
  const [branchFrom, branchTo] = categoryAccent[active];

  if (compact) {
    return (
      <div className={cn('flex flex-col gap-8', className)}>
        {techCategories.map((category) => {
          const items = grouped.get(category) ?? [];
          const [from, to] = categoryAccent[category];

          return (
            <div key={category}>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                />
                <span className="text-[13px] text-chalk">{techCategoryLabels[category]}</span>
                <span className="font-mono text-[10px] text-chalk-faint">{items.length}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 ps-[18px]">
                {items.map((tech) => (
                  <button
                    key={tech.name}
                    type="button"
                    lang="en"
                    dir="ltr"
                    onClick={() => hoverTech(hovered === tech.name ? null : tech.name)}
                    aria-pressed={hovered === tech.name}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-300',
                      hovered === tech.name
                        ? 'border-white/25 bg-white/[0.06] text-chalk'
                        : 'border-white/[0.09] text-chalk-dim',
                    )}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn('relative h-[430px] w-full', className)}
      onMouseLeave={() => hoverTech(null)}
    >
      {/* Branch layer. Mirrored wholesale under RTL — it holds no text, and the
          nodes and leaves above it already flip via logical inset properties. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full rtl:-scale-x-100"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={branchFrom} stopOpacity="0.9" />
            {/* Softens outward but never to nothing — the branch has to still
                read where it meets its leaf. */}
            <stop offset="100%" stopColor={branchTo} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <line
          x1={TRUNK_X}
          y1={nodeY(0, techCategories.length)}
          x2={TRUNK_X}
          y2={nodeY(techCategories.length - 1, techCategories.length)}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />

        {/* Keyed by category so the branches redraw from the trunk on every
            switch instead of morphing between two unrelated shapes. */}
        <g key={active}>
          {leaves.map((tech, index) => (
            <motion.path
              key={tech.name}
              d={`M ${TRUNK_X} ${activeY} C ${TRUNK_X + 13} ${activeY}, ${LEAF_X - 14} ${leafY(
                index,
                leaves.length,
              )}, ${LEAF_X - 1} ${leafY(index, leaves.length)}`}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={1.25}
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_EXPO }}
            />
          ))}
        </g>
      </svg>

      {techCategories.map((category, index) => {
        const isActive = category === active;
        const [from, to] = categoryAccent[category];

        return (
          <button
            key={category}
            type="button"
            onMouseEnter={() => selectCategory(category)}
            onFocus={() => selectCategory(category)}
            onClick={() => selectCategory(category)}
            aria-expanded={isActive}
            style={{ top: `${nodeY(index, techCategories.length)}%` }}
            className={cn(
              'absolute start-0 flex w-[30%] -translate-y-1/2 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start transition-colors duration-500',
              isActive
                ? 'border-white/20 bg-white/[0.05] text-chalk'
                : 'border-white/[0.07] text-chalk-dim hover:border-white/15 hover:text-chalk',
            )}
          >
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full transition-transform duration-500 ease-expo"
              style={{
                background: `linear-gradient(135deg, ${from}, ${to})`,
                transform: isActive ? 'scale(1.5)' : 'scale(1)',
              }}
            />
            <span className="truncate text-[12.5px]">{techCategoryLabels[category]}</span>
            {/* No `dir` here either: it would flip which side `ms-auto`
                pushes against. A bare integer needs no isolation anyway. */}
            <span className="ms-auto font-mono text-[10px] text-chalk-faint">
              {(grouped.get(category) ?? []).length}
            </span>
          </button>
        );
      })}

      <Fragment key={active}>
        {leaves.map((tech, index) => {
          const isHovered = hovered === tech.name;

          return (
            <motion.button
              key={tech.name}
              type="button"
              onMouseEnter={() => hoverTech(tech.name)}
              onFocus={() => hoverTech(tech.name)}
              onClick={() => hoverTech(isHovered ? null : tech.name)}
              aria-pressed={isHovered}
              style={{ insetInlineStart: `${LEAF_X}%`, top: `${leafY(index, leaves.length)}%` }}
              className={cn(
                'absolute whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-300',
                isHovered
                  ? 'border-white/25 bg-white/[0.06] text-chalk'
                  : 'border-white/[0.09] text-chalk-dim hover:text-chalk',
              )}
              // The leaf lands after its branch has drawn most of the way out,
              // so it reads as arriving along the branch rather than with it.
              initial={
                reduced ? false : { opacity: 0, scale: 0.7, x: isRTL ? 20 : -20, y: '-50%' }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: '-50%' }}
              transition={{ duration: 0.5, delay: 0.18 + index * 0.05, ease: EASE_EXPO }}
            >
              {/* The direction marker goes on the label, never on the box:
                  `inset-inline-start` resolves against the element's *own*
                  direction, so a `dir="ltr"` button would anchor itself to the
                  left edge even under RTL. */}
              <span lang="en" dir="ltr" className="inline-block">
                {tech.name}
              </span>
            </motion.button>
          );
        })}
      </Fragment>
    </div>
  );
}
