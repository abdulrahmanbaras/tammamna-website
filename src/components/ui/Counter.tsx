import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/utils/cn';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

/** Number that counts up once when it scrolls into view. */
export function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  duration,
}: CounterProps) {
  const { ref, value: current } = useCountUp<HTMLSpanElement>({ to: value, decimals, duration });

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
