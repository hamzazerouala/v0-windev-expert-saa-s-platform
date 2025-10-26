import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase configuration not found" }, { status: 500 })
    }

    // The anon key is safe to expose - it's designed to be public
    // and is protected by Row Level Security (RLS) policies
    return NextResponse.json({
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    })
  } catch (error) {
    console.error("[v0] Error fetching Supabase config:", error)
    return NextResponse.json({ error: "Failed to fetch Supabase configuration" }, { status: 500 })
  }
}
