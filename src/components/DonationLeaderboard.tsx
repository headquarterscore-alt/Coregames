import { Trophy, X, Medal, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  id: string;
  username: string;
  amount: number;
  created_at: string;
}

interface DonationLeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationLeaderboard({ isOpen, onClose }: DonationLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('donation_leaderboard')
        .select('*')
        .order('amount', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Medal className="w-6 h-6 text-orange-400" />;
    return null;
  };

  const getRankBg = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/40';
    if (index === 1) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/40';
    if (index === 2) return 'bg-gradient-to-r from-orange-400/20 to-orange-600/20 border-orange-400/40';
    return 'bg-gray-800/50 border-gray-700/40';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-pink-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white">Donation Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
              <p className="text-gray-400 mt-4">Loading leaderboard...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No donations yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${getRankBg(index)}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-black/30 rounded-full font-bold text-white text-lg">
                    {getRankIcon(index) || `#${index + 1}`}
                  </div>

                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">{entry.username}</div>
                    {index < 3 && (
                      <div className="text-xs text-gray-400">
                        {index === 0 ? '👑 Top Supporter' : index === 1 ? '🥈 Silver Supporter' : '🥉 Bronze Supporter'}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 bg-clip-text">
                      ${entry.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm text-center">
              Thank you to all our supporters! Your contributions help us continue improving Core Games.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
