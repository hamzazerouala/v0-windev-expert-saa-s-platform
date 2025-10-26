import { NextResponse } from "next/server"
import { sendMessageToUser } from "@/lib/api/messages"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, subject, message, parentMessageId } = body

    if (!userId || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage = await sendMessageToUser(userId, subject, message, parentMessageId)
    return NextResponse.json(newMessage)
  } catch (error) {
    console.error("[v0] Error in POST /api/messages/reply:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
