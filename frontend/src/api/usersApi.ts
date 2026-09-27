import type { UserProfile } from '../types/home'
import { getToken } from '../lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/** GET /users/me — профиль текущего авторизованного пользователя. */
export async function getMyProfile(): Promise<UserProfile> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) {
    throw new Error(`GET /users/me failed: ${res.status}`)
  }
  return res.json()
}
