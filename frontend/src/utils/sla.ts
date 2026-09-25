import type { ServiceRequest } from '../types/request'

export function getDeadline(request: ServiceRequest): Date {
  return new Date(request.slaDeadline)
}

export function getRemainingMs(request: ServiceRequest, now: Date = new Date()): number {
  return getDeadline(request).getTime() - now.getTime()
}

export function isOverdue(request: ServiceRequest, now: Date = new Date()): boolean {
  return request.status !== 'CLOSED' && getRemainingMs(request, now) < 0
}

export function formatDuration(ms: number): string {
  const abs = Math.abs(ms)
  const totalMinutes = Math.floor(abs / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  const parts: string[] = []
  if (days > 0) parts.push(`${days} д`)
  if (days > 0 || hours > 0) parts.push(`${hours} ч`)
  parts.push(`${minutes} мин`)

  return parts.join(' ')
}

