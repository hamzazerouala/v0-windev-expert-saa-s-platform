"use server"

// SMTP2GO API-based email service (works in all runtimes)
// Documentation: https://apidoc.smtp2go.com/documentation/

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

async function sendEmail({ to, subject, html, text }: EmailOptions) {
  const apiKey = process.env.SMTP2GO_API_KEY
  const senderEmail = process.env.SMTP2GO_SENDER_EMAIL || process.env.NEXT_PUBLIC_SITE_EMAIL

  if (!apiKey) {
    throw new Error("SMTP2GO_API_KEY environment variable is not set")
  }

  if (!senderEmail) {
    throw new Error("SMTP2GO_SENDER_EMAIL or NEXT_PUBLIC_SITE_EMAIL environment variable is not set")
  }

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

  const data = await response.json()

  if (!response.ok || data.data?.error) {
    throw new Error(`Failed to send email: ${data.data?.error || response.statusText}`)
  }

  return data
}

export async function sendTemporaryPasswordEmail(email: string, firstName: string, temporaryPassword: string) {
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
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .password-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .password { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WindevExpert</h1>
            <p>Mot de passe temporaire</p>
          </div>
          <div class="content">
            <p>Bonjour ${firstName},</p>
            <p>Un administrateur a généré un mot de passe temporaire pour votre compte.</p>
            
            <div class="password-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Votre mot de passe temporaire :</p>
              <p class="password">${temporaryPassword}</p>
            </div>

            <div class="warning">
              <strong>⚠️ Important :</strong>
              <ul style="margin: 10px 0;">
                <li>Ce mot de passe est temporaire</li>
                <li>Vous devrez le changer lors de votre prochaine connexion</li>
                <li>Ne partagez jamais votre mot de passe</li>
              </ul>
            </div>

            <p>Pour vous connecter :</p>
            <ol>
              <li>Rendez-vous sur la page de connexion</li>
              <li>Utilisez votre email et ce mot de passe temporaire</li>
              <li>Vous serez automatiquement redirigé pour créer un nouveau mot de passe</li>
            </ol>

            <p>Si vous n'avez pas demandé ce mot de passe, veuillez contacter immédiatement notre support.</p>
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

export async function sendPasswordResetEmail(email: string, firstName: string, resetLink: string) {
  const subject = "Réinitialisation de votre mot de passe - WindevExpert"

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WindevExpert</h1>
            <p>Réinitialisation de mot de passe</p>
          </div>
          <div class="content">
            <p>Bonjour ${firstName},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
            </div>
            <p>Ce lien expirera dans 1 heure.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
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

export async function sendMessageNotificationEmail(email: string, firstName: string, message: string) {
  const subject = "Nouveau message - WindevExpert"

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-box { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WindevExpert</h1>
            <p>Nouveau message</p>
          </div>
          <div class="content">
            <p>Bonjour ${firstName},</p>
            <p>Vous avez reçu un nouveau message :</p>
            <div class="message-box">
              <p>${message}</p>
            </div>
            <p>Connectez-vous à votre espace membre pour répondre.</p>
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
