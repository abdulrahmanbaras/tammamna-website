/**
 * Runs work once the main thread is free, with a timeout so it cannot be
 * starved indefinitely. Used to move costs off an interaction and into the gap
 * after first paint, where nobody is waiting on them.
 */
export function onIdle(task: () => void, timeout = 3000) {
  if (typeof window === 'undefined') return;

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(task, { timeout });
    return;
  }

  // Safari has no requestIdleCallback; a timeout past first paint is close enough.
  window.setTimeout(task, 1200);
}
