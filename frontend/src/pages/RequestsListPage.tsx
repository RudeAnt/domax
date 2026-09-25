import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { requestsApi } from '../api/requestsApi'
import { PageHeader } from '../components/PageHeader'
import { SlaTimer } from '../components/SlaTimer'
import { StatusBadge } from '../components/StatusBadge'
import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { RequestStatus, ServiceRequest } from '../types/request'

type TabId = 'new' | 'in_progress' | 'done'

const TABS: { id: TabId; label: string; statuses: RequestStatus[] }[] = [
  { id: 'new', label: 'Новые', statuses: ['CREATED'] },
  { id: 'in_progress', label: 'В работе', statuses: ['IN_PROGRESS'] },
  // В макете один таб «Завершенные» на оба финальных статуса — COMPLETED
  // (ждёт подтверждения) и CLOSED (закрыта) — отдельного таба под них нет.
  { id: 'done', label: 'Завершенные', statuses: ['COMPLETED', 'CLOSED'] },
]

export function RequestsListPage() {
  const [requests, setRequests] = useState<ServiceRequest[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('new')

  useEffect(() => {
    let cancelled = false
    requestsApi
      .list()
      .then((data) => {
        if (!cancelled) setRequests(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Не удалось загрузить заявки')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const activeStatuses = TABS.find((t) => t.id === activeTab)!.statuses
  const filtered = useMemo(
    () => requests?.filter((r) => activeStatuses.includes(r.status)) ?? null,
    [requests, activeStatuses],
  )

  return (
    <>
      <PageHeader title="Заявки" showBack />
      <main className="app-content stack">
        <div className="tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={['tab', activeTab === tab.id && 'tab--active'].filter(Boolean).join(' ')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="empty-state">
            <p>Не удалось загрузить заявки</p>
            <p className="field-hint">{error}</p>
          </div>
        )}

        {!error && requests === null && <p className="field-hint">Загрузка…</p>}

        {!error && filtered !== null && filtered.length === 0 && (
          <div className="empty-state">
            <p>
              {activeTab === 'new'
                ? 'Новых заявок нет.'
                : activeTab === 'in_progress'
                  ? 'Заявок в работе нет.'
                  : 'Завершённых заявок пока нет.'}
            </p>
            {activeTab === 'new' && (
              <p className="field-hint">Нажмите «+», чтобы подать первую заявку в УК.</p>
            )}
          </div>
        )}

        {filtered?.map((request) => (
          <Link
            key={request.id}
            to={`/requests/${request.id}`}
            className="card"
            style={{ display: 'block', padding: 16, textDecoration: 'none', color: 'inherit' }}
          >
            <div className="stack" style={{ gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <strong>{CATEGORY_CONFIG.find((c) => c.id === request.category)?.label}</strong>
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