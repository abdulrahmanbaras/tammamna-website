import { Link } from 'react-router-dom';
import { useContent } from '@/data/useContent';
import { cn } from '@/utils/cn';

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const { company } = useContent();

  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={company.name}
    >
      <span className="relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-white/10 bg-ink-900">
        <span
          aria-hidden
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 140deg, #ff5fa2, #c74bff, #7b5cff, #3d8bff, #8ef0c0, #ffc8a2, #ff5fa2)',
          }}
        />
        <span aria-hidden className="absolute inset-[1.5px] rounded-[8px] bg-ink-950" />
        <span className="relative font-mono text-[13px] font-semibold text-chalk" lang="en">
          T
        </span>
      </span>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-chalk">
        {company.name}
      </span>
    </Link>
  );
}
