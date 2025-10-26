"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Send, Mail, MailOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  subject: string
  message: string
  created_at: string
  is_read: boolean
  sender_type: "admin" | "user"
  conversation_id: string
  parent_message_id: string | null
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<{ [key: string]: Message[] }>({})
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/users/messages")
      if (!response.ok) throw new Error("Failed to fetch messages")

      const messages: Message[] = await response.json()

      // Group messages by conversation
      const grouped = messages.reduce(
        (acc, msg) => {
          const convId = msg.conversation_id
          if (!acc[convId]) acc[convId] = []
          acc[convId].push(msg)
          return acc
        },
        {} as { [key: string]: Message[] },
      )

      setConversations(grouped)
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedConversation || !replyMessage.trim()) return

    setSending(true)
    try {
      const thread = conversations[selectedConversation]
      const firstMessage = thread[0]

      const response = await fetch("/api/messages/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: firstMessage.user_id,
          subject: `Re: ${firstMessage.subject}`,
          message: replyMessage,
          parentMessageId: firstMessage.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to send reply")

      toast({
        title: "Succès",
        description: "Votre réponse a été envoyée",
      })

      setReplyMessage("")
      fetchMessages()
    } catch (error) {
      console.error("[v0] Error sending reply:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const conversationList = Object.entries(conversations)

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Consultez et répondez à vos messages</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>{conversationList.length} conversation(s)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {conversationList.map(([convId, messages]) => {
              const firstMsg = messages[0]
              const unreadCount = messages.filter((m) => !m.is_read && m.sender_type === "admin").length

              return (
                <button
                  key={convId}
                  onClick={() => setSelectedConversation(convId)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedConversation === convId ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 ? (
                          <Mail className="h-4 w-4 text-primary" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        )}
                        <p className="font-medium truncate">{firstMsg.subject}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{messages.length} message(s)</p>
                    </div>
                    {unreadCount > 0 && (
                      <Badge variant="default" className="shrink-0">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </button>
              )
            })}

            {conversationList.length === 0 && <p className="text-center text-muted-foreground py-8">Aucun message</p>}
          </CardContent>
        </Card>

        {/* Conversation Thread */}
        <Card className="md:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader>
                <CardTitle>{conversations[selectedConversation][0].subject}</CardTitle>
                <CardDescription>
                  {conversations[selectedConversation].length} message(s) dans cette conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Messages Thread */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {conversations[selectedConversation].map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.sender_type === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback>{msg.sender_type === "admin" ? "A" : "U"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex-1 rounded-lg p-4 ${
                          msg.sender_type === "admin" ? "bg-muted" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        <p
                          className={`text-xs mt-2 ${
                            msg.sender_type === "admin" ? "text-muted-foreground" : "text-primary-foreground/70"
                          }`}
                        >
                          {new Date(msg.created_at).toLocaleString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleReply} className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="reply">Votre réponse</Label>
                    <Textarea
                      id="reply"
                      placeholder="Écrivez votre réponse..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={sending || !replyMessage.trim()}>
                    {sending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Envoi...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <div className="text-center text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sélectionnez une conversation pour voir les messages</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
