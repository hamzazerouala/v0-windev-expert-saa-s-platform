import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getProductById } from "@/app/actions/products"
import { notFound } from "next/navigation"
import AddToCartButton from "./add-to-cart-button"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const result = await getProductById(params.id)

  if (!result.success || !result.product) {
    notFound()
  }

  const product = result.product

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image_url || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                {product.categories && <Badge className="mb-2">{product.categories.name}</Badge>}
                <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(5.0/5)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold">{((product.price_cents || 0) / 100).toFixed(2)}€</span>
                  <span className="text-muted-foreground">TTC</span>
                </div>

                <AddToCartButton product={product} />

                <p className="text-sm text-muted-foreground mt-4">
                  Livraison instantanée • Paiement sécurisé • Support inclus
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
