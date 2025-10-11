import React, { useEffect, useState } from 'react';
import { Crown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error);
        } else if (data) {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading subscription...</span>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return null;
  }

  const endDate = new Date(subscription.current_period_end * 1000);
  const isExpiringSoon = endDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        <Crown className="h-4 w-4" />
        <span>VIP</span>
      </div>
      
      {subscription.cancel_at_period_end && (
        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
          Expires {endDate.toLocaleDateString()}
        </span>
      )}
      
      {isExpiringSoon && !subscription.cancel_at_period_end && (
        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
          Renews {endDate.toLocaleDateString()}
        </span>
      )}
    </div>
  );
};