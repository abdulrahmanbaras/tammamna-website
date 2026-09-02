import { useCallback, useMemo, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/dictionary.en';

export interface ContactValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY: ContactValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
};

// Deliberately permissive: the goal is catching typos, not policing addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts Arabic-Indic digits alongside Western ones, since an Arabic-locale
// visitor may well type their number in either script.
const PHONE_PATTERN = /^[+]?[\d٠-٩\s()\-.]{7,24}$/;
const MIN_MESSAGE = 20;

type Messages = Dictionary['contact']['errors'];

function validateField(
  field: keyof ContactValues,
  value: string,
  messages: Messages,
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return messages.nameRequired;
      if (trimmed.length < 2) return messages.nameShort;
      return undefined;
    case 'email':
      if (!trimmed) return messages.emailRequired;
      if (!EMAIL_PATTERN.test(trimmed)) return messages.emailInvalid;
      return undefined;
    case 'phone':
      // Optional, but validated when provided.
      if (trimmed && !PHONE_PATTERN.test(trimmed)) return messages.phoneInvalid;
      return undefined;
    case 'projectType':
      if (!trimmed) return messages.projectTypeRequired;
      return undefined;
    case 'message':
      if (!trimmed) return messages.messageRequired;
      if (trimmed.length < MIN_MESSAGE) return messages.messageShort(trimmed.length);
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Form state, per-field validation and a simulated submission.
 *
 * Messages are injected rather than hard-coded so validation speaks the active
 * language, and re-validation on locale change is unnecessary — errors are
 * recomputed from the current dictionary on the next blur or submit.
 *
 * Fields validate on blur and then live-correct as the user types, which is the
 * pattern that produces the fewest "yelled at while typing" complaints.
 */
export function useContactForm(messages: Messages) {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [state, setState] = useState<SubmitState>('idle');

  // Mutable mirrors, so the handlers below do not need `values` or `messages`
  // as dependencies (which would recreate them on every keystroke).
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const setField = useCallback((field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const message = validateField(field, value, messagesRef.current);
      if (current[field] === message) return current;
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }, []);

  const blurField = useCallback((field: keyof ContactValues) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => {
      const message = validateField(field, valuesRef.current[field], messagesRef.current);
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }, []);

  const isValid = useMemo(
    () =>
      (Object.keys(EMPTY) as (keyof ContactValues)[]).every(
        (field) => !validateField(field, values[field], messages),
      ),
    [values, messages],
  );

  const submit = useCallback(async () => {
    const current = valuesRef.current;
    const nextErrors: ContactErrors = {};

    for (const field of Object.keys(EMPTY) as (keyof ContactValues)[]) {
      const message = validateField(field, current[field], messagesRef.current);
      if (message) nextErrors[field] = message;
    }

    setTouched(
      (Object.keys(EMPTY) as (keyof ContactValues)[]).reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {},
      ),
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return { ok: false as const, firstError: Object.keys(nextErrors)[0] as keyof ContactValues };
    }

    setState('submitting');
    // No backend on this build — this stands in for the network round trip so
    // the loading and success states are exercised exactly as they would be.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setState('success');
    return { ok: true as const };
  }, []);

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setState('idle');
  }, []);

  return { values, errors, touched, state, isValid, setField, blurField, submit, reset };
}
