const TOKEN_KEY = 'domax.accessToken'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export type UserRole = 'RESIDENT' | 'DISPATCHER'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Логин через dev-login — временный путь для локальной разработки/демо,
 * пока не подключён реальный вход через initData MAX WebApp
 * (см. backend/src/auth: POST /api/auth/max).
 */
export async function devLogin(role: UserRole): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/dev-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  })
  if (!res.ok) {
    throw new Error(`dev-login failed: ${res.status}`)
  }
  const data = await res.json()
  setToken(data.accessToken)
}

