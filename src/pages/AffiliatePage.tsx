import { Copy, DollarSign, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, Affiliate as AffiliateType } from '../lib/supabase';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { prefetchLeaderboard } from '../hooks/useLeaderboard';

export default function AffiliatePage() {
  useEffect(() => {
    prefetchLeaderboard();
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateData, setAffiliateData] = useState<AffiliateType | null>(null);
  const [lookupCode, setLookupCode] = useState('');

  const generateAffiliateLink = (code: string) => {
    return `${window.location.origin}?ref=${code}`;
  };

  const handleCreateAffiliate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: existing } = await supabase
        .from('affiliates')
        .select('*')
        .eq('code', code.toLowerCase())
        .maybeSingle();

      if (existing) {
        alert('This affiliate code is already taken. Please choose another one.');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('affiliates')
        .insert([
          {
            code: code.toLowerCase(),
            name,
            email,
            commission_rate: 0.30,
            total_earnings: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setAffiliateData(data);
      alert('Affiliate account created successfully!');
      setName('');
      setEmail('');
      setCode('');
    } catch (error) {
      console.error('Error creating affiliate:', error);
      alert('Failed to create affiliate account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLookupAffiliate = async () => {
    if (!lookupCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .eq('code', lookupCode.toLowerCase())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAffiliateData(data);
      } else {
        alert('Affiliate code not found.');
      }
    } catch (error) {
      console.error('Error looking up affiliate:', error);
      alert('Failed to lookup affiliate. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="min-h-screen py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black flex items-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Earn 30% Commission
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: DollarSign,
                title: '30% Commission',
                description: 'Earn money from both subscriptions and donations sold through your link',
              },
              {
                icon: TrendingUp,
                title: 'Track Performance',
                description: 'Monitor your earnings and conversions in real-time',
              },
              {
                icon: LinkIcon,
                title: 'Easy Sharing',
                description: 'Get your unique affiliate link and start earning immediately',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Create Affiliate Account</h3>
              <form onSubmit={handleCreateAffiliate} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Affiliate Code (lowercase, no spaces)
                  </label>
                  <input
                    type="text"
                    placeholder="johndoe"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toLowerCase().replace(/\s/g, ''))}
                    required
                    pattern="[a-z0-9]+"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? 'Creating...' : 'Create Affiliate Account'}
                </button>
              </form>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Access Your Dashboard</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Enter Your Affiliate Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="your-code"
                      value={lookupCode}
                      onChange={(e) => setLookupCode(e.target.value.toLowerCase())}
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      onClick={handleLookupAffiliate}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Lookup
                    </button>
                  </div>
                </div>

                {affiliateData && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Total Earnings</p>
                          <p className="text-3xl font-bold text-white">
                            ${affiliateData.total_earnings.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Commission Rate: {(affiliateData.commission_rate * 100).toFixed(0)}%
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <label className="block text-gray-400 mb-2 text-sm">Your Affiliate Link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={generateAffiliateLink(affiliateData.code)}
                          readOnly
                          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(generateAffiliateLink(affiliateData.code))}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
