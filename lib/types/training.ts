// Training platform types

export interface TrainingVideo {
  id: number
  title: string
  description?: string
  duration: string
  videoUrl: string
  thumbnailUrl?: string
  order: number
  completed: boolean
  locked: boolean
  resources?: TrainingResource[]
}

export interface TrainingChapter {
  id: number
  title: string
  description?: string
  duration: string
  order: number
  videos: TrainingVideo[]
}

export interface Training {
  id: string
  title: string
  description: string
  instructor: string
  instructorBio?: string
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux"
  duration: string
  language: string
  price: number
  imageUrl: string
  previewVideoUrl?: string
  chapters: TrainingChapter[]
  totalVideos: number
  totalDuration: string
  rating?: number
  studentsCount?: number
  lastUpdated: Date
  createdAt: Date
}

export interface TrainingResource {
  id: string
  title: string
  type: "pdf" | "zip" | "code" | "other"
  fileUrl: string
  fileSize: string
}

export interface TrainingProgress {
  userId: string
  trainingId: string
  overallProgress: number
  completedVideos: number
  totalVideos: number
  currentVideoId?: number
  lastAccessedAt: Date
  completedAt?: Date
}

export interface Certificate {
  id: string
  userId: string
  trainingId: string
  trainingTitle: string
  studentName: string
  completionDate: Date
  certificateUrl: string
  verificationCode: string
}

// DRM Configuration
export interface DRMConfig {
  provider: "widevine" | "fairplay" | "playready"
  licenseUrl: string
  certificateUrl?: string
  watermarkEnabled: boolean
  watermarkText?: string
  downloadProtection: boolean
  screenCaptureProtection: boolean
}
