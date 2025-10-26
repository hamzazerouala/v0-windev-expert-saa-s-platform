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

/**
 * Prevent screenshot capture on videos
 */
export function preventScreenCapture() {
  if (typeof window === "undefined") return

  // Disable screenshot shortcuts
  document.addEventListener("keyup", (e) => {
    // Prevent Print Screen
    if (e.key === "PrintScreen") {
      navigator.clipboard.writeText("")
      alert("Les captures d'écran sont désactivées pour protéger le contenu")
    }
  })

  // Detect screenshot attempts (Windows + Shift + S on Windows)
  document.addEventListener("keydown", (e) => {
    if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && e.key === "s")) {
      e.preventDefault()
      alert("Les captures d'écran sont désactivées pour protéger le contenu")
      return false
    }
  })

  // Blur content when window loses focus (potential screenshot)
  document.addEventListener("visibilitychange", () => {
    const videoElements = document.querySelectorAll("video")
    videoElements.forEach((video) => {
      if (document.hidden) {
        video.style.filter = "blur(20px)"
      } else {
        video.style.filter = "none"
      }
    })
  })
}

/**
 * Add watermark overlay to video element
 */
export function addVideoWatermark(videoElement: HTMLVideoElement, watermarkText: string) {
  const container = videoElement.parentElement
  if (!container) return

  const watermark = document.createElement("div")
  watermark.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    user-select: none;
    z-index: 1000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: bold;
    white-space: nowrap;
  `
  watermark.textContent = watermarkText
  container.style.position = "relative"
  container.appendChild(watermark)
}
