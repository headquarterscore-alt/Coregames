import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  const [affiliateCode, setAffiliateCode] = useState<string | undefined>();
  const [key, setKey] = useState(0);
  const location = useLocation();

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

  useEffect(() => {
    // Force remount of Pricing component when returning to home page
    setKey(prev => prev + 1);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Pricing key={key} affiliateCode={affiliateCode} />
      <Footer />
    </div>
  );
}

export default App;
