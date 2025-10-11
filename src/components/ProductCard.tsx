import React, { useState } from 'react';
import { StripeProduct } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProductCardProps {
  product: StripeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to continue');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: window.location.href,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {product.price_per_unit && (
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {product.currency_symbol}{product.price_per_unit}
            </span>
            {product.mode === 'subscription' && (
              <span className="text-gray-500 ml-1">/month</span>
            )}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading || !user}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Processing...
            </>
          ) : !user ? (
            'Sign in to purchase'
          ) : product.mode === 'subscription' ? (
            'Subscribe Now'
          ) : (
            'Donate Now'
          )}
        </button>
      </div>
    </div>
  );
}