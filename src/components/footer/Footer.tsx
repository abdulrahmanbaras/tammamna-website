import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/navbar/Logo';
import { Reveal } from '@/components/animations/Reveal';
import { LanguageSwitcher } from '@/components/navbar/LanguageSwitcher';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';

export function Footer() {
  const t = useT();
  const content = useContent();
  const { company } = content;
  const year = new Date().getFullYear();

  const columns = useMemo(
    () => [
      {
        title: t.footer.services,
        links: content.services.map((service) => ({
          label: service.title,
          to: `/services/${service.slug}`,
        })),
      },
      {
        title: t.footer.industries,
        links: content.industries.map((industry) => ({
          label: industry.name,
          to: `/industries/${industry.slug}`,
        })),
      },
      {
        title: t.footer.company,
        links: [
          { label: t.nav.about, to: '/about' },
          { label: t.nav.work, to: '/work' },
          { label: t.nav.technologies, to: '/technologies' },
          { label: t.nav.process, to: '/process' },
          { label: t.nav.careers, to: '/careers' },
          { label: t.nav.contact, to: '/contact' },
        ],
      },
    ],
    [t, content],
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      {/* Anchored to the brand corner and clipped by the footer's own
          `overflow-hidden`, so the colour reads as one deliberate corner glow
          rather than a band smeared across the whole top edge.

          A blurred circle tinted with `background-color`, not a gradient stop:
          `background-color` is animatable, so this cross-fades with the rest of
          the page when the scroll accent changes. `background-image` would not. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -start-40 -top-64 h-[34rem] w-[34rem] rounded-full opacity-[0.15] blur-[120px] transition-[background-color] duration-1000 ease-out"
        style={{ backgroundColor: 'var(--accent-a, #c74bff)' }}
      />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <Reveal>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-chalk-dim">
              {company.tagline} {t.footer.tagline}
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="group inline-flex items-center gap-3 text-chalk-dim transition-colors hover:text-chalk"
                >
                  <Mail className="h-4 w-4 shrink-0 text-chalk-faint" strokeWidth={1.5} />
                  <span className="link-underline" dir="ltr">
                    {company.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                  className="group inline-flex items-center gap-3 text-chalk-dim transition-colors hover:text-chalk"
                >
                  <Phone className="h-4 w-4 shrink-0 text-chalk-faint" strokeWidth={1.5} />
                  <span className="link-underline" dir="ltr">
                    {company.phone}
                  </span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-chalk-dim">
                <MapPin className="h-4 w-4 shrink-0 text-chalk-faint" strokeWidth={1.5} />
                {company.locations.map((location) => location.city).join(' · ')}
              </li>
            </ul>

            <div className="mt-8">
              <LanguageSwitcher size="md" layoutId="locale-pill-footer" />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column, index) => (
              <Reveal key={column.title} delay={0.06 * index}>
                <h3 className="eyebrow mb-5">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="link-underline text-sm text-chalk-dim transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint">
            {t.footer.rights(year, company.legalName)}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {company.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 text-sm text-chalk-dim transition-colors hover:text-chalk"
                >
                  {social.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
