import type { UserProfile } from '../types/home'
import { getToken } from '../lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Ждёт GET /users/me на бэке — сейчас там есть только внутренний
 * UsersService без контроллера наружу (см. backend/src/users). Пока
 * эндпоинта нет, запрос честно упадёт 404 и HomePage покажет пустое
 * состояние вместо адреса, а не выдуманные данные.
 */
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
