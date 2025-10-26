"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Crown } from "lucide-react"
import Link from "next/link"

export default function VIPSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/parametres">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-purple-600" />
              <h1 className="text-3xl font-bold">Abonnement VIP</h1>
            </div>
            <p className="text-muted-foreground mt-1">Configurez les tarifs de l'abonnement VIP toutes formations</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            <CardTitle>Qu'est-ce que l'abonnement VIP ?</CardTitle>
          </div>
          <CardDescription>
            L'abonnement VIP donne un accès illimité à TOUTES les formations de la plateforme avec un seul paiement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg border-2 border-purple-200">
              <h3 className="font-semibold mb-2">Abonnement Annuel</h3>
              <p className="text-sm text-muted-foreground">Accès à toutes les formations pendant 1 an</p>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-pink-200">
              <h3 className="font-semibold mb-2">Accès à Vie</h3>
              <p className="text-sm text-muted-foreground">Accès permanent à toutes les formations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algeria Pricing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Algérie</CardTitle>
              <CardDescription>Tarifs en DZD - Paiement Chargily et hors ligne</CardDescription>
            </div>
            <Badge>DZD</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Abonnement annuel VIP</Label>
              <Input type="number" placeholder="0" defaultValue="50000" />
            </div>
            <div className="space-y-2">
              <Label>Accès à vie VIP</Label>
              <Input type="number" placeholder="0" defaultValue="150000" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Africa Pricing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Afrique</CardTitle>
              <CardDescription>Tarifs en USD - Paiement Stripe</CardDescription>
            </div>
            <Badge>USD</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Abonnement annuel VIP</Label>
              <Input type="number" placeholder="0" defaultValue="299" />
            </div>
            <div className="space-y-2">
              <Label>Accès à vie VIP</Label>
              <Input type="number" placeholder="0" defaultValue="999" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Europe Pricing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Europe</CardTitle>
              <CardDescription>Tarifs en EUR - Paiement Stripe</CardDescription>
            </div>
            <Badge>EUR</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Abonnement annuel VIP</Label>
              <Input type="number" placeholder="0" defaultValue="349" />
            </div>
            <div className="space-y-2">
              <Label>Accès à vie VIP</Label>
              <Input type="number" placeholder="0" defaultValue="1199" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rest of World Pricing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reste du monde</CardTitle>
              <CardDescription>Tarifs en USD - Paiement Stripe</CardDescription>
            </div>
            <Badge>USD</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Abonnement annuel VIP</Label>
              <Input type="number" placeholder="0" defaultValue="399" />
            </div>
            <div className="space-y-2">
              <Label>Accès à vie VIP</Label>
              <Input type="number" placeholder="0" defaultValue="1299" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
