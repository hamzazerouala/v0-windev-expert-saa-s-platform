import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MoreHorizontal } from "lucide-react"

export default function AdminProductsPage() {
  // Mock data - in production this would come from a database
  const products = [
    {
      id: 1,
      name: "WinDev - Débutant à Expert",
      category: "Formation",
      price: 299,
      stock: "Illimité",
      status: "Actif",
      sales: 245,
    },
    {
      id: 2,
      name: "Pack Composants UI",
      category: "Composant",
      price: 149,
      stock: "Illimité",
      status: "Actif",
      sales: 89,
    },
    {
      id: 3,
      name: "GestStock Pro",
      category: "Logiciel",
      price: 499,
      stock: "Illimité",
      status: "Actif",
      sales: 34,
    },
    {
      id: 4,
      name: "Consulting - 5 heures",
      category: "Service",
      price: 750,
      stock: "Limité",
      status: "Actif",
      sales: 12,
    },
    {
      id: 5,
      name: "Module de paiement",
      category: "Composant",
      price: 199,
      stock: "Illimité",
      status: "Brouillon",
      sales: 0,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Produits</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de produits et services</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Dans le catalogue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produits actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.status === "Actif").length}</div>
            <p className="text-xs text-muted-foreground">En vente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.reduce((acc, p) => acc + p.sales, 0)}</div>
            <p className="text-xs text-muted-foreground">Tous les produits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenu moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length)}€
            </div>
            <p className="text-xs text-muted-foreground">Par produit</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Catalogue de produits</CardTitle>
              <CardDescription>{products.length} produits au total</CardDescription>
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
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{product.price}€</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "Actif" ? "default" : "secondary"}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
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
