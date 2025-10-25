"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { authenticateUser, DEV_ACCOUNTS } from "@/lib/auth/mock-auth"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = authenticateUser(email, password)

    if (user) {
      login(user)
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/membre/dashboard")
      }
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 bg-cyan-50 border-cyan-200">
                <AlertCircle className="h-4 w-4 text-cyan-600" />
                <AlertDescription className="text-sm text-cyan-900">
                  <strong>Comptes de test :</strong>
                  <div className="mt-2 space-y-1 text-xs">
                    <div>
                      <strong>Client :</strong> {DEV_ACCOUNTS.client.email} / {DEV_ACCOUNTS.client.password}
                    </div>
                    <div>
                      <strong>Admin :</strong> {DEV_ACCOUNTS.admin.email} / {DEV_ACCOUNTS.admin.password}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Pas encore de compte ? </span>
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  S&apos;inscrire
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
