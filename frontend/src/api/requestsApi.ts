import { getSlaConfig } from '../data/slaConfig'
import type { CreateRequestInput, ServiceRequest } from '../types/request'

export interface RequestsApi {
  list(): Promise<ServiceRequest[]>
  get(id: string): Promise<ServiceRequest | undefined>
  create(input: CreateRequestInput): Promise<ServiceRequest>
}

const STORAGE_KEY = 'domax.requests.v1'
const SIMULATED_LATENCY_MS = 300

function readFromStorage(): ServiceRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ServiceRequest[]) : seedRequests()
  } catch {
    return seedRequests()
  }
}

function writeToStorage(requests: ServiceRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — тихо игнорируем,
    // это моковый слой для локальной разработки, не боевое хранилище.
  }
}

function seedRequests(): ServiceRequest[] {
  const now = Date.now()
  const seed: ServiceRequest[] = [
    {
      id: 'seed-1',
      category: 'leak',
      description: 'Течёт потолок в ванной, вода с соседнего этажа',
      address: 'ул. Тестовая, д. 1, кв. 12',
      phone: '+7 900 000-00-01',
      status: 'in_progress',
      createdAt: new Date(now - 20 * 60 * 60 * 1000).toISOString(),
      resolutionHours: getSlaConfig('leak').resolutionHours,
    },
    {
      id: 'seed-2',
      category: 'elevator',
      description: 'Лифт не приезжает на 5 этаж третий день',
      address: 'ул. Тестовая, д. 1, кв. 45',
      phone: '+7 900 000-00-02',
      status: 'registered',
      createdAt: new Date(now - 30 * 60 * 60 * 1000).toISOString(),
      resolutionHours: getSlaConfig('elevator').resolutionHours,
    },
    {
      id: 'seed-3',
      category: 'heating',
      description: 'Холодные батареи в квартире, отопление не работает',
      address: 'ул. Тестовая, д. 2, кв. 3',
      phone: '+7 900 000-00-03',
      status: 'closed',
      createdAt: new Date(now - 48 * 60 * 60 * 1000).toISOString(),
      resolutionHours: getSlaConfig('heating').resolutionHours,
    },
  ]
  writeToStorage(seed)
  return seed
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

/**
 * Моковая реализация: хранит заявки в localStorage браузера, ничего не
 * отправляет на бэкенд. Позволяет фронту работать независимо от того,
 * готовы ли эндпоинты в backend/. Когда бэкенд будет готов — реализовать
 * HttpRequestsApi по этому же интерфейсу и поменять экспорт ниже на него,
 * остальной код приложения трогать не придётся.
 */
class MockRequestsApi implements RequestsApi {
  async list(): Promise<ServiceRequest[]> {
    const requests = readFromStorage()
    return delay([...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
  }

  async get(id: string): Promise<ServiceRequest | undefined> {
    const requests = readFromStorage()
    return delay(requests.find((r) => r.id === id))
  }

  async create(input: CreateRequestInput): Promise<ServiceRequest> {
    const requests = readFromStorage()
    const request: ServiceRequest = {
      ...input,
      id: crypto.randomUUID(),
      status: 'registered',
      createdAt: new Date().toISOString(),
      resolutionHours: getSlaConfig(input.category).resolutionHours,
    }
    writeToStorage([request, ...requests])
    return delay(request)
  }
}

export const requestsApi: RequestsApi = new MockRequestsApi()
