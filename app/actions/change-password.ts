"use server"

import { cookies } from "next/headers"

export async function changePassword(newPassword: string) {
  console.log("[v0] Server Action: changePassword called")
  console.log("[v0] New password length:", newPassword.length)

  try {
    // Get user ID from cookie
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    console.log("[v0] User ID from cookie:", userId)

    if (!userId) {
      console.error("[v0] No user ID found in cookie")
      return { success: false, error: "Non authentifié" }
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Missing Supabase credentials")
      return { success: false, error: "Configuration serveur manquante" }
    }

    console.log("[v0] Supabase URL:", supabaseUrl)
    console.log("[v0] Updating password for user:", userId)

    // Update password using Supabase Admin API
    const updatePasswordResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    })

    console.log("[v0] Password update response status:", updatePasswordResponse.status)

    if (!updatePasswordResponse.ok) {
      const errorData = await updatePasswordResponse.text()
      console.error("[v0] Failed to update password. Status:", updatePasswordResponse.status)
      console.error("[v0] Error response:", errorData)
      return { success: false, error: "Échec de la mise à jour du mot de passe" }
    }

    const responseData = await updatePasswordResponse.json()
    console.log("[v0] Password updated successfully. Response:", JSON.stringify(responseData, null, 2))

    // Remove must_change_password flag
    console.log("[v0] Updating profile to remove must_change_password flag...")
    const updateProfileResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        must_change_password: false,
      }),
    })

    console.log("[v0] Profile update response status:", updateProfileResponse.status)

    if (!updateProfileResponse.ok) {
      const errorData = await updateProfileResponse.text()
      console.error("[v0] Failed to update profile:", errorData)
      // Don't fail the whole operation if this fails
    } else {
      console.log("[v0] Profile updated successfully")
    }

    console.log("[v0] Password change completed successfully")
    return { success: true }
  } catch (error) {
    console.error("[v0] Server Action error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur serveur",
    }
  }
}
