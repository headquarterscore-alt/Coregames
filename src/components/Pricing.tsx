import { Check, Zap, Crown, Eye, Image, Shield, RefreshCw, Clock, Zap as Lightning, Palette, Star, MessageCircle, ExternalLink, ChevronDown, ChevronUp, Gem, Heart, X, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

interface DonationLeaderboardEntry {
  id: string;
  username: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

interface PricingProps {
  affiliateCode?: string;
}

export default function Pricing({ affiliateCode }: PricingProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<DonationLeaderboardEntry[]>([]);

  useEffect(() => {
    if (affiliateCode) {
      const banner = document.getElementById('affiliate-banner');
      if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [affiliateCode]);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('donation_leaderboard')
      .select('*')
      .order('amount', { ascending: false })
      .limit(2);

    if (!error && data) {
      setLeaderboardData(data);
    }
  };

  const openLeaderboard = () => {
    setShowLeaderboard(true);
    fetchLeaderboard();
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password: Math.random().toString(36).slice(-12),
          options: {
            data: {
              name,
              affiliate_code: affiliateCode,
            },
          },
        });

        if (signUpError) {
          alert('Failed to create account: ' + signUpError.message);
          setIsLoading(false);
          return;
        }

        if (!authData.session) {
          alert('Failed to create session');
          setIsLoading(false);
          return;
        }
      }

      const vipProduct = stripeProducts[0];
      const { data: { session: currentSession } } = await supabase.auth.getSession();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentSession?.access_token}`,
          },
          body: JSON.stringify({
            price_id: vipProduct.priceId,
            mode: vipProduct.mode,
            success_url: `${window.location.origin}/success`,
            cancel_url: window.location.href,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert('Payment error: ' + data.error);
        setIsLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDonate = async () => {
    setIsDonating(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-donation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            amount: 10,
            success_url: `${window.location.origin}/success`,
            cancel_url: window.location.href,
            email: email || undefined,
            name: name || undefined,
            affiliate_code: affiliateCode || undefined,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert('Donation error: ' + data.error);
        setIsDonating(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      alert('An error occurred. Please try again.');
      setIsDonating(false);
    }
  };

  return (
    <section id="pricing" className="min-h-screen pt-8 pb-16 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: "url('/LOGO DuelCore (2000x2000) Henri.png')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      <div className="max-w-6xl mx-auto relative z-10">
        {affiliateCode && (
          <div
            id="affiliate-banner"
            className="mb-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 rounded-2xl text-center shadow-2xl shadow-green-500/20 animate-pulse"
          >
            <p className="text-lg font-semibold">
              You're using affiliate code: <span className="font-mono bg-white/20 px-3 py-1 rounded">{affiliateCode}</span>
            </p>
            <p className="text-sm mt-1">Your referrer will earn 30% commission on this purchase!</p>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Core Games - DuelCore
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            Choose how you want to support DuelCore
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl w-full">
            <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-1 rounded-3xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-10">
                <div className="text-center mb-6">
                  <div className="flex flex-col items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white">VIP Access</h3>
                      <Gem className="w-6 h-6 text-purple-400" />
                    </div>
                    <a
                      href="/affiliate"
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50"
                    >
                      <Star className="w-4 h-4" />
                      Create your affiliate account
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-white">$9.99</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>

              <div className="space-y-4 mb-10">
                <div className={`space-y-4 ${!showAllFeatures ? 'max-h-[400px] overflow-hidden' : ''}`}>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-950/40 to-transparent rounded-xl border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">@Spectator</span>
                    <p className="text-gray-400 text-sm mt-1">Join any match VC/channel and spectate</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-950/40 to-transparent rounded-xl border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-500/50">
                    <Image className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">@Pic Perms</span>
                    <p className="text-gray-400 text-sm mt-1">Post media anywhere</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-950/40 to-transparent rounded-xl border border-green-500/20 hover:border-green-500/50 hover:bg-green-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-green-500/50">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">@Bloxlink Bypass</span>
                    <p className="text-gray-400 text-sm mt-1">Bypass verification & nickname yourself</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-950/40 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-cyan-500/50">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Reset Stats</span>
                    <p className="text-gray-400 text-sm mt-1">Reset your stats in the current season</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-950/40 to-transparent rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-yellow-600 to-orange-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-yellow-500/50">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Tournament Priority</span>
                    <p className="text-gray-400 text-sm mt-1">Enter earlier in tournaments</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-950/40 to-transparent rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-indigo-500/50">
                    <Lightning className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Queue Priority</span>
                    <p className="text-gray-400 text-sm mt-1">Skip the line with faster queues</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-950/40 to-transparent rounded-xl border border-red-500/20 hover:border-red-500/50 hover:bg-red-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-red-600 to-pink-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-red-500/50">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Ban Immunity</span>
                    <p className="text-gray-400 text-sm mt-1">Protected from bans</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-pink-950/40 to-transparent rounded-xl border border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-pink-600 to-rose-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/50">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Custom Role Color</span>
                    <p className="text-gray-400 text-sm mt-1">Choose your own unique role color</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-950/40 to-transparent rounded-xl border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-950/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-amber-500/50">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-bold text-lg">Bragging Rights</span>
                    <p className="text-gray-400 text-sm mt-1">Show off your VIP status with pride</p>
                  </div>
                </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="w-full flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 py-2 text-sm font-semibold transition-colors"
                >
                  {showAllFeatures ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show More Features <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                >
                  <span className="relative z-10">{isLoading ? 'Processing...' : 'Get VIP Now - $9.99/mo'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Secure payment powered by Stripe
              </p>
            </div>
          </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-red-600 p-1 rounded-3xl shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Support the server</h3>
                  </div>

                  <div className="space-y-6">

                    <button
                      onClick={handleDonate}
                      disabled={isDonating}
                      className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 text-white py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {isDonating ? 'Redirecting...' : 'Make a Donation'}
                    </button>

                    <button
                      onClick={openLeaderboard}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-yellow-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Trophy className="w-5 h-5" />
                      View Leaderboard
                    </button>
                  </div>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    Your support helps us continue improving Core Games
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl shadow-2xl mt-8">
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-2xl font-bold text-white">Contact Support</h3>
                  </div>

                  <p className="text-gray-400 mb-6">
                    Need help or have questions? Reach out to our support team on Discord.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-gray-400">Discord:</span>
                      <span className="font-mono bg-gray-800 px-3 py-1.5 rounded-lg">h9999</span>
                    </div>

                    <a
                      href="https://discord.com/users/239327215651651596"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Message on Discord
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        src="/ssss.gif"
                        alt="Henri"
                        className="h-12 w-12 rounded-full border-2 border-gray-700"
                      />
                      <div>
                        <p className="text-white font-semibold">Henri</p>
                        <p className="text-gray-400 text-sm">Core Games Creator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLeaderboard && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setShowLeaderboard(false)}
        >
          <div
            className="bg-gradient-to-b from-gray-900 to-black border-2 border-pink-500/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl shadow-pink-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-white">Donation Leaderboard</h2>
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {leaderboardData.length > 0 ? (
                leaderboardData.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-950/40 to-purple-950/40 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 font-bold text-white">
                        {index + 1}
                      </div>
                      <span className="text-white font-semibold text-lg">{entry.username}</span>
                    </div>
                    <span className="text-2xl font-bold text-pink-400">${entry.amount}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No donations yet. Be the first!</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowLeaderboard(false)}
              className="mt-8 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-pink-500/50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
