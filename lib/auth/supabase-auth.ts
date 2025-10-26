import { createBrowserClient } from "@/lib/supabase/client"

export type UserRole = "client" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  must_change_password?: boolean
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  console.log("[v0] Attempting to authenticate user:", email)

  const supabase = await createBrowserClient()

  console.log("[v0] Calling signInWithPassword...")
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    console.error("[v0] Auth error:", authError?.message || "Unknown error")
    console.error("[v0] Auth error code:", authError?.code)
    console.error("[v0] Full auth error:", JSON.stringify(authError, null, 2))
    return null
  }

  console.log("[v0] User authenticated:", authData.user.id)
  console.log("[v0] Session created:", !!authData.session)

  // Get user profile from database
  console.log("[v0] Fetching user profile from database...")
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single()

  if (profileError || !profile) {
    console.error("[v0] Profile error:", profileError)
    return null
  }

  console.log("[v0] Profile fetched successfully")

  if (typeof document !== "undefined") {
    document.cookie = `user_id=${authData.user.id}; path=/; max-age=86400; SameSite=Lax`
    console.log("[v0] User ID cookie set")
  }

  return {
    id: profile.id,
    email: profile.email,
    name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || profile.email,
    role: profile.role as UserRole,
    avatar: profile.avatar_url || undefined,
    phone: profile.phone || undefined,
    must_change_password: profile.must_change_password || false,
  }
}

export function storeUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("windevexpert_user", JSON.stringify(user))
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("windevexpert_user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export async function clearStoredUser(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("windevexpert_user")

    // Also sign out from Supabase
    const supabase = await createBrowserClient()
    await supabase.auth.signOut()
  }
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

export function isClient(user: User | null): boolean {
  return user?.role === "client"
}
