import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Without this, any render-time throw unmounts the whole root and the page goes
 * black — `body` is `bg-ink-950`, so there is nothing left to see and no hint of
 * what happened. That failure mode cost real debugging time once already (a
 * short-circuited media-query hook, see HANDOFF), so the tree now fails loudly.
 *
 * Deliberately not styled to match the site: this should look like a fault, not
 * like a designed empty state.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keeps the component stack in the console, which is what actually names
    // the offending component — the message alone rarely does.
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div
        dir="ltr"
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto bg-ink-950 p-8"
      >
        <div className="w-full max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-aurora-pink">
            Render error
          </p>
          <h1 className="mt-4 text-2xl font-medium tracking-tight text-chalk">
            Something threw while rendering this page.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-chalk-dim">
            The page was stopped instead of being left blank. The full component stack is in the
            browser console.
          </p>

          <pre className="mt-6 max-h-64 overflow-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 font-mono text-[12px] leading-relaxed text-chalk-dim">
            {error.message}
          </pre>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-chalk px-6 text-sm font-medium text-ink-950"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
