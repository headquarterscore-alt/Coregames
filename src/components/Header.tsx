import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SubscriptionStatus } from './SubscriptionStatus';
import { LogOut, User, CreditCard } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              DuelCore
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <SubscriptionStatus />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}