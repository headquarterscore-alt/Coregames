import { X, Heart } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const donationAmount = parseFloat(amount);

      if (isNaN(donationAmount) || donationAmount < 1 || donationAmount > 500) {
        alert('Please enter a valid amount between $1 and $500');
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-donation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            amount: donationAmount,
            success_url: `${window.location.origin}?donation=success&name=${encodeURIComponent(name)}&amount=${donationAmount}`,
            cancel_url: window.location.href,
            email: email || undefined,
            name: name || undefined,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert('Donation error: ' + data.error);
        setIsLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl max-w-md w-full border border-pink-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Make a Donation</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleDonate} className="p-6 space-y-6">
          <div>
            <label className="block text-white font-semibold mb-3">Choose Amount</label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`py-3 px-2 rounded-lg font-bold transition-all duration-200 ${
                    amount === preset.toString()
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max="500"
              step="0.01"
              required
              className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
            <p className="text-gray-400 text-xs mt-2">Min: $1 | Max: $500</p>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Your Name (for leaderboard)</label>
            <input
              type="text"
              placeholder="e.g., @eliteifyx"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Email (optional)</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            {isLoading ? 'Processing...' : `Donate $${amount || '0'}`}
          </button>

          <p className="text-gray-400 text-xs text-center">
            You'll be securely redirected to Stripe to complete your donation
          </p>
        </form>
      </div>
    </div>
  );
}
