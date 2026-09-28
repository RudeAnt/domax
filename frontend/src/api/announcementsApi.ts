import type { Announcement } from '../types/home'
import { getToken } from '../lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * GET /announcements — список объявлений УК для баннера на главной.
 * На любую ошибку возвращает пустой массив — баннер на HomePage просто
 * не рендерится, без выдуманного контента.
 */
export async function listAnnouncements(): Promise<Announcement[]> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/announcements`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) return []
  return res.json()
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** POST /announcements — доступно только роли DISPATCHER на бэкенде. */
export async function createAnnouncement(input: { title: string; body: string }): Promise<Announcement> {
  const res = await fetch(`${BASE_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    throw new Error(`Не удалось опубликовать объявление: ${res.status}`)
  }
  return res.json()
}

/** DELETE /announcements/:id — доступно только роли DISPATCHER на бэкенде. */
export async function removeAnnouncement(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/announcements/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) {
    throw new Error(`Не удалось удалить объявление: ${res.status}`)
  }
}
