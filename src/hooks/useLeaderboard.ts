import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  id: string;
  username: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

const leaderboardCache: {
  data: LeaderboardEntry[];
  timestamp: number;
} = {
  data: [],
  timestamp: 0,
};

const CACHE_DURATION = 30000;

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>(leaderboardCache.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async (force = false) => {
    const now = Date.now();
    const isCacheValid = now - leaderboardCache.timestamp < CACHE_DURATION;

    if (!force && isCacheValid && leaderboardCache.data.length > 0) {
      setData(leaderboardCache.data);
      return leaderboardCache.data;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: fetchedData, error: fetchError } = await supabase
        .from('donation_leaderboard')
        .select('*')
        .order('amount', { ascending: false })
        .limit(10);

      if (fetchError) throw fetchError;

      if (fetchedData) {
        leaderboardCache.data = fetchedData;
        leaderboardCache.timestamp = now;
        setData(fetchedData);
        return fetchedData;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leaderboard';
      setError(errorMessage);
      console.error('Leaderboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }

    return [];
  }, []);

  useEffect(() => {
    if (leaderboardCache.data.length === 0) {
      fetchLeaderboard();
    }
  }, [fetchLeaderboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLeaderboard,
  };
}

export function prefetchLeaderboard() {
  const now = Date.now();
  const isCacheValid = now - leaderboardCache.timestamp < CACHE_DURATION;

  if (!isCacheValid || leaderboardCache.data.length === 0) {
    supabase
      .from('donation_leaderboard')
      .select('*')
      .order('amount', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) {
          leaderboardCache.data = data;
          leaderboardCache.timestamp = now;
        }
      });
  }
}
