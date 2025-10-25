# Stripe Integration Setup

## Overview
The WindevExpert platform uses Stripe for secure payment processing. This document outlines the integration setup and configuration.

## Environment Variables
The following environment variables are required and already configured:
- `STRIPE_SECRET_KEY` - Server-side Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Public Stripe key for server
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Public Stripe key for client
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (needs to be added)

## Product Catalog
All products are defined in `lib/products.ts` as the single source of truth. Product prices are stored in cents (e.g., 149€ = 14900 cents) to avoid floating-point issues.

## Payment Flow
1. User adds products to cart
2. User navigates to checkout page
3. Stripe Embedded Checkout loads with cart items
4. User completes payment through Stripe
5. User is redirected to return page with session ID
6. System verifies payment status and clears cart
7. Webhook receives confirmation and fulfills order

## Webhook Setup
To receive payment confirmations, configure a webhook in your Stripe dashboard:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` env var

## Testing
Use Stripe test cards for testing:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

## Security Features
- Server-side price validation (prices never sent from client)
- Product lookup from secure server-side array
- Webhook signature verification
- No client-side price manipulation possible

## Next Steps
1. Add `STRIPE_WEBHOOK_SECRET` environment variable
2. Implement order fulfillment logic in webhook handler
3. Create database tables for orders and purchases
4. Send confirmation emails after successful payment
5. Grant access to purchased digital products
