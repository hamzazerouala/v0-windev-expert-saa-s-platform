"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProjects(filters?: {
  status?: string
  search?: string
}) {
  try {
    const supabase = createAdminClient()

    let query = supabase
      .from("projects")
      .select(`
        *,
        client:profiles!projects_client_id_fkey(id, first_name, last_name, email, company),
        milestones:project_milestones(id, title, status, amount_cents, currency)
      `)
      .order("created_at", { ascending: false })

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return { success: false, error: "Failed to fetch projects" }
  }
}

export async function getProject(id: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        client:profiles!projects_client_id_fkey(id, first_name, last_name, email, company, phone),
        milestones:project_milestones(
          *,
          tasks:project_tasks(*)
        ),
        documents:project_documents(*),
        messages:project_messages(
          *,
          sender:profiles(id, first_name, last_name, avatar_url)
        )
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return { success: false, error: "Failed to fetch project" }
  }
}

export async function createProject(projectData: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("projects").insert(projectData).select().single()

    if (error) throw error

    revalidatePath("/admin/projets")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(id: string, projectData: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("projects")
      .update({ ...projectData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/projets")
    revalidatePath(`/admin/projets/${id}`)

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error updating project:", error)
    return { success: false, error: "Failed to update project" }
  }
}
