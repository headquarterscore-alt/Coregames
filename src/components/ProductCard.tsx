import React from 'react';
import { StripeProduct } from '../stripe-config';
import { useStripe } from '../hooks/useStripe';
import { Loader2 } from 'lucide-react';

interface ProductCardProps {
  product: StripeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { createCheckoutSession, loading } = useStripe();

  const handlePurchase = async () => {
    try {
      await createCheckoutSession(product.priceId, product.mode);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      
      {product.price_per_unit && (
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {product.currency_symbol}{product.price_per_unit}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-500 ml-1">/month</span>
          )}
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {product.mode === 'subscription' ? 'Subscribe' : 'Donate'}
          </>
        )}
      </button>
    </div>
  );
};