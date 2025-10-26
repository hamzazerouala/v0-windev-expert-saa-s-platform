export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    console.log("[v0] POST /api/auth/change-password - Start")

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 })
    }

    const { newPassword } = await request.json()
    console.log("[v0] New password received, length:", newPassword?.length)

    if (!newPassword || newPassword.length < 8) {
      console.log("[v0] Password validation failed")
      return NextResponse.json({ error: "Le mot de passe doit contenir au moins 8 caractères" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const userIdCookie = cookieStore.get("user_id")
    console.log("[v0] User ID from cookie:", userIdCookie?.value)

    if (!userIdCookie?.value) {
      console.error("[v0] No user_id cookie found")
      return NextResponse.json({ error: "Non authentifié - veuillez vous reconnecter" }, { status: 401 })
    }

    const userId = userIdCookie.value

    console.log("[v0] Updating password for user:", userId)

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

    if (!updatePasswordResponse.ok) {
      const errorData = await updatePasswordResponse.json()
      console.error("[v0] Error updating password:", errorData)
      return NextResponse.json(
        { error: "Échec de la mise à jour du mot de passe: " + (errorData.message || "Erreur inconnue") },
        { status: 500 },
      )
    }

    console.log("[v0] Password updated successfully")

    const updateFlagResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
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

    if (!updateFlagResponse.ok) {
      console.error("[v0] Error removing must_change_password flag")
    } else {
      console.log("[v0] must_change_password flag removed")
    }

    console.log("[v0] Returning success response")
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in POST /api/auth/change-password:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}
