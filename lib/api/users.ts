import { createAdminClient } from "@/lib/supabase/server"

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  role: string
  company: string | null
  avatar_url: string | null
  bio: string | null
  language: string
  currency: string
  is_vip: boolean
  must_change_password: boolean
  created_at: string
  updated_at: string
}

export async function getAllUsers(): Promise<User[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching users:", error)
    throw new Error(`Failed to fetch users: ${error.message}`)
  }

  return data as User[]
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching user:", error)
    return null
  }

  return data as User
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("[v0] Error updating user:", error)
    throw new Error(`Failed to update user: ${error.message}`)
  }

  return data as User
}

export async function deleteUser(id: string): Promise<void> {
  const supabase = createAdminClient()

  const { error } = await supabase.from("profiles").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting user:", error)
    throw new Error(`Failed to delete user: ${error.message}`)
  }
}

export async function getUserStats(userId: string) {
  const supabase = createAdminClient()

  // Get order count
  const { count: orderCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)

  // Get project count
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("client_id", userId)

  // Get enrollment count
  const { count: enrollmentCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)

  return {
    orders: orderCount || 0,
    projects: projectCount || 0,
    enrollments: enrollmentCount || 0,
  }
}
