import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useStripe } from '../hooks/useStripe';
import { Navigate } from 'react-router-dom';
import { getProductByPriceId } from '../stripe-config';
import { Crown, User, Mail, Calendar, CreditCard, Loader2 } from 'lucide-react';

export const Account: React.FC = () => {
  const { user, signOut } = useAuth();
  const { getUserSubscription } = useStripe();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubscription();
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

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const product = subscription?.price_id ? getProductByPriceId(subscription.price_id) : null;
  const isActive = subscription?.subscription_status === 'active';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* User Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscription Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Subscription Status
              </h2>
              
              {loading ? (
                <div className="flex items-center text-gray-600">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading subscription...
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  {isActive && product ? (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Crown className="w-5 h-5 text-yellow-500 mr-3" />
                        <span className="font-semibold text-gray-900">{product.name} Plan</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                      
                      {subscription.current_period_end && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-3" />
                          <span>
                            Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      {subscription.payment_method_brand && subscription.payment_method_last4 && (
                        <div className="flex items-center text-gray-600">
                          <CreditCard className="w-4 h-4 mr-3" />
                          <span>
                            {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
                          </span>
                        </div>
                      )}
                      
                      {subscription.cancel_at_period_end && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-yellow-800 text-sm">
                            Your subscription will cancel at the end of the current billing period.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">You're currently on the free plan.</p>
                      <a
                        href="/pricing"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to VIP
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};