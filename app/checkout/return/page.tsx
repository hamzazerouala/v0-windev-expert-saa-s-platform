"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { getCheckoutSession } from "@/app/actions/stripe"
import { useCartStore } from "@/lib/store/cart-store"
import Link from "next/link"

function ReturnContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const clearCart = useCartStore((state) => state.clearCart)
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [sessionData, setSessionData] = useState<any>(null)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      setStatus("error")
      return
    }

    getCheckoutSession(sessionId)
      .then((data) => {
        setSessionData(data)
        if (data.status === "complete") {
          setStatus("success")
          clearCart()
        } else {
          setStatus("error")
        }
      })
      .catch(() => {
        setStatus("error")
      })
  }, [searchParams, clearCart])

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Vérification de votre paiement...</p>
        </div>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Paiement réussi !</CardTitle>
            <CardDescription>Votre commande a été confirmée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessionData?.customerEmail && (
              <p className="text-sm text-muted-foreground text-center">
                Un email de confirmation a été envoyé à <strong>{sessionData.customerEmail}</strong>
              </p>
            )}
            {sessionData?.amountTotal && (
              <p className="text-center text-lg font-semibold">
                Montant payé : {(sessionData.amountTotal / 100).toFixed(2)}€
              </p>
            )}
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/membre/achats" className="w-full">
                <Button className="w-full">Voir mes achats</Button>
              </Link>
              <Link href="/boutique" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Retour à la boutique
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Erreur de paiement</CardTitle>
          <CardDescription>Une erreur est survenue lors du traitement de votre paiement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Veuillez réessayer ou contacter notre support si le problème persiste.
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/panier" className="w-full">
              <Button className="w-full">Retour au panier</Button>
            </Link>
            <Link href="/contact" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Contacter le support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutReturnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12">
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            }
          >
            <ReturnContent />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
