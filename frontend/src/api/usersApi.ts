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

/**
 * PATCH /users/me — ЖДЁТ бэкенд (пока есть только GET /users/me,
 * см. backend/src/users/users.controller.ts). Каждый пользователь сейчас
 * получает один и тот же адрес-заглушку с колонки User.address при
 * создании — без этого эндпоинта житель не может указать свой реальный
 * адрес/квартиру. Контракт согласован заранее, чтобы фронт не блокировался:
 * тело {address, apartment}, ответ — обновлённый UserProfile, как у GET.
 */
export async function updateMyProfile(input: { address: string; apartment?: number }): Promise<UserProfile> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    throw new Error(`PATCH /users/me failed: ${res.status}`)
  }
  return res.json()
}
