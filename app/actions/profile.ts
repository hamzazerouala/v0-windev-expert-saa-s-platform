"use server"

import { cookies } from "next/headers"

export async function updateProfile(formData: {
  first_name: string
  last_name: string
  phone?: string
  bio?: string
  company?: string
}) {
  try {
    console.log("[v0] Updating profile with data:", formData)

    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      console.log("[v0] No user_id cookie found")
      return { success: false, error: "Non authentifié" }
    }

    console.log("[v0] User ID from cookie:", userId)

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("[v0] Missing Supabase credentials")
      return { success: false, error: "Configuration manquante" }
    }

    // Update profile in Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone || null,
        bio: formData.bio || null,
        company: formData.company || null,
        updated_at: new Date().toISOString(),
      }),
    })

    console.log("[v0] Profile update response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Profile update error:", errorText)
      return { success: false, error: "Erreur lors de la mise à jour du profil" }
    }

    const updatedProfile = await response.json()
    console.log("[v0] Profile updated successfully:", updatedProfile)

    return { success: true, data: updatedProfile[0] }
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return { success: false, error: "Erreur lors de la mise à jour du profil" }
  }
}

export async function getCurrentUserProfile() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      return { success: false, error: "Non authentifié" }
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, error: "Configuration manquante" }
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=*`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    })

    if (!response.ok) {
      return { success: false, error: "Erreur lors de la récupération du profil" }
    }

    const profiles = await response.json()
    return { success: true, data: profiles[0] }
  } catch (error) {
    console.error("[v0] Error fetching profile:", error)
    return { success: false, error: "Erreur lors de la récupération du profil" }
  }
}
