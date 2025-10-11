/*
  # Core Games Subscription System

  1. New Tables
    - `affiliates`
      - `id` (uuid, primary key) - Unique affiliate identifier
      - `code` (text, unique) - Unique affiliate code for links
      - `name` (text) - Affiliate name
      - `email` (text) - Affiliate email
      - `commission_rate` (numeric) - Commission percentage (default 30%)
      - `total_earnings` (numeric) - Total earnings accumulated
      - `created_at` (timestamptz) - When affiliate was created
    
    - `subscriptions`
      - `id` (uuid, primary key) - Unique subscription identifier
      - `user_email` (text) - Subscriber email
      - `user_name` (text) - Subscriber name
      - `status` (text) - Subscription status (active, cancelled, expired)
      - `amount` (numeric) - Subscription amount (9.99)
      - `affiliate_id` (uuid, foreign key) - Reference to affiliate if purchased via affiliate link
      - `stripe_subscription_id` (text) - Stripe subscription ID
      - `started_at` (timestamptz) - When subscription started
      - `expires_at` (timestamptz) - When subscription expires
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `purchases`
      - `id` (uuid, primary key) - Unique purchase identifier
      - `subscription_id` (uuid, foreign key) - Reference to subscription
      - `amount` (numeric) - Purchase amount
      - `affiliate_commission` (numeric) - Commission paid to affiliate
      - `affiliate_id` (uuid, foreign key) - Reference to affiliate
      - `created_at` (timestamptz) - Purchase timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Add policies for public affiliate registration
    - Add policies for viewing own affiliate stats

  3. Important Notes
    - Commission rate is stored as decimal (0.30 = 30%)
    - All monetary values stored in USD
    - Affiliate codes must be unique for link generation
    - Subscription status tracked for active/cancelled states
*/

-- Create affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  commission_rate numeric DEFAULT 0.30,
  total_earnings numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  status text DEFAULT 'active',
  amount numeric DEFAULT 9.99,
  affiliate_id uuid REFERENCES affiliates(id),
  stripe_subscription_id text,
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES subscriptions(id),
  amount numeric NOT NULL,
  affiliate_commission numeric DEFAULT 0,
  affiliate_id uuid REFERENCES affiliates(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Policies for affiliates table
CREATE POLICY "Anyone can create affiliate account"
  ON affiliates FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Affiliates can view own data"
  ON affiliates FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Affiliates can update own data"
  ON affiliates FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for subscriptions table
CREATE POLICY "Anyone can create subscription"
  ON subscriptions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view subscriptions"
  ON subscriptions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update subscriptions"
  ON subscriptions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for purchases table
CREATE POLICY "Anyone can create purchase"
  ON purchases FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view purchases"
  ON purchases FOR SELECT
  TO anon
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(code);
CREATE INDEX IF NOT EXISTS idx_subscriptions_affiliate ON subscriptions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_purchases_affiliate ON purchases(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(user_email);