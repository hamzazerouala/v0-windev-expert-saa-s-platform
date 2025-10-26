import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Download, Package } from "lucide-react"
import Link from "next/link"

export default function AdminProductsPage() {
  // Mock data - in production this would come from a database
  const products = [
    {
      id: 1,
      name: "GestStock Pro",
      type: "Logiciel",
      category: "Gestion",
      price: 499,
      pricingModel: "Unique",
      stock: "Illimité",
      status: "Actif",
      sales: 34,
      downloads: 102,
      version: "2.1.0",
      fileSize: "45 MB",
    },
    {
      id: 2,
      name: "Pack Composants UI",
      type: "Composant",
      category: "Interface",
      price: 149,
      pricingModel: "Unique",
      stock: "Illimité",
      status: "Actif",
      sales: 89,
      downloads: 267,
      version: "1.5.2",
      fileSize: "12 MB",
    },
    {
      id: 3,
      name: "Template E-commerce",
      type: "Template",
      category: "Web",
      price: 199,
      pricingModel: "Unique",
      stock: "Illimité",
      status: "Actif",
      sales: 56,
      downloads: 168,
      version: "3.0.1",
      fileSize: "28 MB",
    },
    {
      id: 4,
      name: "Plugin SEO Advanced",
      type: "Plugin",
      category: "Marketing",
      price: 79,
      pricingModel: "Abonnement",
      stock: "Illimité",
      status: "Actif",
      sales: 123,
      downloads: 369,
      version: "1.2.0",
      fileSize: "5 MB",
    },
    {
      id: 5,
      name: "Consulting - 5 heures",
      type: "Service",
      category: "Consulting",
      price: 750,
      pricingModel: "Unique",
      stock: "Limité",
      status: "Actif",
      sales: 12,
      downloads: 0,
      version: "-",
      fileSize: "-",
    },
    {
      id: 6,
      name: "Maintenance Mensuelle",
      type: "Service",
      category: "Support",
      price: 299,
      pricingModel: "Abonnement",
      stock: "Limité",
      status: "Actif",
      sales: 45,
      downloads: 0,
      version: "-",
      fileSize: "-",
    },
    {
      id: 7,
      name: "Module de paiement",
      type: "Composant",
      category: "E-commerce",
      price: 199,
      pricingModel: "Unique",
      stock: "Illimité",
      status: "Brouillon",
      sales: 0,
      downloads: 0,
      version: "1.0.0",
      fileSize: "8 MB",
    },
  ]

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "Actif").length,
    digital: products.filter((p) => p.type !== "Service").length,
    services: products.filter((p) => p.type === "Service").length,
    totalSales: products.reduce((acc, p) => acc + p.sales, 0),
    totalDownloads: products.reduce((acc, p) => acc + p.downloads, 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Produits & Services</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de produits digitaux et services</p>
        </div>
        <Button asChild>
          <Link href="/admin/produits/nouveau">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active} actifs, {stats.total - stats.active} inactifs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produits digitaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.digital}</div>
            <p className="text-xs text-muted-foreground">{stats.totalDownloads} téléchargements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.services}</div>
            <p className="text-xs text-muted-foreground">Consulting & Support</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">Tous les produits</p>
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
            <div className="flex items-center gap-4">
              <Select defaultValue="tous">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  <SelectItem value="logiciel">Logiciels</SelectItem>
                  <SelectItem value="composant">Composants</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="plugin">Plugins</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-9" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Modèle</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{product.price}€</TableCell>
                  <TableCell>
                    <Badge variant={product.pricingModel === "Abonnement" ? "default" : "secondary"}>
                      {product.pricingModel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.sales}</span>
                      {product.downloads > 0 && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {product.downloads}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.version}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "Actif" ? "default" : "secondary"}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/produits/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        {product.type !== "Service" && (
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger le fichier
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
