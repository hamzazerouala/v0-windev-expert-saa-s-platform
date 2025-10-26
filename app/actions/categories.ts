"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getBlogCategories() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("blog_categories").select("*").order("name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching blog categories:", error)
    return { success: false, error: "Failed to fetch blog categories" }
  }
}

export async function getProductCategories() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching product categories:", error)
    return { success: false, error: "Failed to fetch product categories" }
  }
}

export async function getFormationCategories() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("formation_categories").select("*").order("name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching formation categories:", error)
    return { success: false, error: "Failed to fetch formation categories" }
  }
}

export async function createBlogCategory(categoryData: {
  name: string
  slug: string
  description?: string
}) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("blog_categories").insert(categoryData).select().single()

    if (error) throw error

    revalidatePath("/admin/blog")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error creating blog category:", error)
    return { success: false, error: "Failed to create blog category" }
  }
}
