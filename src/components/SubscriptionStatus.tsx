import React from 'react';
import { Crown, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { stripeProducts } from '../stripe-config';

export function SubscriptionStatus() {
  const { subscription, loading, error } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700">Error loading subscription: {error}</p>
        </div>
      </div>
    );
  }

  if (!subscription || !subscription.subscription_id) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-gray-700">No active subscription</p>
        </div>
      </div>
    );
  }

  const product = stripeProducts.find(p => p.priceId === subscription.price_id);
  const isActive = subscription.subscription_status === 'active';

  const getStatusIcon = () => {
    if (isActive) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  const getStatusColor = () => {
    if (isActive) return 'text-green-700 bg-green-50 border-green-200';
    return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getStatusIcon()}
          <div className="ml-3">
            <div className="flex items-center">
              <Crown className="w-4 h-4 mr-1" />
              <span className="font-medium">
                {product?.name || 'Unknown Plan'}
              </span>
            </div>
            <p className="text-sm capitalize">
              Status: {subscription.subscription_status.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        {subscription.current_period_end && (
          <div className="text-right">
            <p className="text-sm">
              {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on
            </p>
            <p className="text-sm font-medium">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}