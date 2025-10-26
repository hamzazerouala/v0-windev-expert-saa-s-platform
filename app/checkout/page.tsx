"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store/cart-store"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const StripeCheckout = dynamic(() => import("@/components/stripe-checkout"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    router.push("/panier")
    return null
  }

  const totalHT = getTotalPrice()
  const tva = totalHT * 0.2
  const totalTTC = totalHT + tva

  const productIds = items.map((item) => item.id)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container py-12">
          <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Stripe Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Paiement sécurisé</CardTitle>
                  <CardDescription>Complétez votre paiement via Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    }
                  >
                    <StripeCheckout productIds={productIds} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Votre commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total HT</span>
                      <span className="font-medium">{totalHT.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span className="font-medium">{tva.toFixed(2)}€</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total TTC</span>
                    <span className="text-2xl font-bold">{totalTTC.toFixed(2)}€</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
