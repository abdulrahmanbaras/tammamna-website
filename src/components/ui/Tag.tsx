import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Tag({
  children,
  className,
  active,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300',
        active
          ? 'border-white/25 bg-white/[0.08] text-chalk'
          : 'border-white/10 bg-white/[0.02] text-chalk-dim',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
      {rest > 0 && <Tag>+{rest}</Tag>}
    </div>
  );
}
