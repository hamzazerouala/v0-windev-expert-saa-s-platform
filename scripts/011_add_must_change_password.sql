-- Add must_change_password field to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT FALSE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_must_change_password ON profiles(must_change_password);
