"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getDocuments(filters?: {
  category?: string
  search?: string
  isPublic?: boolean
}) {
  try {
    const supabase = createAdminClient()

    let query = supabase
      .from("documents")
      .select(`
        *,
        category:document_categories(id, name)
      `)
      .order("created_at", { ascending: false })

    if (filters?.category) {
      query = query.eq("category_id", filters.category)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.isPublic !== undefined) {
      query = query.eq("is_public", filters.isPublic)
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching documents:", error)
    return { success: false, error: "Failed to fetch documents" }
  }
}

export async function getDocumentCategories() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("document_categories").select("*").order("name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching document categories:", error)
    return { success: false, error: "Failed to fetch document categories" }
  }
}

export async function createDocument(documentData: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("documents").insert(documentData).select().single()

    if (error) throw error

    revalidatePath("/admin/documents")
    revalidatePath("/membre/documentation")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error creating document:", error)
    return { success: false, error: "Failed to create document" }
  }
}

export async function updateDocument(id: string, documentData: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("documents")
      .update({ ...documentData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/documents")
    revalidatePath("/membre/documentation")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error updating document:", error)
    return { success: false, error: "Failed to update document" }
  }
}

export async function deleteDocument(id: string) {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase.from("documents").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/admin/documents")
    revalidatePath("/membre/documentation")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting document:", error)
    return { success: false, error: "Failed to delete document" }
  }
}
