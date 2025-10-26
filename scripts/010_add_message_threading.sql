-- Add threading support to user_messages table
ALTER TABLE user_messages
ADD COLUMN IF NOT EXISTS conversation_id UUID,
ADD COLUMN IF NOT EXISTS parent_message_id UUID REFERENCES user_messages(id) ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_messages_conversation ON user_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_user_messages_parent ON user_messages(parent_message_id);

-- Update existing messages to have conversation_ids
UPDATE user_messages
SET conversation_id = id
WHERE conversation_id IS NULL AND parent_message_id IS NULL;
