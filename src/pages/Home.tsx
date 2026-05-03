import { useCallback } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import FunctionLibrary from '../sections/FunctionLibrary';
import TestResultViewer from '../sections/TestResultViewer';
import HowItWorks from '../sections/HowItWorks';
import Footer from '../sections/Footer';
import { demoTestData } from '../data/functions';

export default function Home() {
  const handleScrollTo = useCallback((id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navigation onScrollTo={handleScrollTo} />
      <Hero onScrollTo={handleScrollTo} />
      <Features />
      <FunctionLibrary />
      <TestResultViewer data={demoTestData} isDemo={true} />
      <HowItWorks />
      <Footer />
    </div>
  );
}
