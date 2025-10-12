import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface PageCacheState {
  supportPage: {
    email: string;
    name: string;
    donationEmail: string;
    donationName: string;
    showAllFeatures: boolean;
    showLeaderboard: boolean;
    leaderboardData: any[];
  } | null;
}

interface PageCacheContextType {
  cache: PageCacheState;
  setSupportPageState: (state: PageCacheState['supportPage']) => void;
  getSupportPageState: () => PageCacheState['supportPage'];
  clearCache: () => void;
}

const PageCacheContext = createContext<PageCacheContextType | undefined>(undefined);

export function PageCacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<PageCacheState>({
    supportPage: null,
  });

  const setSupportPageState = useCallback((state: PageCacheState['supportPage']) => {
    setCache((prev) => ({
      ...prev,
      supportPage: state,
    }));
  }, []);

  const getSupportPageState = useCallback(() => {
    return cache.supportPage;
  }, [cache.supportPage]);

  const clearCache = useCallback(() => {
    setCache({
      supportPage: null,
    });
  }, []);

  return (
    <PageCacheContext.Provider
      value={{
        cache,
        setSupportPageState,
        getSupportPageState,
        clearCache,
      }}
    >
      {children}
    </PageCacheContext.Provider>
  );
}

export function usePageCache() {
  const context = useContext(PageCacheContext);
  if (context === undefined) {
    throw new Error('usePageCache must be used within a PageCacheProvider');
  }
  return context;
}
