type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner. Intentionally not `clsx` — we only ever need
 * conditional joining, and pulling a dependency for 12 lines is not worth it.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(' ');
}
