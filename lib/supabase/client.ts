import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

let configCache: { url: string; anonKey: string } | null = null

async function getSupabaseConfig() {
  if (configCache) {
    return configCache
  }

  try {
    const response = await fetch("/api/config/supabase")
    if (!response.ok) {
      throw new Error("Failed to fetch Supabase config")
    }
    const config = await response.json()
    configCache = config
    return config
  } catch (error) {
    console.error("[v0] Error fetching Supabase config:", error)
    throw new Error("Supabase configuration not available")
  }
}

export async function createClient() {
  const { url, anonKey } = await getSupabaseConfig()

  if (!url || !anonKey) {
    throw new Error("Supabase URL and Anon Key are required")
  }

  return createSupabaseBrowserClient(url, anonKey)
}

export const createBrowserClient = createClient
