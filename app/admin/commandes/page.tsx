import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye } from "lucide-react"

export default function AdminOrdersPage() {
  // Mock data - in production this would come from a database
  const orders = [
    {
      id: "WE-ABC123",
      customer: "Jean Dupont",
      date: "15 Mars 2024",
      total: 448,
      status: "Complété",
      items: 2,
    },
    {
      id: "WE-DEF456",
      customer: "Marie Martin",
      date: "14 Mars 2024",
      total: 279,
      status: "Complété",
      items: 1,
    },
    {
      id: "WE-GHI789",
      customer: "Pierre Dubois",
      date: "13 Mars 2024",
      total: 750,
      status: "En attente",
      items: 1,
    },
    {
      id: "WE-JKL012",
      customer: "Sophie Bernard",
      date: "12 Mars 2024",
      total: 199,
      status: "Complété",
      items: 1,
    },
    {
      id: "WE-MNO345",
      customer: "Luc Petit",
      date: "11 Mars 2024",
      total: 399,
      status: "Remboursé",
      items: 1,
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Complété":
        return "default"
      case "En attente":
        return "secondary"
      case "Remboursé":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commandes</h1>
          <p className="text-muted-foreground">Gérez les commandes et paiements</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 075€</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">415€</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des commandes</CardTitle>
              <CardDescription>{orders.length} commandes récentes</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">{order.total}€</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
