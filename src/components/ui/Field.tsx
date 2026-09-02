import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { EASE_EXPO } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

function FieldShell({
  id,
  label,
  error,
  required,
  hint,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-faint"
        >
          {label}
          {required && <span className="ml-1 text-aurora-pink">*</span>}
        </label>
        {hint && <span className="text-[11px] text-chalk-faint">{hint}</span>}
      </div>

      {children}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.28, ease: EASE_EXPO }}
            className="flex items-center gap-2 overflow-hidden text-[12.5px] text-aurora-pink"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const controlClasses = (error?: boolean) =>
  cn(
    'w-full rounded-xl border bg-white/[0.02] px-4 py-3.5 text-[15px] text-chalk outline-none transition-colors duration-300 placeholder:text-ink-500',
    error
      ? 'border-aurora-pink/50 focus:border-aurora-pink'
      : 'border-white/[0.09] hover:border-white/[0.16] focus:border-white/35',
  );

interface TextFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  autoComplete?: string;
  /** Force LTR entry for inherently Latin values like email and phone. */
  dir?: 'ltr' | 'rtl';
}

export function TextField({
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  dir,
  ...shell
}: TextFieldProps) {
  return (
    <FieldShell {...shell}>
      <input
        id={shell.id}
        name={shell.id}
        type={type}
        value={value}
        dir={dir}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(shell.error)}
        aria-describedby={shell.error ? `${shell.id}-error` : undefined}
        className={controlClasses(Boolean(shell.error))}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  options: string[];
  placeholder?: string;
}

export function SelectField({
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select…',
  ...shell
}: SelectFieldProps) {
  return (
    <FieldShell {...shell}>
      <div className="relative">
        <select
          id={shell.id}
          name={shell.id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(shell.error)}
          aria-describedby={shell.error ? `${shell.id}-error` : undefined}
          className={cn(
            controlClasses(Boolean(shell.error)),
            'appearance-none pe-10',
            !value && 'text-ink-500',
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-900 text-chalk">
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-chalk-faint"
        >
          ↓
        </span>
      </div>
    </FieldShell>
  );
}

interface TextAreaFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}

export function TextAreaField({
  value,
  onChange,
  onBlur,
  rows = 6,
  placeholder,
  maxLength = 2000,
  ...shell
}: TextAreaFieldProps) {
  return (
    <FieldShell {...shell} hint={`${value.length}/${maxLength}`}>
      <textarea
        id={shell.id}
        name={shell.id}
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(shell.error)}
        aria-describedby={shell.error ? `${shell.id}-error` : undefined}
        className={cn(controlClasses(Boolean(shell.error)), 'resize-none leading-relaxed')}
      />
    </FieldShell>
  );
}
