"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Shield, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { auth } from "@/lib/firebase-config"
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth"

export default function SecureAdminLoginPage() {
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [phoneNumber, setPhoneNumber] = useState("+213")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const router = useRouter()
  const { login } = useAuth()

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
      })
    }
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      setupRecaptcha()
      const appVerifier = window.recaptchaVerifier

      // Send SMS verification code
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      setConfirmationResult(confirmation)
      setStep("code")
    } catch (err: any) {
      console.error("[v0] SMS send error:", err)
      setError(err.message || "Erreur lors de l'envoi du code SMS")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!confirmationResult) {
        throw new Error("Aucune confirmation en attente")
      }

      // Verify the SMS code
      const result = await confirmationResult.confirm(verificationCode)
      const user = result.user

      // Check if this phone number is authorized as admin
      // In production, you would check against a database of authorized admin phone numbers
      const authorizedAdminPhones = ["+213555123456", "+213777654321"] // Example admin phones

      if (!authorizedAdminPhones.includes(phoneNumber)) {
        throw new Error("Numéro non autorisé pour l'accès administrateur")
      }

      // Create admin session
      const adminUser = {
        id: user.uid,
        email: "admin@windevexpert.com",
        name: "Administrateur",
        role: "admin" as const,
        phone: phoneNumber,
      }

      login(adminUser)
      router.push("/admin/dashboard")
    } catch (err: any) {
      console.error("[v0] Code verification error:", err)
      setError(err.message || "Code de vérification incorrect")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div id="recaptcha-container"></div>

      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-4">
          <Shield className="w-8 h-8 text-cyan-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Accès Administrateur Sécurisé</h1>
        <p className="text-slate-400 text-sm">Authentification par SMS requise</p>
      </div>

      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">
            {step === "phone" ? "Vérification du numéro" : "Code de vérification"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {step === "phone"
              ? "Entrez votre numéro de téléphone pour recevoir un code de vérification"
              : "Entrez le code à 6 chiffres envoyé par SMS"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-500/10 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "phone" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">
                  Numéro de téléphone
                </Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+213 555 123 456"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400">Format international requis (ex: +213...)</p>
              </div>

              <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer le code SMS"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-slate-200">
                  Code de vérification
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-widest bg-slate-900/50 border-slate-600 text-white"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-slate-400 text-center">Code envoyé au {phoneNumber}</p>
              </div>

              <div className="space-y-2">
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={loading}>
                  {loading ? "Vérification..." : "Vérifier le code"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white"
                  onClick={() => {
                    setStep("phone")
                    setVerificationCode("")
                    setError("")
                  }}
                >
                  Modifier le numéro
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-slate-400 space-y-1">
                <p className="font-medium text-slate-300">Sécurité renforcée</p>
                <p>Cette page est protégée par une authentification à deux facteurs via SMS.</p>
                <p>Seuls les numéros autorisés peuvent accéder à l'administration.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-xs text-slate-500 text-center max-w-md">
        Cette page d'accès est confidentielle. Ne partagez jamais ce lien avec des tiers.
      </p>
    </div>
  )
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
  }
}
