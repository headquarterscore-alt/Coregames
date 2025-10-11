import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Affiliate from './components/Affiliate';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Auth } from './pages/Auth';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { useAuth } from './hooks/useAuth';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DuelCore
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The ultimate gaming platform for competitive players
          </p>
          <div className="space-x-4">
            <a
              href="/pricing"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const [affiliateCode, setAffiliateCode] = useState<string | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setAffiliateCode(ref);
      localStorage.setItem('affiliateCode', ref);
    } else {
      const stored = localStorage.getItem('affiliateCode');
      if (stored) {
        setAffiliateCode(stored);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Pricing affiliateCode={affiliateCode} />
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

  )
}