"use server"

export async function getFormations() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/formations?is_published=eq.true&select=*,formation_categories(name,slug)`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    )

    if (!response.ok) {
      console.error("[v0] Failed to fetch formations:", await response.text())
      return { success: false, error: "Failed to fetch formations" }
    }

    const formations = await response.json()
    return { success: true, formations }
  } catch (error) {
    console.error("[v0] Error fetching formations:", error)
    return { success: false, error: "Error fetching formations" }
  }
}

export async function getFormationById(id: string) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/formations?id=eq.${id}&select=*,formation_categories(name,slug),lessons(*)`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    )

    if (!response.ok) {
      return { success: false, error: "Failed to fetch formation" }
    }

    const formations = await response.json()
    if (formations.length === 0) {
      return { success: false, error: "Formation not found" }
    }

    return { success: true, formation: formations[0] }
  } catch (error) {
    console.error("[v0] Error fetching formation:", error)
    return { success: false, error: "Error fetching formation" }
  }
}

export async function getUserEnrollments(userId: string) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const response = await fetch(`${supabaseUrl}/rest/v1/enrollments?user_id=eq.${userId}&select=*,formations(*)`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      return { success: false, error: "Failed to fetch enrollments" }
    }

    const enrollments = await response.json()
    return { success: true, enrollments }
  } catch (error) {
    console.error("[v0] Error fetching enrollments:", error)
    return { success: false, error: "Error fetching enrollments" }
  }
}
