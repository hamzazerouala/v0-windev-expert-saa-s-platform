import { NextResponse } from "next/server"
import { adminAuthStorage } from "@/lib/admin-auth-storage"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    console.log("[v0] Verify auth code request:", { code })

    if (!code) {
      return NextResponse.json({ error: "Code requis" }, { status: 400 })
    }

    // Get stored code
    const storedData = adminAuthStorage.getCode("admin")

    if (!storedData) {
      console.log("[v0] No stored code found")
      return NextResponse.json({ valid: false, error: "Code expiré ou invalide" }, { status: 400 })
    }

    // Check if code is expired (10 minutes)
    const isExpired = Date.now() - storedData.timestamp > 10 * 60 * 1000

    if (isExpired) {
      console.log("[v0] Code expired")
      adminAuthStorage.deleteCode("admin")
      return NextResponse.json({ valid: false, error: "Code expiré" }, { status: 400 })
    }

    // Verify code
    const isValid = storedData.code === code

    console.log("[v0] Code verification:", {
      provided: code,
      stored: storedData.code,
      isValid,
    })

    if (isValid) {
      // Delete code after successful verification
      adminAuthStorage.deleteCode("admin")
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({ valid: false, error: "Code incorrect" }, { status: 400 })
  } catch (error: any) {
    console.error("[v0] Error verifying auth code:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification" }, { status: 500 })
  }
}
