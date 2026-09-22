import { useEffect, useState } from 'react'
import type { ServiceRequest } from '../types/request'
import { formatDuration, getRemainingMs, isOverdue } from '../utils/sla'

export function SlaTimer({ request }: { request: ServiceRequest }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (request.status === 'closed') return
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [request.status])

  if (request.status === 'closed') {
    return <span className="field-hint">Заявка закрыта</span>
  }

  const remaining = getRemainingMs(request, now)
  const overdue = isOverdue(request, now)

  return (
    <span
      className="badge"
      style={{
        background: overdue ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)',
        color: overdue ? 'var(--color-danger)' : 'var(--color-warning)',
      }}
    >
      {overdue
        ? `Просрочено на ${formatDuration(remaining)}`
        : `До срока: ${formatDuration(remaining)}`}
    </span>
  )
}
