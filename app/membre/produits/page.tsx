import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Key } from "lucide-react"

export default function MemberProductsPage() {
  const products = [
    {
      id: 1,
      title: "Template E-commerce WinDev",
      type: "Template",
      purchaseDate: "15 Mars 2024",
      price: "15,000 DZD",
      downloads: 3,
      maxDownloads: 5,
      licenseKey: "XXXX-XXXX-XXXX-XXXX",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Composants UI WebDev",
      type: "Composants",
      purchaseDate: "10 Mars 2024",
      price: "8,000 DZD",
      downloads: 1,
      maxDownloads: 3,
      licenseKey: "YYYY-YYYY-YYYY-YYYY",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mes produits</h1>
        <p className="text-muted-foreground">Accédez à vos produits numériques achetés</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge>{product.type}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>Acheté le {product.purchaseDate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Prix payé</span>
                <span className="font-semibold">{product.price}</span>
              </div>

              <div className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Clé de licence</span>
                </div>
                <code className="block rounded bg-muted px-2 py-1 text-sm font-mono">{product.licenseKey}</code>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Téléchargements</span>
                <span>
                  {product.downloads}/{product.maxDownloads}
                </span>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
