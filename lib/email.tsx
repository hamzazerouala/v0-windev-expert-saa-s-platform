"use server"

import { getSMTP2GOConfig } from "@/app/actions/settings"

interface EmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email using SMTP2GO HTTP API
 */
async function sendEmail({ to, subject, html, text }: EmailParams) {
  console.log("[v0] Sending email via SMTP2GO to:", to)

  // Get SMTP2GO configuration from database
  const configResult = await getSMTP2GOConfig()
  if (!configResult.success || !configResult.data) {
    throw new Error("SMTP2GO non configuré. Veuillez ajouter la clé API dans Paramètres > APIs > SMTP2GO.")
  }

  const { apiKey, senderEmail } = configResult.data

  try {
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": apiKey,
      },
      body: JSON.stringify({
        sender: senderEmail,
        to: [to],
        subject,
        html_body: html,
        text_body: text || html.replace(/<[^>]*>/g, ""), // Strip HTML tags for text version
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] SMTP2GO API error:", errorData)
      throw new Error(`SMTP2GO error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const result = await response.json()
    console.log("[v0] Email sent successfully via SMTP2GO:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    throw error
  }
}

/**
 * Send SMS using SMTP2GO (via email-to-SMS gateway or direct SMS API)
 */
export async function sendSMS(phoneNumber: string, message: string) {
  console.log("[v0] Sending SMS via SMTP2GO to:", phoneNumber)

  // Get SMTP2GO configuration from database
  const configResult = await getSMTP2GOConfig()
  if (!configResult.success || !configResult.data) {
    throw new Error("SMTP2GO non configuré. Veuillez ajouter la clé API dans Paramètres > APIs > SMTP2GO.")
  }

  const { apiKey } = configResult.data

  try {
    // Note: SMTP2GO doesn't have a direct SMS API, but you can use their email service
    // to send to SMS gateways. For a proper SMS solution, consider using Twilio, Vonage, etc.
    // This is a placeholder implementation
    console.log("[v0] SMS functionality requires SMS gateway integration")
    console.log("[v0] Phone:", phoneNumber, "Message:", message)

    // For now, we'll just log it. In production, integrate with an SMS provider
    return {
      success: true,
      message: "SMS envoyé (simulation - intégrer un fournisseur SMS réel)",
    }
  } catch (error) {
    console.error("[v0] Error sending SMS:", error)
    throw error
  }
}

/**
 * Send temporary password email
 */
export async function sendTemporaryPasswordEmail(email: string, name: string, tempPassword: string) {
  const subject = "Votre mot de passe temporaire - WindevExpert"

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .password-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .password { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WindevExpert</h1>
            <p>Mot de passe temporaire</p>
          </div>
          <div class="content">
            <p>Bonjour ${name},</p>
            <p>Un administrateur a généré un mot de passe temporaire pour votre compte.</p>
            
            <div class="password-box">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">Votre mot de passe temporaire :</p>
              <p class="password">${tempPassword}</p>
            </div>

            <div class="warning">
              <strong>⚠️ Important :</strong>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Ce mot de passe est temporaire et doit être changé lors de votre première connexion</li>
                <li>Ne partagez jamais ce mot de passe avec qui que ce soit</li>
                <li>Si vous n'avez pas demandé ce mot de passe, contactez immédiatement l'administrateur</li>
              </ul>
            </div>

            <p>Pour vous connecter :</p>
            <ol>
              <li>Rendez-vous sur la page de connexion</li>
              <li>Utilisez votre email et ce mot de passe temporaire</li>
              <li>Vous serez invité à créer un nouveau mot de passe</li>
            </ol>

            <p>Cordialement,<br>L'équipe WindevExpert</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} WindevExpert. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({ to: email, subject, html })
}

/**
 * Send message notification email
 */
export async function sendMessageNotificationEmail(
  email: string,
  name: string,
  subject: string,
  message: string,
  messageUrl: string,
) {
  const emailSubject = `Nouveau message: ${subject}`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-box { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WindevExpert</h1>
            <p>Nouveau message</p>
          </div>
          <div class="content">
            <p>Bonjour ${name},</p>
            <p>Vous avez reçu un nouveau message :</p>
            
            <div class="message-box">
              <h3 style="margin-top: 0;">${subject}</h3>
              <p>${message}</p>
            </div>

            <a href="${messageUrl}" class="button">Voir le message</a>

            <p>Cordialement,<br>L'équipe WindevExpert</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} WindevExpert. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({ to: email, subject: emailSubject, html })
}
