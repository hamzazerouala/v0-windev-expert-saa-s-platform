"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Package, DollarSign, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProductById, updateProduct, getCategories } from "@/app/actions/products"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (params.id === "nouveau") {
      router.replace("/admin/produits/nouveau")
      return
    }

    loadProduct()
    loadCategories()
  }, [params.id])

  async function loadProduct() {
    if (params.id === "nouveau") return

    setLoading(true)
    const result = await getProductById(params.id)
    if (result.success) {
      setProduct(result.product)
    } else {
      toast({
        title: "Erreur",
        description: "Produit introuvable",
        variant: "destructive",
      })
      router.push("/admin/produits")
    }
    setLoading(false)
  }

  async function loadCategories() {
    const result = await getCategories()
    if (result.success) {
      setCategories(result.categories)
    }
  }

  async function handleSave() {
    if (!product) return

    setSaving(true)
    console.log("[v0] Saving product:", product)

    const result = await updateProduct(params.id, {
      name: product.name,
      slug: product.slug,
      description: product.description,
      image_url: product.image_url,
      price_cents: product.price_cents,
      stock_quantity: product.stock_quantity,
      is_active: product.is_active,
      category_id: product.category_id,
    })

    if (result.success) {
      toast({
        title: "Produit enregistré",
        description: "Les modifications ont été enregistrées avec succès",
      })
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible d'enregistrer le produit",
        variant: "destructive",
      })
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/produits">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Modification du produit</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Produit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.name}</div>
            <p className="text-xs text-muted-foreground">{product.is_active ? "Actif" : "Inactif"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Prix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(product.price_cents / 100).toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">Prix Europe</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.stock_quantity || "∞"}</div>
            <p className="text-xs text-muted-foreground">Disponible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{product.categories?.name || "Aucune"}</div>
            <p className="text-xs text-muted-foreground">Classification</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Détails et description du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={product.category_id || ""}
                    onValueChange={(value) => setProduct({ ...product, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={product.image_url || ""}
                  onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tarification</CardTitle>
              <CardDescription>Prix et stock du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={(product.price_cents / 100).toFixed(2)}
                    onChange={(e) =>
                      setProduct({ ...product, price_cents: Math.round(Number.parseFloat(e.target.value) * 100) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock (laisser vide pour illimité)</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={product.stock_quantity || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        stock_quantity: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                    placeholder="Illimité"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>Configuration du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={product.slug}
                  onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={product.is_active}
                  onChange={(e) => setProduct({ ...product, is_active: e.target.checked })}
                />
                <Label htmlFor="is_active" className="font-normal">
                  Produit actif (visible sur le site)
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
