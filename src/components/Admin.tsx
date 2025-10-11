import { Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, Subscription, Purchase, Affiliate } from '../lib/supabase';

interface SubscriptionWithAffiliate extends Subscription {
  affiliate?: Affiliate;
}

export default function Admin() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithAffiliate[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeSubscriptions: 0,
    totalAffiliateCommissions: 0,
    totalAffiliates: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [subsResult, purchasesResult, affiliatesResult] = await Promise.all([
        supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
        supabase.from('purchases').select('*').order('created_at', { ascending: false }),
        supabase.from('affiliates').select('*').order('total_earnings', { ascending: false }),
      ]);

      if (subsResult.data) {
        const subsWithAffiliates = await Promise.all(
          subsResult.data.map(async (sub) => {
            if (sub.affiliate_id) {
              const { data: affiliate } = await supabase
                .from('affiliates')
                .select('*')
                .eq('id', sub.affiliate_id)
                .maybeSingle();
              return { ...sub, affiliate };
            }
            return sub;
          })
        );
        setSubscriptions(subsWithAffiliates);
      }

      if (purchasesResult.data) setPurchases(purchasesResult.data);
      if (affiliatesResult.data) setAffiliates(affiliatesResult.data);

      const totalRevenue = purchasesResult.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const activeSubscriptions =
        subsResult.data?.filter((s) => s.status === 'active').length || 0;
      const totalAffiliateCommissions =
        purchasesResult.data?.reduce((sum, p) => sum + p.affiliate_commission, 0) || 0;

      setStats({
        totalRevenue,
        activeSubscriptions,
        totalAffiliateCommissions,
        totalAffiliates: affiliatesResult.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="admin" className="min-h-screen py-32 px-6 bg-gradient-to-b from-black via-blue-950/10 to-black flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white text-2xl">Loading admin data...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="min-h-screen py-32 px-6 bg-gradient-to-b from-black via-blue-950/10 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            User Dashboard
          </h2>
          <p className="text-2xl text-gray-400">Track all subscriptions and affiliate performance</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-white/80 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-white/80 text-sm mb-1">Active Subscriptions</p>
            <p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-white/80 text-sm mb-1">Affiliate Commissions</p>
            <p className="text-3xl font-bold text-white">
              ${stats.totalAffiliateCommissions.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-white/80" />
            </div>
            <p className="text-white/80 text-sm mb-1">Total Affiliates</p>
            <p className="text-3xl font-bold text-white">{stats.totalAffiliates}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Recent Subscriptions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {subscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No subscriptions yet
                      </td>
                    </tr>
                  ) : (
                    subscriptions.slice(0, 10).map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4">
                          <div className="text-sm text-white font-medium">{sub.user_name}</div>
                          <div className="text-sm text-gray-400">{sub.user_email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              sub.status === 'active'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {sub.affiliate ? (
                            <span className="text-cyan-400">{sub.affiliate.code}</span>
                          ) : (
                            <span className="text-gray-500">Direct</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Top Affiliates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {affiliates.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No affiliates yet
                      </td>
                    </tr>
                  ) : (
                    affiliates.slice(0, 10).map((affiliate) => (
                      <tr key={affiliate.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4">
                          <div className="text-sm text-white font-medium">{affiliate.name}</div>
                          <div className="text-sm text-gray-400">{affiliate.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="text-cyan-400 font-mono">{affiliate.code}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-400">
                          ${affiliate.total_earnings.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
