import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { Crown, Loader2 } from 'lucide-react';

export function SubscriptionStatus() {
  const { subscription, loading, getSubscriptionPlan, isActive } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center text-gray-600">
        <Loader2 className="animate-spin w-4 h-4 mr-2" />
        Loading...
      </div>
    );
  }

  if (!subscription || !isActive()) {
    return null;
  }

  const planName = getSubscriptionPlan();

  return (
    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
      <Crown className="w-4 h-4 mr-1" />
      {planName}
    </div>
  );
}