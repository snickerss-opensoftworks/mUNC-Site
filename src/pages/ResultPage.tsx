import { useParams } from 'react-router';
import Navigation from '../components/Navigation';
import TestResultViewer from '../sections/TestResultViewer';
import Footer from '../sections/Footer';
import { demoTestData } from '../data/functions';

export default function ResultPage() {
  const { testId } = useParams<{ testId: string }>();

  // For now, use demo data with the URL testId
  // In production, this would fetch from the API
  const data = {
    ...demoTestData,
    id: testId || 'unknown',
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navigation />
      <div className="pt-24">
        <TestResultViewer data={data} isDemo={false} />
      </div>
      <Footer />
    </div>
  );
}
