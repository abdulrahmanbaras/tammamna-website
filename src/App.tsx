import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { AmbientField } from '@/components/theme/AmbientField';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SectionThemeProvider } from '@/components/theme/SectionThemeProvider';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { useT } from '@/i18n/useT';
import { AppRoutes } from '@/routes/AppRoutes';

export default function App() {
  return (
    // Outside the providers, so a throw inside one of them is still caught.
    <ErrorBoundary>
      <LocaleProvider>
        <SectionThemeProvider>
          <Shell />
        </SectionThemeProvider>
      </LocaleProvider>
    </ErrorBoundary>
  );
}

function Shell() {
  const t = useT();

  return (
    // `isolate` creates a stacking context so the ambient field's -z-10 layer
    // paints above this element's background instead of behind it.
    <div className="relative isolate min-h-screen bg-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-chalk focus:px-5 focus:py-2.5 focus:text-sm focus:text-ink-950"
      >
        {t.common.skipToContent}
      </a>

      <AmbientField />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main id="main" className="relative">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}
