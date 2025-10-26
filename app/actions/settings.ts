"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getAllSettings() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("site_settings").select("*")

    if (error) throw error

    // Convert array to object for easier access
    const settings: Record<string, any> = {}
    data?.forEach((setting) => {
      settings[setting.key] = setting.value
    })

    return { success: true, data: settings }
  } catch (error) {
    console.error("[v0] Error fetching all settings:", error)
    return { success: false, error: "Failed to fetch settings", data: {} }
  }
}

export async function saveSettings(settings: Record<string, any>) {
  try {
    const supabase = createAdminClient()

    // Prepare upsert data
    const upsertData = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase.from("site_settings").upsert(upsertData, {
      onConflict: "key",
    })

    if (error) throw error

    revalidatePath("/admin/parametres")

    return { success: true, message: "Paramètres enregistrés avec succès" }
  } catch (error) {
    console.error("[v0] Error saving settings:", error)
    return { success: false, error: "Échec de l'enregistrement des paramètres" }
  }
}

export async function getSiteSettings() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("site_settings").select("*")

    if (error) throw error

    // Convert array to object for easier access
    const settings: Record<string, any> = {}
    data?.forEach((setting) => {
      settings[setting.key] = setting.value
    })

    return { success: true, data: settings }
  } catch (error) {
    console.error("[v0] Error fetching site settings:", error)
    return { success: false, error: "Failed to fetch site settings" }
  }
}

export async function updateSiteSetting(key: string, value: any) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("site_settings")
      .upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        },
      )
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/parametres")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error updating site setting:", error)
    return { success: false, error: "Failed to update site setting" }
  }
}

export async function getShippingMethods() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("shipping_methods").select("*").order("name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching shipping methods:", error)
    return { success: false, error: "Failed to fetch shipping methods" }
  }
}

export async function getPaymentMethods() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("payment_methods_config").select("*").order("method_name")

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error fetching payment methods:", error)
    return { success: false, error: "Failed to fetch payment methods" }
  }
}

export async function getGeminiApiKey() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("site_settings").select("value").eq("key", "gemini_api_key").single()

    if (error && error.code !== "PGRST116") throw error

    return { success: true, data: data?.value || null }
  } catch (error) {
    console.error("[v0] Error fetching Gemini API key:", error)
    return { success: false, error: "Failed to fetch Gemini API key" }
  }
}

export async function saveGeminiApiKey(apiKey: string) {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: "gemini_api_key",
          value: apiKey,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        },
      )
      .select()
      .single()

    if (error) throw error

    revalidatePath("/admin/parametres")
    revalidatePath("/admin/blog")

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error saving Gemini API key:", error)
    return { success: false, error: "Échec de l'enregistrement des paramètres" }
  }
}

export async function getSMTP2GOConfig() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["smtp2go_api_key", "smtp2go_sender_email"])

    if (error) throw error

    const config: Record<string, string> = {}
    data?.forEach((setting) => {
      config[setting.key] = setting.value
    })

    if (!config.smtp2go_api_key) {
      return { success: false, error: "SMTP2GO API key not configured" }
    }

    return {
      success: true,
      data: {
        apiKey: config.smtp2go_api_key,
        senderEmail: config.smtp2go_sender_email || "noreply@windevexpert.com",
      },
    }
  } catch (error) {
    console.error("[v0] Error fetching SMTP2GO config:", error)
    return { success: false, error: "Failed to fetch SMTP2GO configuration" }
  }
}

export async function saveSMTP2GOConfig(apiKey: string, senderEmail: string) {
  try {
    const supabase = createAdminClient()

    const upsertData = [
      {
        key: "smtp2go_api_key",
        value: apiKey,
        updated_at: new Date().toISOString(),
      },
      {
        key: "smtp2go_sender_email",
        value: senderEmail,
        updated_at: new Date().toISOString(),
      },
    ]

    const { error } = await supabase.from("site_settings").upsert(upsertData, {
      onConflict: "key",
    })

    if (error) throw error

    revalidatePath("/admin/parametres")

    return { success: true, message: "Configuration SMTP2GO enregistrée" }
  } catch (error) {
    console.error("[v0] Error saving SMTP2GO config:", error)
    return { success: false, error: "Échec de l'enregistrement de la configuration SMTP2GO" }
  }
}
