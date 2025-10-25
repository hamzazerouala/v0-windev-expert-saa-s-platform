export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: string
  image?: string
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  // Services
  {
    id: "audit-code-complet",
    name: "Audit de code complet",
    description: "Analyse approfondie de votre code avec rapport détaillé et recommandations.",
    priceInCents: 150000, // 1500€
    category: "Service",
  },
  {
    id: "consulting-5h",
    name: "Consulting - 5 heures",
    description: "Pack de 5 heures de consulting technique avec un expert.",
    priceInCents: 75000, // 750€
    category: "Service",
  },
  // Software
  {
    id: "geststock-pro",
    name: "GestStock Pro",
    description: "Logiciel de gestion de stock complet avec suivi en temps réel.",
    priceInCents: 49900, // 499€
    category: "Logiciel",
    image: "/inventory-management-software.jpg",
  },
  {
    id: "facturexpert",
    name: "FacturExpert",
    description: "Solution de facturation complète conforme aux normes françaises.",
    priceInCents: 39900, // 399€
    category: "Logiciel",
    image: "/invoicing-software.jpg",
  },
  // Components
  {
    id: "pack-composants-ui",
    name: "Pack Composants UI",
    description: "Collection de 50+ composants UI réutilisables pour WinDev.",
    priceInCents: 14900, // 149€
    category: "Composant",
    image: "/ui-components-library.png",
  },
  {
    id: "module-paiement",
    name: "Module de paiement",
    description: "Intégration complète Stripe et PayPal pour vos applications.",
    priceInCents: 19900, // 199€
    category: "Composant",
    image: "/payment-integration-module.jpg",
  },
]

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

// Helper function to format price
export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2) + "€"
}
