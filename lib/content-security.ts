import crypto from "crypto"

/**
 * Generate a signed URL for protected resources
 */
export function generateSignedUrl(resourcePath: string, userId: string, expiresInHours = 24): string {
  const secret = process.env.CONTENT_PROTECTION_SECRET || "default-secret-change-in-production"
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000

  const payload = `${resourcePath}|${userId}|${expiresAt}`
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex")

  const params = new URLSearchParams({
    path: resourcePath,
    user: userId,
    expires: expiresAt.toString(),
    signature,
  })

  return `/api/protected-content?${params.toString()}`
}

/**
 * Verify a signed URL
 */
export function verifySignedUrl(resourcePath: string, userId: string, expiresAt: string, signature: string): boolean {
  const secret = process.env.CONTENT_PROTECTION_SECRET || "default-secret-change-in-production"

  // Check if expired
  if (Date.now() > Number.parseInt(expiresAt)) {
    return false
  }

  // Verify signature
  const payload = `${resourcePath}|${userId}|${expiresAt}`
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex")

  return signature === expectedSignature
}

/**
 * Generate watermark text for videos
 */
export function generateWatermark(template: string, userData: { email: string; name: string }): string {
  const now = new Date()
  return template
    .replace("{user_email}", userData.email)
    .replace("{user_name}", userData.name)
    .replace("{date}", now.toLocaleDateString())
    .replace("{time}", now.toLocaleTimeString())
}

/**
 * Track download attempts
 */
export async function trackDownload(userId: string, resourceId: string): Promise<boolean> {
  // This would connect to your database to track downloads
  // Return false if user has exceeded download limit
  // For now, just return true
  return true
}

/**
 * Check if user has exceeded device limit
 */
export async function checkDeviceLimit(userId: string, deviceId: string, maxDevices = 3): Promise<boolean> {
  // This would connect to your database to check device count
  // Return false if user has exceeded device limit
  // For now, just return true
  return true
}
