import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
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
      <Footer />
    </div>
  );
}

export default App;
