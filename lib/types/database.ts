// Database schema types for WindevExpert platform
// This will be used with the chosen database integration (Supabase/Neon)

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "client" | "admin" | "super_admin"
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  category: "service" | "software" | "component" | "training"
  price: number
  currency: string
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  totalAmount: number
  currency: string
  status: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "stripe" | "paypal" | "mobile_money"
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  createdAt: Date
}

export interface Training {
  id: string
  productId: string
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  videoCount: number
  createdAt: Date
  updatedAt: Date
}

export interface TrainingVideo {
  id: string
  trainingId: string
  title: string
  description: string
  order: number
  duration: number
  videoUrl: string // Firebase/GCP URL with DRM
  thumbnailUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserTrainingAccess {
  id: string
  userId: string
  trainingId: string
  purchaseDate: Date
  expiryDate?: Date
  progress: number // 0-100
  lastAccessedAt?: Date
}

export interface Project {
  id: string
  userId: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  budget?: number
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  category: string
  tags: string[]
  imageUrl?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}
