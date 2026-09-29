const TOKEN_KEY = 'domax.accessToken'
const ROLE_KEY = 'domax.role'
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

export function getRole(): UserRole {
  return localStorage.getItem(ROLE_KEY) === 'DISPATCHER' ? 'DISPATCHER' : 'RESIDENT'
}

export function setRole(role: UserRole): void {
  localStorage.setItem(ROLE_KEY, role)
}

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

export async function loginWithMax(initData: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/max`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  })
  if (!res.ok) {
    throw new Error(`MAX login failed: ${res.status}`)
  }
  const data = await res.json()
  setToken(data.accessToken)
}
