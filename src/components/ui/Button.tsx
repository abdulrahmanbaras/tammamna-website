import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from '@/components/animations/Magnetic';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  magnetic?: boolean;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-chalk text-ink-950 hover:bg-white',
  secondary: 'border border-white/15 bg-white/[0.03] text-chalk hover:border-white/30 hover:bg-white/[0.07]',
  ghost: 'text-chalk-dim hover:text-chalk',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-[15px]',
};

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      {withArrow && (
        // `-scale-x-100` under RTL mirrors the glyph and, because Tailwind
        // composes scale and translate into one transform, flips the hover
        // nudge with it — no second icon import needed.
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:-scale-x-100" />
      )}
    </span>
  );
}

/**
 * A sheen sweeps across the primary variant on hover — a single translated
 * gradient layer rather than a background-position animation, so it composites.
 */
function Sheen({ variant }: { variant: Variant }) {
  if (variant === 'ghost') return null;
  return (
    <span
      aria-hidden
      className={cn(
        'absolute inset-0 -translate-x-full transition-transform duration-[900ms] ease-expo group-hover:translate-x-full rtl:translate-x-full rtl:group-hover:-translate-x-full',
        variant === 'primary'
          ? 'bg-gradient-to-r from-transparent via-black/[0.07] to-transparent'
          : 'bg-gradient-to-r from-transparent via-white/[0.09] to-transparent',
      )}
    />
  );
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  magnetic = false,
  ...rest
}: ButtonProps) {
  const button = (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Sheen variant={variant} />
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

interface ButtonLinkProps extends BaseProps {
  to: string;
  external?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  magnetic = false,
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <Sheen variant={variant} />
      <Inner withArrow={withArrow}>{children}</Inner>
    </>
  );

  const element = external ? (
    <a href={to} target="_blank" rel="noreferrer noopener" className={classes} aria-label={ariaLabel}>
      {content}
    </a>
  ) : (
    <Link to={to} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
