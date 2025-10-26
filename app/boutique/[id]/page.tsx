"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Check, Star } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// Mock product data - in production this would come from a database
const products = [
  {
    id: "1",
    name: "Audit de code complet",
    description:
      "Analyse approfondie de votre code source avec rapport détaillé et recommandations. Notre équipe d'experts examine votre code pour identifier les problèmes de performance, sécurité, maintenabilité et conformité aux bonnes pratiques.",
    price: 1500,
    category: "Service",
    image: "/code-audit-service.jpg",
    features: [
      "Analyse statique du code",
      "Revue de sécurité",
      "Rapport détaillé avec recommandations",
      "Session de présentation des résultats",
      "Plan d'action priorisé",
    ],
  },
  {
    id: "2",
    name: "Consulting - 5 heures",
    description:
      "Pack de 5 heures de consulting technique avec un expert WindevExpert. Idéal pour résoudre des problèmes spécifiques, obtenir des conseils d'architecture ou former votre équipe.",
    price: 750,
    category: "Service",
    image: "/consulting-service.jpg",
    features: [
      "5 heures de consulting",
      "Expert dédié",
      "Flexibilité des horaires",
      "Support par visioconférence",
      "Documentation fournie",
    ],
  },
  {
    id: "3",
    name: "GestStock Pro",
    description:
      "Logiciel de gestion de stock complet avec suivi en temps réel. Gérez vos inventaires, commandes, fournisseurs et alertes de stock bas avec une interface intuitive.",
    price: 499,
    category: "Logiciel",
    image: "/inventory-management-software.jpg",
    features: [
      "Gestion multi-entrepôts",
      "Suivi en temps réel",
      "Alertes automatiques",
      "Rapports et statistiques",
      "Import/Export Excel",
    ],
  },
  {
    id: "4",
    name: "FacturExpert",
    description:
      "Solution de facturation complète conforme aux normes françaises. Créez, envoyez et suivez vos factures facilement avec gestion des devis, avoirs et relances.",
    price: 399,
    category: "Logiciel",
    image: "/invoicing-software.jpg",
    features: [
      "Conforme aux normes françaises",
      "Devis et factures",
      "Gestion des clients",
      "Relances automatiques",
      "Export comptable",
    ],
  },
  {
    id: "5",
    name: "Pack Composants UI",
    description:
      "Collection de 50+ composants UI réutilisables pour WinDev. Accélérez votre développement avec des composants prêts à l'emploi, personnalisables et documentés.",
    price: 149,
    category: "Composant",
    image: "/ui-components-library.png",
    features: [
      "50+ composants",
      "Code source inclus",
      "Documentation complète",
      "Exemples d'utilisation",
      "Mises à jour gratuites",
    ],
  },
  {
    id: "6",
    name: "Module de paiement",
    description:
      "Intégration complète Stripe et PayPal pour vos applications. Module prêt à l'emploi avec gestion des paiements, remboursements et webhooks.",
    price: 199,
    category: "Composant",
    image: "/payment-integration-module.jpg",
    features: [
      "Stripe et PayPal",
      "Paiements sécurisés",
      "Gestion des webhooks",
      "Interface d'administration",
      "Support technique inclus",
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <Button onClick={() => router.push("/boutique")}>Retour à la boutique</Button>
          </div>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8/5 - 127 avis)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Caractéristiques principales :</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold">{product.price}€</span>
                  <span className="text-muted-foreground">TTC</span>
                </div>

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
