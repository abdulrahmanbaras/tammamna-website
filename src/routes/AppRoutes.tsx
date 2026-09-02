import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { RouteFallback } from '@/components/ui/RouteFallback';

// Home ships in the initial bundle; everything else is split, so first paint
// carries only what the landing page actually needs.
import Home from '@/pages/Home/Home';

const Services = lazy(() => import('@/pages/Services/Services'));
const ServiceDetail = lazy(() => import('@/pages/Services/ServiceDetail'));
const Work = lazy(() => import('@/pages/Work/Work'));
const CaseStudy = lazy(() => import('@/pages/Work/CaseStudy'));
const Industries = lazy(() => import('@/pages/Industries/Industries'));
const IndustryDetail = lazy(() => import('@/pages/Industries/IndustryDetail'));
const About = lazy(() => import('@/pages/About/About'));
const Technologies = lazy(() => import('@/pages/Technologies/Technologies'));
const Process = lazy(() => import('@/pages/Process/Process'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Careers = lazy(() => import('@/pages/Careers/Careers'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />

            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />

            <Route path="/about" element={<About />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}
