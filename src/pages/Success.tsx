import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Crown, Heart } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  
  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');

  useEffect(() => {
    if (priceId) {
      const foundProduct = getProductByPriceId(priceId);
      setProduct(foundProduct);
    }
  }, [priceId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          
          {product && (
            <div className="flex items-center justify-center mb-4">
              {product.mode === 'subscription' ? (
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
              ) : (
                <Heart className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="text-lg font-semibold text-gray-700">
                {product.name}
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          {product?.mode === 'subscription' ? (
            <p className="text-gray-600">
              Welcome to VIP! Your subscription is now active and you have access to all premium features.
            </p>
          ) : (
            <p className="text-gray-600">
              Thank you for your donation! Your support helps keep DuelCore running and improving.
            </p>
          )}
        </div>

        {sessionId && (
          <div className="mb-6 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Session ID:</p>
            <p className="text-xs font-mono text-gray-700 break-all">{sessionId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
          
          {product?.mode === 'subscription' && (
            <Link
              to="/account"
              className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Manage Subscription
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};