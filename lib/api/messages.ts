import { createAdminClient } from "@/lib/supabase/server"

export async function sendMessageToUser(userId: string, subject: string, message: string, parentMessageId?: string) {
  const supabase = createAdminClient()

  // Get user info
  const { data: user } = await supabase
    .from("profiles")
    .select("email, first_name, last_name")
    .eq("id", userId)
    .single()

  if (!user) {
    throw new Error("User not found")
  }

  // Create conversation_id if this is a new conversation
  const conversationId = parentMessageId ? undefined : crypto.randomUUID()

  // If replying, get the conversation_id from parent message
  let finalConversationId = conversationId
  if (parentMessageId) {
    const { data: parentMessage } = await supabase
      .from("user_messages")
      .select("conversation_id")
      .eq("id", parentMessageId)
      .single()

    if (parentMessage) {
      finalConversationId = parentMessage.conversation_id
    }
  }

  // Insert message
  const { data: newMessage, error } = await supabase
    .from("user_messages")
    .insert({
      user_id: userId,
      subject,
      message,
      is_read: false,
      parent_message_id: parentMessageId || null,
      conversation_id: finalConversationId,
      sender_type: "admin",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error sending message:", error)
    throw error
  }

  // Send email notification
  try {
    const { sendMessageNotificationEmail } = await import("@/lib/email")
    const messageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/membre/messages`
    await sendMessageNotificationEmail(user.email, `${user.first_name} ${user.last_name}`, subject, message, messageUrl)
  } catch (emailError) {
    console.error("[v0] Error sending email notification:", emailError)
    // Don't throw - message was saved successfully
  }

  return newMessage
}

export async function getUserMessages(userId: string) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("user_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching messages:", error)
    throw error
  }

  return data
}

export async function getConversationThread(conversationId: string) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("user_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching conversation:", error)
    throw error
  }

  return data
}

export async function markMessageAsRead(messageId: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("user_messages").update({ is_read: true }).eq("id", messageId)

  if (error) {
    console.error("[v0] Error marking message as read:", error)
    throw error
  }
}
