"use server"

import { createAdminClient } from "@/utils/supabase-admin-client"

export async function getProducts() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(`${supabaseUrl}/rest/v1/products?is_active=eq.true&select=*,categories(name,slug)`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch products:", await response.text())
      return { success: false, error: "Failed to fetch products" }
    }

    const products = await response.json()
    return { success: true, products }
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return { success: false, error: "Error fetching products" }
  }
}

export async function getProductById(id: string) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}&select=*,categories(name,slug)`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      return { success: false, error: "Failed to fetch product" }
    }

    const products = await response.json()
    if (products.length === 0) {
      return { success: false, error: "Product not found" }
    }

    return { success: true, product: products[0] }
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return { success: false, error: "Error fetching product" }
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/products?is_active=eq.true&select=*,categories!inner(name,slug)&categories.slug=eq.${categorySlug}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    )

    if (!response.ok) {
      return { success: false, error: "Failed to fetch products" }
    }

    const products = await response.json()
    return { success: true, products }
  } catch (error) {
    console.error("[v0] Error fetching products by category:", error)
    return { success: false, error: "Error fetching products" }
  }
}

export async function createProduct(data: {
  name: string
  slug: string
  description: string
  image_url?: string
  price_cents: number
  stock_quantity?: number
  is_active: boolean
  category_id?: string
}) {
  try {
    console.log("[v0] Creating product with data:", data)

    const supabase = createAdminClient()

    const { data: product, error } = await supabase.from("products").insert([data]).select().single()

    if (error) {
      console.error("[v0] Error creating product:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Product created successfully:", product)
    return { success: true, product }
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return { success: false, error: "Error creating product" }
  }
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string
    slug: string
    description: string
    image_url: string
    price_cents: number
    stock_quantity: number
    is_active: boolean
    category_id: string
  }>,
) {
  try {
    console.log("[v0] Updating product:", id, data)

    const supabase = createAdminClient()

    const { data: product, error } = await supabase.from("products").update(data).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Error updating product:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Product updated successfully:", product)
    return { success: true, product }
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return { success: false, error: "Error updating product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    console.log("[v0] Deleting product:", id)

    const supabase = createAdminClient()

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting product:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Product deleted successfully")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return { success: false, error: "Error deleting product" }
  }
}

export async function getCategories() {
  try {
    const supabase = createAdminClient()

    const { data: categories, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("[v0] Error fetching categories:", error)
      return { success: false, error: error.message }
    }

    return { success: true, categories }
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return { success: false, error: "Error fetching categories" }
  }
}

export async function createCategory(data: {
  name: string
  slug: string
  description?: string
  image_url?: string
}) {
  try {
    const supabase = createAdminClient()

    const { data: category, error } = await supabase.from("categories").insert([data]).select().single()

    if (error) {
      console.error("[v0] Error creating category:", error)
      return { success: false, error: error.message }
    }

    return { success: true, category }
  } catch (error) {
    console.error("[v0] Error creating category:", error)
    return { success: false, error: "Error creating category" }
  }
}
