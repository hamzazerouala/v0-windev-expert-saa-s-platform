import { NextResponse } from "next/server"
import { getConversationThread } from "@/lib/api/messages"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 })
    }

    const messages = await getConversationThread(conversationId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("[v0] Error in GET /api/messages/conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 })
  }
}
