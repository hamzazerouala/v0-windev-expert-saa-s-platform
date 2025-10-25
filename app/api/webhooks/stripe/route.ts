import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      // TODO: Fulfill the purchase
      // - Create order record in database
      // - Send confirmation email
      // - Grant access to purchased products/services
      // - Update user's purchase history

      console.log("[v0] Payment successful:", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      })
      break

    case "payment_intent.payment_failed":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error("[v0] Payment failed:", paymentIntent.id)
      break

    default:
      console.log(`[v0] Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
