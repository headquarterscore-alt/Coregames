import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

export function Success() {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // In a real app, you might want to verify the session with your backend
      setSessionDetails({
        id: sessionId,
        // You could fetch more details from your backend here
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your support! Your payment has been processed successfully.
          </p>

          {sessionId && (
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-8">
              <p className="text-sm text-gray-500 mb-2">Transaction ID:</p>
              <p className="font-mono text-sm text-gray-900 break-all">
                {sessionId}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
            
            <Link
              to="/pricing"
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Pricing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}