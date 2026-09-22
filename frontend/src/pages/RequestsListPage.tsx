import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { requestsApi } from '../api/requestsApi'
import { PageHeader } from '../components/PageHeader'
import { SlaTimer } from '../components/SlaTimer'
import { StatusBadge } from '../components/StatusBadge'
import { SLA_CONFIG } from '../data/slaConfig'
import type { ServiceRequest } from '../types/request'

export function RequestsListPage() {
  const [requests, setRequests] = useState<ServiceRequest[] | null>(null)

  useEffect(() => {
    let cancelled = false
    requestsApi.list().then((data) => {
      if (!cancelled) setRequests(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <PageHeader title="Мои заявки" />
      <main className="app-content stack">
        {requests === null && <p className="field-hint">Загрузка…</p>}

        {requests !== null && requests.length === 0 && (
          <div className="empty-state">
            <p>Заявок пока нет.</p>
            <p className="field-hint">Нажмите «+», чтобы подать первую заявку в УК.</p>
          </div>
        )}

        {requests?.map((request) => (
          <Link
            key={request.id}
            to={`/requests/${request.id}`}
            className="card"
            style={{ display: 'block', padding: 16, textDecoration: 'none', color: 'inherit' }}
          >
            <div className="stack" style={{ gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <strong>{SLA_CONFIG.find((c) => c.id === request.category)?.label}</strong>
                <StatusBadge status={request.status} />
              </div>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                {request.description}
              </p>
              <SlaTimer request={request} />
            </div>
          </Link>
        ))}
      </main>

      <Link to="/new" className="fab" aria-label="Новая заявка">
        +
      </Link>
    </>
  )
}
