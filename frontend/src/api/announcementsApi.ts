import type { Announcement } from '../types/home'
import { getToken } from '../lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export interface CreateAnnouncementInput {
  title: string
  body: string
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function parseOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Ошибка запроса: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = Array.isArray(body.message) ? body.message.join(', ') : body.message
    } catch {}
    throw new Error(message)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export async function listAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${BASE_URL}/announcements`, { headers: authHeaders() })
  if (!res.ok) return []
  return res.json()
}

export async function createAnnouncement(input: CreateAnnouncementInput): Promise<Announcement> {
  const res = await fetch(`${BASE_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(input),
  })
  return parseOrThrow<Announcement>(res)
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/announcements/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  await parseOrThrow<void>(res)
}
