import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-2xl py-20">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Commande confirmée !</CardTitle>
              <CardDescription>Merci pour votre achat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Numéro de commande</p>
                <p className="text-2xl font-bold">#WE-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>

              <div className="space-y-3 text-sm">
                <p className="leading-relaxed">
                  Votre commande a été traitée avec succès. Vous recevrez un email de confirmation avec les détails de
                  votre achat et les instructions d&apos;accès à vos produits.
                </p>
                <p className="leading-relaxed">
                  Pour les formations, vous pouvez dès maintenant accéder à votre espace membre pour commencer votre
                  apprentissage.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/membre/dashboard" className="flex-1">
                  <Button className="w-full">Accéder à mon espace</Button>
                </Link>
                <Link href="/boutique" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continuer mes achats
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
