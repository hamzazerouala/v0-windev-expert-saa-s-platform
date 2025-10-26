import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { sendTemporaryPasswordEmail } from "@/lib/email"

// Generate a secure random password
function generateTemporaryPassword(): string {
  const length = 12
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length]
  }
  return password
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] Starting temporary password generation")

    let supabase
    try {
      supabase = createAdminClient()
      console.log("[v0] Admin client created successfully")
    } catch (clientError) {
      console.error("[v0] Error creating admin client:", clientError)
      return NextResponse.json({ error: "Failed to create database connection" }, { status: 500 })
    }

    const userId = params.id
    console.log("[v0] Generating temporary password for user:", userId)

    // Get user info
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("email, first_name, last_name")
      .eq("id", userId)
      .single()

    if (userError || !user) {
      console.error("[v0] User not found:", userError)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("[v0] User found:", user.email)

    // Generate temporary password
    const tempPassword = generateTemporaryPassword()
    console.log("[v0] Generated temporary password")

    // Update user password using Supabase Admin API
    try {
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        password: tempPassword,
      })

      if (updateError) {
        console.error("[v0] Error updating password:", updateError)
        return NextResponse.json({ error: "Failed to update password: " + updateError.message }, { status: 500 })
      }
      console.log("[v0] Password updated successfully")
    } catch (authError) {
      console.error("[v0] Auth error:", authError)
      return NextResponse.json({ error: "Authentication error" }, { status: 500 })
    }

    // Set must_change_password flag
    try {
      const { error: flagError } = await supabase
        .from("profiles")
        .update({ must_change_password: true })
        .eq("id", userId)

      if (flagError) {
        console.error("[v0] Error setting must_change_password flag:", flagError)
        // Don't fail the request, just log the error
      } else {
        console.log("[v0] must_change_password flag set successfully")
      }
    } catch (flagError) {
      console.error("[v0] Exception setting flag:", flagError)
      // Don't fail the request
    }

    // Send email with temporary password
    try {
      console.log("[v0] Attempting to send email to:", user.email)
      await sendTemporaryPasswordEmail(user.email, user.first_name || "Utilisateur", tempPassword)
      console.log("[v0] Temporary password email sent successfully")
    } catch (emailError) {
      console.error("[v0] Error sending email:", emailError)
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown email error"
      return NextResponse.json({ error: "Password updated but failed to send email: " + errorMessage }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Temporary password sent successfully" })
  } catch (error) {
    console.error("[v0] Unexpected error in send-temp-password:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : ""
    console.error("[v0] Error stack:", errorStack)

    return NextResponse.json({ error: "Internal server error: " + errorMessage }, { status: 500 })
  }
}
