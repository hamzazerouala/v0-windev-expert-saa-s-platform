import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Eye } from "lucide-react"

export default function MemberOrdersPage() {
  const orders = [
    {
      id: "CMD-2024-001",
      date: "15 Mars 2024",
      items: [{ name: "Template E-commerce WinDev", quantity: 1, price: 15000 }],
      total: 15000,
      currency: "DZD",
      status: "Livré",
      paymentMethod: "Stripe",
    },
    {
      id: "CMD-2024-002",
      date: "10 Mars 2024",
      items: [
        { name: "Composants UI WebDev", quantity: 1, price: 8000 },
        { name: "Formation WinDev Avancé", quantity: 1, price: 25000 },
      ],
      total: 33000,
      currency: "DZD",
      status: "En cours",
      paymentMethod: "Chargily",
    },
    {
      id: "CMD-2024-003",
      date: "5 Mars 2024",
      items: [{ name: "Abonnement VIP Annuel", quantity: 1, price: 50000 }],
      total: 50000,
      currency: "DZD",
      status: "Livré",
      paymentMethod: "Virement bancaire",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Livré":
        return "default"
      case "En cours":
        return "secondary"
      case "Annulé":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mes commandes</h1>
        <p className="text-muted-foreground">Consultez l&apos;historique de vos commandes</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    Commande {order.id}
                  </CardTitle>
                  <CardDescription>Passée le {order.date}</CardDescription>
                </div>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">×{item.quantity}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">
                      {item.price.toLocaleString()} {order.currency}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="text-sm text-muted-foreground">Paiement : {order.paymentMethod}</div>
                <div className="text-lg font-bold">
                  Total : {order.total.toLocaleString()} {order.currency}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir les détails
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Facture
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
