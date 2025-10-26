"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Smartphone, Lock, Mail, AlertTriangle } from "lucide-react"
import { isFirebaseConfigured, sendSMSVerification, verifySMSCode } from "@/lib/firebase-config"
import { storeUser, DEV_ACCOUNTS } from "@/lib/auth/mock-auth"
import type { ConfirmationResult } from "firebase/auth"

type AuthMethod = "sms" | "email"
type Step = "method" | "code"

export default function AdminSecureLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("method")
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [firebaseConfigured, setFirebaseConfigured] = useState(false)

  useEffect(() => {
    setFirebaseConfigured(isFirebaseConfigured())
  }, [])

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method)
    if (method === "sms") {
      if (!firebaseConfigured) {
        setError(
          "L'authentification SMS n'est pas configurée. Veuillez utiliser l'email ou configurer Firebase dans les paramètres.",
        )
        return
      }
      handleSendSMSCode()
    } else {
      handleSendEmailCode()
    }
  }

  const handleSendSMSCode = async () => {
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Sending SMS code to configured admin number...")

      const adminPhone = "+213558440392" // Configured admin phone number

      // Initialize Firebase and send SMS using client-side Firebase Auth
      const confirmation = await sendSMSVerification(adminPhone, "recaptcha-container")

      if (confirmation) {
        console.log("[v0] SMS sent successfully via Firebase")
        setConfirmationResult(confirmation)
        setStep("code")
      } else {
        setError("Erreur lors de l'envoi du SMS")
      }
    } catch (err: any) {
      console.error("[v0] Error sending SMS:", err)
      setError(err.message || "Erreur lors de l'envoi du code SMS")
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmailCode = async () => {
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Sending email code...")

      // Send email verification code
      const response = await fetch("/api/admin/send-auth-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "email" }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Email code sent successfully")
        setStep("code")
      } else {
        setError(data.error || "Erreur lors de l'envoi du code email")
      }
    } catch (err: any) {
      console.error("[v0] Error sending email code:", err)
      setError("Erreur lors de l'envoi du code email")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (authMethod === "sms") {
        console.log("[v0] Verifying SMS code:", verificationCode)

        if (!confirmationResult) {
          setError("Session expirée. Veuillez recommencer.")
          setLoading(false)
          return
        }

        const isValid = await verifySMSCode(confirmationResult, verificationCode)

        if (isValid) {
          console.log("[v0] SMS code verified successfully, redirecting to admin...")
          storeUser(DEV_ACCOUNTS.admin.user)
          router.push("/admin")
        } else {
          setError("Code de vérification incorrect")
        }
      } else {
        console.log("[v0] Verifying email code:", verificationCode)

        const response = await fetch("/api/admin/verify-auth-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: verificationCode }),
        })

        const data = await response.json()
        console.log("[v0] Verification response:", data)

        if (response.ok && data.valid) {
          console.log("[v0] Code verified successfully, redirecting to admin...")
          storeUser(DEV_ACCOUNTS.admin.user)
          router.push("/admin")
        } else {
          setError("Code de vérification incorrect")
        }
      }
    } catch (err: any) {
      console.error("[v0] Error verifying code:", err)
      setError("Code de vérification incorrect")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div id="recaptcha-container" className="fixed top-0 left-0 opacity-0 pointer-events-none"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-cyan-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Accès Administrateur</h1>
          <p className="text-slate-400">Authentification sécurisée</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              {step === "method" && (
                <>
                  <Shield className="w-5 h-5" />
                  Méthode d'authentification
                </>
              )}
              {step === "code" && (
                <>
                  <Lock className="w-5 h-5" />
                  Code de vérification
                </>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {step === "method" && "Choisissez votre méthode d'authentification préférée"}
              {step === "code" &&
                (authMethod === "sms"
                  ? "Entrez le code à 6 chiffres envoyé par SMS"
                  : "Entrez le code à 6 chiffres envoyé par email")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "method" && (
              <div className="space-y-3">
                <Button
                  onClick={() => handleMethodSelect("email")}
                  className="w-full h-auto py-4 bg-slate-700 hover:bg-slate-600 text-left justify-start"
                  disabled={loading}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Mail className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Authentification par Email</div>
                      <div className="text-sm text-slate-400">Recevoir un code sur l'email du site</div>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleMethodSelect("sms")}
                  className="w-full h-auto py-4 bg-slate-700 hover:bg-slate-600 text-left justify-start"
                  disabled={loading || !firebaseConfigured}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Smartphone className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">Authentification par SMS</div>
                      <div className="text-sm text-slate-400">
                        {firebaseConfigured ? "Code envoyé au numéro administrateur" : "Non configuré"}
                      </div>
                    </div>
                    {!firebaseConfigured && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  </div>
                </Button>

                {loading && <div className="text-center text-sm text-slate-400 mt-4">Envoi du code en cours...</div>}
              </div>
            )}

            {step === "code" && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-slate-200">
                    Code de vérification
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-slate-500">
                    {authMethod === "sms"
                      ? "Code envoyé au numéro administrateur configuré"
                      : "Code envoyé à l'adresse email configurée"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    onClick={() => {
                      setStep("method")
                      setVerificationCode("")
                      setError("")
                    }}
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                    disabled={loading || verificationCode.length !== 6}
                  >
                    {loading ? "Vérification..." : "Vérifier"}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-500 text-center">
                Cette page est réservée aux administrateurs autorisés. Toute tentative d'accès non autorisée sera
                enregistrée.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            {authMethod === "sms" && firebaseConfigured
              ? "Protégé par reCAPTCHA et Firebase Authentication"
              : "Protégé par code email"}
          </p>
        </div>
      </div>
    </div>
  )
}
