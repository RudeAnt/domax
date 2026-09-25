import type { UserRole } from '../lib/auth'

export interface UserProfile {
  id: string
  fullName: string
  role: UserRole
  address: string
  apartment?: number
}

export interface Announcement {
  id: string
  title: string
  body: string
  createdAt: string
}
