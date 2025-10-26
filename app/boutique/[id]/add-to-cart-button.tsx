"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { useState } from "react"

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: (product.price_cents || 0) / 100,
      category: product.categories?.name || "Produit",
      image: product.image_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex gap-3">
      <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={added}>
        {added ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Ajouté au panier
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </>
        )}
      </Button>
    </div>
  )
}
