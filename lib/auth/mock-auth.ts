// Mock authentication system for development
// This provides test accounts for client and admin roles

export type UserRole = "client" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

// Test accounts for development
export const DEV_ACCOUNTS = {
  client: {
    email: "client@windevexpert.com",
    password: "client123",
    user: {
      id: "client-001",
      email: "client@windevexpert.com",
      name: "Jean Dupont",
      role: "client" as UserRole,
      avatar: "/avatars/client.jpg",
    },
  },
  admin: {
    email: "admin@windevexpert.com",
    password: "admin123",
    user: {
      id: "admin-001",
      email: "admin@windevexpert.com",
      name: "Marie Admin",
      role: "admin" as UserRole,
      avatar: "/avatars/admin.jpg",
    },
  },
}

export function authenticateUser(email: string, password: string): User | null {
  // Check client account
  if (email === DEV_ACCOUNTS.client.email && password === DEV_ACCOUNTS.client.password) {
    return DEV_ACCOUNTS.client.user
  }

  // Check admin account
  if (email === DEV_ACCOUNTS.admin.email && password === DEV_ACCOUNTS.admin.password) {
    return DEV_ACCOUNTS.admin.user
  }

  return null
}

export function storeUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("windevexpert_user", JSON.stringify(user))
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("windevexpert_user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function clearStoredUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("windevexpert_user")
  }
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

export function isClient(user: User | null): boolean {
  return user?.role === "client"
}
