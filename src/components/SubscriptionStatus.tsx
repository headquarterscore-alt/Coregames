import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { Crown } from 'lucide-react';

export function SubscriptionStatus() {
  const { subscription, loading, isActive, activePlan } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!isActive || !activePlan) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full border border-yellow-200">
      <Crown className="w-4 h-4" />
      <span className="text-sm font-medium">{activePlan}</span>
    </div>
  );
}