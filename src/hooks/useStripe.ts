import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) {
      throw new Error('User must be authenticated');
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
          priceId,
          mode,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserSubscription = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  };

  return {
    createCheckoutSession,
    getUserSubscription,
    loading,
  };
};