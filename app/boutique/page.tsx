"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { useState } from "react"
import Link from "next/link"
import { getProducts } from "@/app/actions/products"

export default async function BoutiquePage() {
  const result = await getProducts()
  const allProducts = result.success ? result.products : []

  const products = {
    services: allProducts.filter((p: any) => p.categories?.slug === "services"),
    software: allProducts.filter((p: any) => p.categories?.slug === "logiciels"),
    components: allProducts.filter((p: any) => p.categories?.slug === "composants"),
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Boutique en ligne
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Découvrez nos logiciels, composants et services pour accélérer vos projets de développement.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container py-20">
        <ProductsClient products={products} allProducts={allProducts} />
      </section>

      {/* Info Section */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Livraison instantanée</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Accès immédiat à vos achats après paiement
              </p>
            </div>
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transactions protégées par Stripe et PayPal
              </p>
            </div>
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Support inclus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Assistance technique pour tous vos achats</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductsClient({
  products,
  allProducts,
}: {
  products: any
  allProducts: any[]
}) {
  const addItem = useCartStore((state) => state.addItem)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price_cents / 100,
      category: product.categories?.name || "Produit",
      image: product.image_url,
    })
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  const ProductCard = ({ product }: { product: any }) => {
    const isAdded = addedItems.has(product.id)

    return (
      <Card className="flex flex-col">
        {product.image_url && (
          <Link href={`/boutique/${product.id}`}>
            <div className="relative h-48 w-full overflow-hidden bg-muted cursor-pointer">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <Link href={`/boutique/${product.id}`} className="hover:underline">
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            </Link>
            <Badge variant="secondary">{product.categories?.name || "Produit"}</Badge>
          </div>
          <CardDescription className="line-clamp-2 leading-relaxed">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-3xl font-bold">{((product.price_cents || 0) / 100).toFixed(2)}€</div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button className="flex-1" onClick={() => handleAddToCart(product)} disabled={isAdded}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? "Ajouté !" : "Ajouter au panier"}
          </Button>
          <Link href={`/boutique/${product.id}`}>
            <Button variant="outline">Détails</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
        <TabsTrigger value="all">Tout</TabsTrigger>
        <TabsTrigger value="software">Logiciels</TabsTrigger>
        <TabsTrigger value="components">Composants</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="software" className="mt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.software.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="components" className="mt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.components.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="services" className="mt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.services.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
