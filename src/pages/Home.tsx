import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Users, Star, Crown } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">GameHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the ultimate gaming platform with competitive tournaments, 
            social features, and endless entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get VIP Access
            </Link>
            <Link
              to="/games"
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Browse Games
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">VIP Experience</h3>
            <p className="text-gray-600">Unlock premium features, exclusive tournaments, and priority support with VIP membership.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitive Gaming</h3>
            <p className="text-gray-600">Challenge players worldwide in ranked matches and climb the leaderboards.</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Play className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy to Play</h3>
            <p className="text-gray-600">Jump right into action with our intuitive game mechanics and user-friendly interface.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Players</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
            <div className="text-gray-600">Games Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">1M+</div>
            <div className="text-gray-600">Matches Played</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of players in the ultimate gaming experience</p>
          <Link
            to="/pricing"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <Crown className="h-5 w-5 mr-2" />
            Upgrade to VIP
          </Link>
        </div>
      </div>
    </div>
  );
};