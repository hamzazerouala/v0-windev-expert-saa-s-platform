"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getQuoteRequests(filters?: {
  status?: string
  search?: string
}) {
  try {
    const supabase = createAdminClient()

    let query = supabase
      .from("quote_requests")
      .select(`
        *,
        user:profiles(id, first_name, last_name, email, company)
      `)
      .order("created_at", { ascending: false })

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status)
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`,
      )
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching quote requests:", error)
    return { success: false, error: "Failed to fetch quote requests" }
  }
}

export async function getQuoteRequest(id: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("quote_requests")
      .select(`
        *,
        user:profiles(id, first_name, last_name, email, company, phone),
        messages:quote_messages(
          *,
          sender:profiles(id, first_name, last_name, avatar_url)
        )
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching quote request:", error)
    return { success: false, error: "Failed to fetch quote request" }
  }
}

export async function updateQuoteStatus(id: string, status: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("quote_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/devis")
    revalidatePath(`/admin/devis/${id}`)

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error updating quote status:", error)
    return { success: false, error: "Failed to update quote status" }
  }
}

export async function createQuoteMessage(quoteId: string, message: string, senderId: string, senderType: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("quote_messages")
      .insert({
        quote_id: quoteId,
        message,
        sender_id: senderId,
        sender_type: senderType,
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath(`/admin/devis/${quoteId}`)

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error creating quote message:", error)
    return { success: false, error: "Failed to send message" }
  }
}
