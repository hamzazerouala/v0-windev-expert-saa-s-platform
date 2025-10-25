import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export default function MemberPurchasesPage() {
  // Mock data - in production this would come from a database
  const purchases = [
    {
      id: "WE-ABC123",
      date: "15 Mars 2024",
      items: [
        { name: "WinDev - Débutant à Expert", category: "Formation", price: 299 },
        { name: "Pack Composants UI", category: "Composant", price: 149 },
      ],
      total: 448,
      status: "Complété",
    },
    {
      id: "WE-DEF456",
      date: "10 Mars 2024",
      items: [{ name: "WebDev - Développement Web Moderne", category: "Formation", price: 279 }],
      total: 279,
      status: "Complété",
    },
    {
      id: "WE-GHI789",
      date: "5 Mars 2024",
      items: [
        { name: "Base de données avec HyperFileSQL", category: "Formation", price: 199 },
        { name: "Module de paiement", category: "Composant", price: 199 },
      ],
      total: 398,
      status: "Complété",
    },
    {
      id: "WE-JKL012",
      date: "1 Mars 2024",
      items: [{ name: "Consulting - 5 heures", category: "Service", price: 750 }],
      total: 750,
      status: "Complété",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mes achats</h1>
        <p className="text-muted-foreground">Historique de vos commandes et achats</p>
      </div>

      <div className="space-y-4">
        {purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Commande {purchase.id}</CardTitle>
                  <CardDescription>{purchase.date}</CardDescription>
                </div>
                <Badge variant="secondary">{purchase.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {purchase.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-muted-foreground">{item.category}</div>
                    </div>
                    <div className="font-medium">{item.price}€</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="font-semibold">Total TTC</div>
                <div className="text-xl font-bold">{purchase.total}€</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir les détails
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger la facture
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
