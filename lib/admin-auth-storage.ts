// Singleton storage for admin authentication codes
// In production, this should be replaced with Redis or database storage

class AdminAuthStorageClass {
  private static instance: AdminAuthStorageClass
  private codes: Map<string, { code: string; timestamp: number }>

  private constructor() {
    this.codes = new Map()
  }

  static getInstance(): AdminAuthStorageClass {
    if (!AdminAuthStorageClass.instance) {
      AdminAuthStorageClass.instance = new AdminAuthStorageClass()
    }
    return AdminAuthStorageClass.instance
  }

  storeCode(code: string): void {
    console.log("[v0] Storing auth code:", { key: "admin", code, timestamp: Date.now() })
    this.codes.set("admin", {
      code,
      timestamp: Date.now(),
    })
  }

  getCode(): { code: string; timestamp: number } | undefined {
    const stored = this.codes.get("admin")
    console.log("[v0] Retrieving auth code:", { key: "admin", found: !!stored, stored })
    return stored
  }

  deleteCode(): void {
    console.log("[v0] Deleting auth code: admin")
    this.codes.delete("admin")
  }

  // Clean up expired codes (older than 10 minutes)
  cleanupExpired(): void {
    const now = Date.now()
    const expiryTime = 10 * 60 * 1000 // 10 minutes

    for (const [key, data] of this.codes.entries()) {
      if (now - data.timestamp > expiryTime) {
        console.log("[v0] Cleaning up expired code:", key)
        this.codes.delete(key)
      }
    }
  }
}

export const AdminAuthStorage = AdminAuthStorageClass.getInstance()
export const adminAuthStorage = AdminAuthStorage

// Clean up expired codes every minute
setInterval(() => {
  AdminAuthStorage.cleanupExpired()
}, 60 * 1000)
