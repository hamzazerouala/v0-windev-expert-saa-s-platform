import { type NextRequest, NextResponse } from "next/server"
import { AdminAuthStorage } from "@/lib/admin-auth-storage"

export async function POST(request: NextRequest) {
  try {
    const { method } = await request.json()
    console.log("[v0] Send auth code request - method:", method)

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    console.log("[v0] Generated code:", code)

    // Store the code
    AdminAuthStorage.storeCode(code)
    console.log("[v0] Code stored successfully")

    if (method === "email") {
      // Send email using SMTP2GO
      const siteEmail = process.env.NEXT_PUBLIC_SITE_EMAIL || "admin@windevexpert.com"
      const smtp2goApiKey = process.env.SMTP2GO_API_KEY
      const senderEmail = process.env.SMTP2GO_SENDER_EMAIL || siteEmail

      if (!smtp2goApiKey) {
        console.error("[v0] SMTP2GO API key not configured")
        return NextResponse.json(
          { error: "Configuration email manquante. Veuillez configurer SMTP2GO dans les paramètres." },
          { status: 500 },
        )
      }

      console.log("[v0] Sending email to:", siteEmail)

      const emailResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": smtp2goApiKey,
        },
        body: JSON.stringify({
          sender: senderEmail,
          to: [siteEmail],
          subject: "Code d'authentification administrateur",
          html_body: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Code d'authentification</h2>
              <p>Votre code de vérification pour accéder à l'administration :</p>
              <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                ${code}
              </div>
              <p style="color: #666; font-size: 14px;">Ce code expire dans 10 minutes.</p>
              <p style="color: #999; font-size: 12px;">Si vous n'avez pas demandé ce code, ignorez cet email.</p>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.error("[v0] Email sending failed:", errorData)
        return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
      }

      console.log("[v0] Email sent successfully")
      return NextResponse.json({ success: true, message: "Code envoyé par email" })
    } else if (method === "sms") {
      // Firebase Phone Auth cannot be done server-side, it requires browser environment
      // The SMS will be sent from the client using Firebase
      const adminPhone = "+213558440392" // Configured admin phone

      console.log("[v0] SMS method selected - code will be sent via Firebase client-side to:", adminPhone)

      // Return success - the actual SMS sending happens client-side via Firebase
      return NextResponse.json({
        success: true,
        message: "Prêt pour l'envoi SMS",
        phoneNumber: adminPhone,
      })
    }

    return NextResponse.json({ error: "Méthode non supportée" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Error in send-auth-code:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du code" }, { status: 500 })
  }
}
