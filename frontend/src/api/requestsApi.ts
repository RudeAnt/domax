import type { CreateRequestInput, ServiceRequest } from '../types/request'
import { getToken } from '../lib/auth'

export interface RequestsApi {
  list(): Promise<ServiceRequest[]>
  get(id: string): Promise<ServiceRequest | undefined>
  create(input: CreateRequestInput): Promise<ServiceRequest>
  upvote(id: string): Promise<ServiceRequest>
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Бросает с понятным сообщением вместо того, чтобы дальше по цепочке
// упасть на .map() над объектом ошибки — так вызывающий код может
// показать пользователю осмысленное состояние вместо краша страницы.
async function parseOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Ошибка запроса: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = Array.isArray(body.message) ? body.message.join(', ') : body.message
    } catch {
      // тело не JSON — оставляем дефолтное сообщение
    }
    throw new Error(message)
  }
  return res.json()
}

class HttpRequestsApi implements RequestsApi {
  async list(): Promise<ServiceRequest[]> {
    const res = await fetch(`${BASE_URL}/tickets`, {
      headers: { ...authHeaders() },
    })
    return parseOrThrow<ServiceRequest[]>(res)
  }

  async get(id: string): Promise<ServiceRequest | undefined> {
    const res = await fetch(`${BASE_URL}/tickets/${id}`, {
      headers: { ...authHeaders() },
    })
    if (res.status === 404) return undefined
    return parseOrThrow<ServiceRequest>(res)
  }

  async create(input: CreateRequestInput): Promise<ServiceRequest> {
    const res = await fetch(`${BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(input),
    })
    return parseOrThrow<ServiceRequest>(res)
  }

  async upvote(id: string): Promise<ServiceRequest> {
    const res = await fetch(`${BASE_URL}/tickets/${id}/upvote`, {
      method: 'POST',
      headers: { ...authHeaders() },
    })
    return parseOrThrow<ServiceRequest>(res)
  }
}

export const requestsApi: RequestsApi = new HttpRequestsApi()

