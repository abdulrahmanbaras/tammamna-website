import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { useContactForm } from '@/hooks/useContactForm';
import { useContent } from '@/data/useContent';
import { useT } from '@/i18n/useT';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_EXPO } from '@/utils/motion';

export default function Contact() {
  const t = useT();
  const { company } = useContent();
  const form = useContactForm(t.contact.errors);
  const formRef = useRef<HTMLFormElement>(null);

  usePageMeta({
    title: `${t.nav.contact} — ${company.name}`,
    description: t.contact.description,
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await form.submit();
    if (!result.ok && result.firstError) {
      // Move focus to the first invalid control so keyboard and screen-reader
      // users are not left guessing what failed.
      const field = formRef.current?.querySelector<HTMLElement>(`#${result.firstError}`);
      field?.focus();
      field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={t.contact.description}
        crumbs={[{ label: t.common.home, to: '/' }, { label: t.nav.contact }]}
        accent={['#ff5fa2', '#7b5cff']}
      />

      <Section spacing="tight" accent={['#ff5fa2', '#c74bff']}>
        <div className="grid gap-14 border-t border-white/[0.07] pt-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {form.state === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_EXPO }}
                  className="panel relative overflow-hidden rounded-2xl border border-white/[0.09] p-10 sm:p-14"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background:
                        'radial-gradient(60% 80% at 15% 0%, rgba(142,240,192,0.18) 0%, transparent 65%)',
                    }}
                  />
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE_EXPO }}
                    className="relative grid h-14 w-14 place-items-center rounded-full border border-aurora-mint/40 bg-aurora-mint/10"
                  >
                    <Check className="h-6 w-6 text-aurora-mint" strokeWidth={1.8} />
                  </motion.span>

                  <h2 className="relative mt-8 text-[clamp(1.6rem,3.2vw,2.25rem)] font-medium tracking-tight text-chalk">
                    {t.contact.successTitle(form.values.name.trim().split(' ')[0])}
                  </h2>
                  <p className="relative mt-4 max-w-lg text-[15px] leading-relaxed text-chalk-dim">
                    {t.contact.successBody(form.values.email, company.phone)}
                  </p>

                  <p className="relative mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-chalk-faint">
                    {t.contact.successNote}
                  </p>

                  <div className="relative mt-8">
                    <Button variant="secondary" onClick={form.reset}>
                      {t.contact.sendAnother}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      id="name"
                      label={t.contact.fields.name}
                      required
                      placeholder={t.contact.placeholders.name}
                      autoComplete="name"
                      value={form.values.name}
                      error={form.errors.name}
                      onChange={(value) => form.setField('name', value)}
                      onBlur={() => form.blurField('name')}
                    />
                    <TextField
                      id="company"
                      label={t.contact.fields.company}
                      placeholder={t.contact.placeholders.company}
                      autoComplete="organization"
                      value={form.values.company}
                      error={form.errors.company}
                      onChange={(value) => form.setField('company', value)}
                      onBlur={() => form.blurField('company')}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      id="email"
                      label={t.contact.fields.email}
                      type="email"
                      required
                      placeholder={t.contact.placeholders.email}
                      autoComplete="email"
                      dir="ltr"
                      value={form.values.email}
                      error={form.errors.email}
                      onChange={(value) => form.setField('email', value)}
                      onBlur={() => form.blurField('email')}
                    />
                    <TextField
                      id="phone"
                      label={t.contact.fields.phone}
                      type="tel"
                      placeholder={t.contact.placeholders.phone}
                      autoComplete="tel"
                      dir="ltr"
                      value={form.values.phone}
                      error={form.errors.phone}
                      onChange={(value) => form.setField('phone', value)}
                      onBlur={() => form.blurField('phone')}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <SelectField
                      id="projectType"
                      label={t.contact.fields.projectType}
                      required
                      options={t.contact.projectTypes}
                      placeholder={t.contact.placeholders.select}
                      value={form.values.projectType}
                      error={form.errors.projectType}
                      onChange={(value) => form.setField('projectType', value)}
                      onBlur={() => form.blurField('projectType')}
                    />
                    <SelectField
                      id="budget"
                      label={t.contact.fields.budget}
                      options={t.contact.budgets}
                      placeholder={t.contact.placeholders.optional}
                      value={form.values.budget}
                      error={form.errors.budget}
                      onChange={(value) => form.setField('budget', value)}
                      onBlur={() => form.blurField('budget')}
                    />
                  </div>

                  <TextAreaField
                    id="message"
                    label={t.contact.fields.message}
                    required
                    placeholder={t.contact.placeholders.message}
                    value={form.values.message}
                    error={form.errors.message}
                    onChange={(value) => form.setField('message', value)}
                    onBlur={() => form.blurField('message')}
                  />

                  <div className="flex flex-wrap items-center gap-5 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.state === 'submitting'}
                      withArrow={form.state !== 'submitting'}
                    >
                      {form.state === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        t.contact.submit
                      )}
                    </Button>
                    <p className="text-[12.5px] leading-relaxed text-chalk-faint">
                      {t.contact.requiredNote}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact details */}
          <aside className="space-y-10">
            <Reveal>
              <div className="space-y-5">
                <ContactRow icon={Mail} label={t.contact.sidebar.email}>
                  <a
                    href={`mailto:${company.email}`}
                    className="link-underline text-chalk transition-colors hover:text-white"
                    dir="ltr"
                  >
                    {company.email}
                  </a>
                  <p className="mt-1 text-[13px] text-chalk-faint" dir="ltr">
                    {t.contact.sidebar.newBusiness(company.salesEmail)}
                  </p>
                </ContactRow>

                <ContactRow icon={Phone} label={t.contact.sidebar.phone}>
                  <a
                    href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                    className="link-underline text-chalk transition-colors hover:text-white"
                    dir="ltr"
                  >
                    {company.phone}
                  </a>
                </ContactRow>

                <ContactRow icon={Clock} label={t.contact.sidebar.responseTime}>
                  <p className="text-chalk">{t.contact.sidebar.responseValue}</p>
                  <p className="mt-1 text-[13px] text-chalk-faint">
                    {t.contact.sidebar.responseHours}
                  </p>
                </ContactRow>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="panel rounded-2xl border border-white/[0.07] p-7">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-chalk-faint" strokeWidth={1.5} />
                  <p className="eyebrow">{t.contact.sidebar.studios}</p>
                </div>
                <ul className="mt-6 space-y-5">
                  {company.locations.map((location) => (
                    <li key={location.city}>
                      <div className="flex items-baseline gap-3">
                        <p className="text-[15px] text-chalk">{location.city}</p>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chalk-faint">
                          {location.role}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-chalk-faint">{location.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="eyebrow mb-4">{t.contact.sidebar.elsewhere}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {company.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 text-[14px] text-chalk-dim transition-colors hover:text-chalk"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-b border-white/[0.07] pb-5">
      <Icon className="mt-1 h-4 w-4 shrink-0 text-chalk-faint" strokeWidth={1.5} />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint">
          {label}
        </p>
        <div className="mt-2 text-[15px]">{children}</div>
      </div>
    </div>
  );
}
