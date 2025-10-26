"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

const BLOGGER_UUID = "00000000-0000-0000-0000-000000000001"

export async function getBlogPosts(filters?: {
  status?: string
  category?: string
  search?: string
}) {
  try {
    const supabase = createAdminClient()

    let query = supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(id, name, slug)
      `)
      .order("created_at", { ascending: false })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.category) {
      query = query.eq("category_id", filters.category)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return { success: false, error: "Failed to fetch blog posts" }
  }
}

export async function getBlogPost(id: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        category:blog_categories(id, name, slug)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return { success: false, error: "Failed to fetch blog post" }
  }
}

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

export async function createBlogPost(postData: any) {
  try {
    console.log("[v0] Creating blog post with data:", JSON.stringify(postData, null, 2))

    const supabase = createAdminClient()

    const { data, error } = await supabase.from("blog_posts").insert(postData).select().single()

    if (error) {
      console.error("[v0] Supabase error creating blog post:", error)
      throw error
    }

    console.log("[v0] Blog post created successfully:", data)

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Error creating blog post:", error)
    return {
      success: false,
      error: error.message || "Failed to create blog post",
    }
  }
}

export async function updateBlogPost(id: string, postData: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", id).select().single()

    if (error) throw error

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath(`/blog/${data.slug}`)

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error updating blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

export async function importBlogPostsFromJSON(posts: any[]) {
  try {
    console.log("[v0] Importing", posts.length, "blog posts from JSON")
    const supabase = createAdminClient()

    const results = []

    for (const post of posts) {
      try {
        if (!post.title || !post.slug || !post.content) {
          console.error("[v0] Skipping invalid post:", post.title)
          results.push({
            success: false,
            title: post.title,
            error: "Missing required fields",
          })
          continue
        }

        const { data, error } = await supabase
          .from("blog_posts")
          .insert({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt || null,
            featured_image_url: post.featured_image_url || null,
            category_id: post.category_id || null,
            status: post.status || "draft",
            published_at: post.published_at || null,
            meta_title: post.meta_title || null,
            meta_description: post.meta_description || null,
          })
          .select()
          .single()

        if (error) {
          console.error("[v0] Error importing post:", post.title, error)
          results.push({
            success: false,
            title: post.title,
            error: error.message,
          })
        } else {
          console.log("[v0] Successfully imported:", post.title)
          results.push({
            success: true,
            title: post.title,
            data,
          })
        }
      } catch (err: any) {
        console.error("[v0] Exception importing post:", post.title, err)
        results.push({
          success: false,
          title: post.title,
          error: err.message,
        })
      }
    }

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    const successCount = results.filter((r) => r.success).length
    const failCount = results.filter((r) => !r.success).length

    return {
      success: true,
      imported: successCount,
      failed: failCount,
      results,
    }
  } catch (error: any) {
    console.error("[v0] Error importing blog posts:", error)
    return {
      success: false,
      error: error.message || "Failed to import blog posts",
    }
  }
}
