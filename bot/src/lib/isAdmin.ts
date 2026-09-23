import { config } from '../config.js'

export function isAdmin(userId: number | undefined | null): boolean {
  if (!userId) return false
  return config.adminUserIds.includes(userId)
}
