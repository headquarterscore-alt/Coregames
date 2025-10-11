# Stripe Setup Instructions

## Issue
The donation payment option requires a Stripe secret key to function properly.

## Steps to Fix

### 1. Get Your Stripe Secret Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Sign in or create an account
3. Copy your **Secret Key** (starts with `sk_test_` for test mode or `sk_live_` for production)

### 2. Add to Local Environment
Add this line to your `.env` file:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 3. Add to Supabase (Production)
1. Go to your [Supabase Project Settings](https://supabase.com/dashboard/project/mreeruhvfyklydnhurbj/settings/secrets)
2. Click "Add New Secret"
3. Name: `STRIPE_SECRET_KEY`
4. Value: Your Stripe secret key
5. Click "Add Secret"

### 4. Restart Your Development Server
After adding the environment variable, restart your dev server for the changes to take effect.

## Testing
Once configured, the donation button should:
1. Create a Stripe checkout session
2. Redirect to Stripe's payment page
3. Process the donation
4. Redirect back to your success page

## Support
For issues, contact: h9999 on Discord
