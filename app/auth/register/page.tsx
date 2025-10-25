import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
              <CardDescription>Remplissez le formulaire pour créer votre compte WindevExpert</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Jean" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Dupont" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nom@exemple.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" required />
                  <p className="text-xs text-muted-foreground">
                    Minimum 8 caractères avec majuscules, minuscules et chiffres
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    J&apos;accepte les{" "}
                    <Link href="/cgu" className="text-primary hover:underline">
                      conditions générales d&apos;utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/confidentialite" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Créer mon compte
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Déjà un compte ? </span>
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Se connecter
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
