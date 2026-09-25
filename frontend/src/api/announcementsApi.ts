import type { Announcement } from '../types/home'
import { getToken } from '../lib/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Ждёт GET /announcements на бэке — сущности «Новости»/объявлений пока
 * нет вообще (ни таблицы, ни модуля). До появления бэка возвращает
 * пустой массив на любую ошибку — баннер на HomePage просто не рендерится,
 * без выдуманного контента.
 */
export async function listAnnouncements(): Promise<Announcement[]> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/announcements`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) return []
  return res.json()
}
