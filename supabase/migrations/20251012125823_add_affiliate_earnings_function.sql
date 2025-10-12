/*
  # Add Affiliate Earnings Function

  1. New Functions
    - `increment_affiliate_earnings` - Atomically increment affiliate total_earnings
  
  2. Purpose
    - Safely update affiliate earnings when donations/subscriptions are processed
    - Prevents race conditions during concurrent updates
  
  3. Security
    - Function is accessible to service role for webhook processing
*/

-- Create function to safely increment affiliate earnings
CREATE OR REPLACE FUNCTION increment_affiliate_earnings(
  affiliate_id uuid,
  amount numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE affiliates
  SET total_earnings = total_earnings + amount
  WHERE id = affiliate_id;
END;
$$;