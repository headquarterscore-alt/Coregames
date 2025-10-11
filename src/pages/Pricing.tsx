import React from 'react';
import { stripeProducts } from '../stripe-config';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../hooks/useAuth';

export function Pricing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support DuelCore
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to support our platform and unlock exclusive features
          </p>
          {!user && (
            <p className="text-sm text-gray-500 mt-4">
              Please sign in to make a purchase
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stripeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}