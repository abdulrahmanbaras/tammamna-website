import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { buildNavItems, type NavChild, type NavItem } from './navItems';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { useScrollState } from '@/hooks/useScrollState';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

const isActivePath = (pathname: string, to: string) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

export function Navbar() {
  const { pathname } = useLocation();
  const { scrolled, direction, y } = useScrollState();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = useT();
  const content = useContent();
  const navItems = useMemo(() => buildNavItems(t, content), [t, content]);

  // Close any transient UI when the route changes.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Reveal on scroll-up, retract on scroll-down — but only once we are far
  // enough down the page that hiding the bar cannot feel like a glitch.
  const hidden = direction === 'down' && y > 420 && !openMenu && !mobileOpen;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div
          className={cn(
            'transition-[background-color,backdrop-filter,border-color] duration-500 ease-expo',
            scrolled || openMenu
              ? 'border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <nav className="shell flex h-[72px] items-center justify-between gap-4">
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLinkItem
                  key={item.to}
                  item={item}
                  active={isActivePath(pathname, item.to)}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.children ? item.label : null)}
                />
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher className="hidden sm:inline-flex" />

              <Link
                to="/careers"
                className="link-underline hidden text-sm text-chalk-dim transition-colors hover:text-chalk xl:inline-block"
              >
                {t.nav.careers}
              </Link>

              <ButtonLink to="/contact" size="sm" className="hidden sm:inline-flex" magnetic>
                {t.common.letsTalk}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-chalk transition-colors hover:border-white/25 lg:hidden"
                aria-label={t.common.openMenu}
                aria-expanded={mobileOpen}
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {openMenu && (
              <MegaPanel item={navItems.find((item) => item.label === openMenu)!} />
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} />
    </>
  );
}

function NavLinkItem({
  item,
  active,
  open,
  onOpen,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <li onMouseEnter={onOpen} className="relative">
      <Link
        to={item.to}
        // Focus opens the panel too, so the sub-links are reachable by keyboard
        // and not only by pointer.
        onFocus={onOpen}
        className={cn(
          'relative inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-300',
          active ? 'text-chalk' : 'text-chalk-dim hover:text-chalk',
        )}
        aria-current={active ? 'page' : undefined}
        aria-expanded={item.children ? open : undefined}
      >
        {item.label}

        {/* Marks the items that carry a panel, and lights up while it is open. */}
        {item.children && (
          <span
            aria-hidden
            className={cn(
              // Centred with inset+auto margins rather than a translate, which
              // would need mirroring under RTL.
              'absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full transition-colors duration-500',
              open ? 'accent-dot' : 'bg-white/20',
            )}
          />
        )}
        {active && (
          // Shared layout id slides the indicator between items instead of
          // cross-fading it, which is what makes the nav feel connected.
          <motion.span
            layoutId="nav-active"
            className="accent-border absolute inset-0 -z-10 rounded-full border bg-white/[0.06]"
            transition={{ duration: 0.45, ease: EASE_EXPO }}
          />
        )}
      </Link>
    </li>
  );
}

function MegaPanel({ item }: { item: NavItem }) {
  // Keyed by href rather than index so switching between two menus falls back
  // to the first child on its own — no effect needed to reset the selection.
  const [hoveredTo, setHoveredTo] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  const children = item.children;
  const active = children?.find((child) => child.to === hoveredTo) ?? children?.[0];
  if (!children || !active) return null;

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.42, ease: EASE_EXPO }}
      className="overflow-hidden border-t border-white/[0.06]"
    >
      <div className="shell grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <span className="eyebrow">{item.label}</span>
            <span className="font-mono text-[11px] text-chalk-faint" dir="ltr">
              {String(children.length).padStart(2, '0')}
            </span>
          </div>

          <ul className="flex flex-col border-t border-white/[0.06] pt-2">
            {children.map((child, index) => (
              <MegaRow
                key={child.to}
                child={child}
                index={index}
                active={child.to === active.to}
                reduced={reduced}
                onActivate={() => setHoveredTo(child.to)}
              />
            ))}
          </ul>

          {item.overviewLabel && (
            <Link
              to={item.to}
              className="group mt-4 inline-flex items-center gap-2 self-start px-3 text-xs text-chalk-dim transition-colors hover:text-chalk"
            >
              <span className="link-underline">{item.overviewLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
          )}
        </div>

        <MegaPreview item={item} active={active} reduced={reduced} />
      </div>
    </motion.div>
  );
}

function MegaRow({
  child,
  index,
  active,
  reduced,
  onActivate,
}: {
  child: NavChild;
  index: number;
  active: boolean;
  reduced: boolean;
  onActivate: () => void;
}) {
  const Icon = child.icon;

  return (
    <motion.li
      onMouseEnter={onActivate}
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: EASE_EXPO }}
    >
      <Link
        to={child.to}
        onFocus={onActivate}
        className="group relative flex items-center gap-4 rounded-xl px-3 py-3"
      >
        {/* The raised card follows the pointer between rows instead of
            cross-fading, which is what makes the list read as one control. */}
        {active &&
          (reduced ? (
            <span className="absolute inset-0 -z-10 rounded-xl border border-white/[0.08] bg-white/[0.05]" />
          ) : (
            <motion.span
              layoutId="mega-active"
              className="absolute inset-0 -z-10 rounded-xl border border-white/[0.08] bg-white/[0.05]"
              transition={{ duration: 0.4, ease: EASE_EXPO }}
            />
          ))}

        <span
          className={cn(
            'grid h-11 w-11 shrink-0 place-items-center rounded-lg border transition-colors duration-500',
            active ? 'accent-border bg-white/[0.04] text-chalk' : 'border-white/[0.08] text-chalk-dim',
          )}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.25} />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate text-sm transition-colors duration-300',
              active ? 'text-chalk' : 'text-chalk-dim',
            )}
          >
            {child.label}
          </span>
          <span className="mt-0.5 block truncate text-xs text-chalk-faint">
            {child.description}
          </span>
        </span>

        <span className="font-mono text-[10px] text-chalk-faint" dir="ltr">
          {child.index}
        </span>
      </Link>
    </motion.li>
  );
}

function MegaPreview({
  item,
  active,
  reduced,
}: {
  item: NavItem;
  active: NavChild;
  reduced: boolean;
}) {
  const Icon = active.icon;

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectVisual accent={active.accent} label={item.label} density="compact" />
        <Icon
          aria-hidden
          className="absolute inset-0 m-auto h-20 w-20 text-white/[0.14]"
          strokeWidth={0.6}
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-chalk">{active.label}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-chalk-dim">{active.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {active.meta.map((token) => (
            <span
              key={token}
              dir="ltr"
              className="inline-block rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-chalk-faint"
            >
              {token}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="relative hidden overflow-hidden rounded-2xl border border-white/[0.07] lg:block">
      {/* The row list already links here; this pane is decoration for it, so it
          stays out of the tab order rather than duplicating every destination. */}
      <Link to={active.to} tabIndex={-1} aria-hidden className="block panel">
        {reduced ? (
          body
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE_EXPO }}
            >
              {body}
            </motion.div>
          </AnimatePresence>
        )}
      </Link>
    </div>
  );
}
