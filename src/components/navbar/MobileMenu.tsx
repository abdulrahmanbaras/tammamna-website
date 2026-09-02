import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { buildSecondaryNavItems, type NavItem } from './navItems';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = useT();
  const { company } = useContent();
  const secondary = useMemo(() => buildSecondaryNavItems(t), [t]);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-label={t.common.openMenu}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950"
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
          />

          {/* The menu picks up the live scroll accent rather than a fixed hue. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(70% 45% at 100% 0%, color-mix(in srgb, var(--accent-a) 24%, transparent) 0%, transparent 65%), radial-gradient(60% 40% at 0% 100%, color-mix(in srgb, var(--accent-b) 20%, transparent) 0%, transparent 65%)',
            }}
          />

          <motion.div
            className="relative flex h-full flex-col"
            variants={{ closed: { opacity: 0, y: -12 }, open: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
          >
            <div className="shell flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.07]">
              <Logo onClick={onClose} />
              <div className="flex items-center gap-3">
                <LanguageSwitcher layoutId="locale-pill-mobile" />
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-chalk"
                  aria-label={t.common.closeMenu}
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <nav className="shell flex-1 overflow-y-auto py-8">
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    className="border-b border-white/[0.06]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.06 + index * 0.05, ease: EASE_EXPO }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="flex-1 py-5 text-[26px] font-medium tracking-tight text-chalk"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((current) => (current === item.label ? null : item.label))
                          }
                          className="grid h-10 w-10 place-items-center text-chalk-dim"
                          aria-label={`${
                            expanded === item.label ? t.common.collapse : t.common.expand
                          } — ${item.label}`}
                          aria-expanded={expanded === item.label}
                        >
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 transition-transform duration-300 ease-expo',
                              expanded === item.label && 'rotate-180',
                            )}
                            strokeWidth={1.5}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {item.children && expanded === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE_EXPO }}
                          className="overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                onClick={onClose}
                                className="flex items-center justify-between gap-4 py-3 ps-4 text-[15px] text-chalk-dim"
                              >
                                {child.label}
                                <ArrowUpRight className="h-4 w-4 text-chalk-faint rtl:-scale-x-100" />
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                {secondary.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="link-underline text-sm text-chalk-dim"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            </nav>

            <motion.div
              className="shell shrink-0 border-t border-white/[0.07] py-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: EASE_EXPO }}
            >
              <Link
                to="/contact"
                onClick={onClose}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-chalk text-[15px] font-medium text-ink-950"
              >
                {t.common.startProject}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <p
                className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint"
                dir="ltr"
              >
                {company.email}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
