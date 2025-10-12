import React, { useEffect, useState } from 'react';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';
import { getProductByPriceId } from '../stripe-config';
import { Crown, Loader2 } from 'lucide-react';

export const SubscriptionStatus: React.FC = () => {
  const { getUserSubscription } = useStripe();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadSubscription = async () => {
    try {
      const sub = await getUserSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return loading ? (
      <div className="flex items-center text-gray-600">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </div>
    ) : null;
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return (
      <div className="text-gray-600">
        Free Plan
      </div>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;

  return (
    <div className="flex items-center text-yellow-600">
      <Crown className="w-4 h-4 mr-2" />
      {product?.name || 'Premium'} Plan
    </div>
  );
};