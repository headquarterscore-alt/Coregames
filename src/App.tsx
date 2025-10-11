import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Affiliate from './components/Affiliate';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { SubscriptionStatus } from './components/SubscriptionStatus';
import { AuthForm } from './components/AuthForm';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { LogOut, CreditCard, Home } from 'lucide-react';

function App() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                  <Home className="w-6 h-6" />
                  <span>DuelCore</span>
                </Link>
                <Link to="/pricing" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <CreditCard className="w-4 h-4" />
                  <span>Pricing</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                {user && <SubscriptionStatus />}
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{user.email}</span>
                    <button
                      onClick={signOut}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to DuelCore
                  </h1>
                  <p className="text-xl text-gray-600">
                    Your premium gaming platform
                  </p>
                </div>
                
                {!user && (
                  <div className="max-w-md mx-auto">
                    <AuthForm />
                  </div>
                )}
                
                {user && (
                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-6">
                      Welcome back, {user.email}!
                    </p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>View Pricing</span>
                    </Link>
                  </div>
                )}
              </div>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
