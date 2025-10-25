"use server"

import { stripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"

export async function startCheckoutSession(productIds: string[]) {
  // Validate all products exist
  const lineItems = productIds
    .map((id) => {
      const product = getProductById(id)
      if (!product) {
        console.error(`Product with id "${id}" not found`)
        return null
      }
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (lineItems.length === 0) {
    throw new Error("No valid products found")
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total,
  }
}
