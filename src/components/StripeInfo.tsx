import { CreditCard, Shield, AlertCircle } from 'lucide-react';

export default function StripeInfo() {
  return (
    <section className="py-32 px-6 bg-black border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-1 rounded-2xl">
          <div className="bg-gray-900 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Stripe Integration Required
                </h3>
                <p className="text-gray-300">
                  To accept payments, you need to set up Stripe. Follow the steps below to get started.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-white">Create Stripe Account</h4>
                </div>
                <p className="text-gray-400 ml-11">
                  Sign up for a Stripe account at{' '}
                  <a
                    href="https://dashboard.stripe.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    dashboard.stripe.com/register
                  </a>
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-white">Get Your API Keys</h4>
                </div>
                <p className="text-gray-400 ml-11">
                  Navigate to the{' '}
                  <a
                    href="https://dashboard.stripe.com/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Developers section
                  </a>{' '}
                  in your Stripe Dashboard and copy your secret key.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-white">Complete Setup</h4>
                </div>
                <p className="text-gray-400 ml-11 mb-4">
                  Once you have your Stripe secret key, the payment system will be fully integrated.
                </p>
                <a
                  href="https://bolt.new/setup/stripe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-11 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Shield className="w-5 h-5" />
                  Complete Stripe Setup
                </a>
              </div>
            </div>

            <div className="mt-8 bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-300 font-semibold mb-1">Secure Payment Processing</p>
                  <p className="text-blue-200/70 text-sm">
                    Stripe handles all payment processing securely. Your customers' payment information is never stored on your servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
