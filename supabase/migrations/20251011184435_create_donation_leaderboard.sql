/*
  # Create Donation Leaderboard

  1. New Tables
    - `donation_leaderboard`
      - `id` (uuid, primary key)
      - `username` (text) - Username of the donor (e.g., @eliteifyx)
      - `amount` (numeric) - Total donation amount in dollars
      - `created_at` (timestamptz) - When the entry was created
      - `updated_at` (timestamptz) - When the entry was last updated

  2. Security
    - Enable RLS on `donation_leaderboard` table
    - Add policy for public read access (anyone can view the leaderboard)
    - Add policy for authenticated admin users to insert/update entries
*/

CREATE TABLE IF NOT EXISTS donation_leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donation_leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view donation leaderboard"
  ON donation_leaderboard
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert donations"
  ON donation_leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update donations"
  ON donation_leaderboard
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_donation_leaderboard_amount ON donation_leaderboard(amount DESC);