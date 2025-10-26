// This uses the existing SUPABASE_URL and SUPABASE_ANON_KEY environment variables
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "",
}

// Validate that we have the required config
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  console.error("[v0] Missing Supabase configuration. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.")
}
