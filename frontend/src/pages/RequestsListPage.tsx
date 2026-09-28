import { useEffect, useMemo, useState } from 'react'
import bellIcon from '../assets/nav/bell.png'
import { requestsApi } from '../api/requestsApi'
import { BottomNav } from '../components/BottomNav'
import { RequestCard } from '../components/RequestCard'
import { StatusControl } from '../components/StatusControl'
import { TileLink } from '../components/TileLink'
import { getRole } from '../lib/auth'
import type { RequestStatus, ServiceRequest } from '../types/request'

type TabId = 'new' | 'in_progress' | 'done'

const TABS: { id: TabId; label: string; statuses: RequestStatus[] }[] = [
  { id: 'new', label: 'Новые', statuses: ['CREATED'] },
  { id: 'in_progress', label: 'В работе', statuses: ['IN_PROGRESS'] },
  // В макете один таб «Завершенные» на оба финальных статуса — COMPLETED
  // (выполнено, ждёт подтверждения) и CLOSED (закрыта).
  { id: 'done', label: 'Завершенные', statuses: ['COMPLETED', 'CLOSED'] },
]

const EMPTY_TEXT: Record<TabId, string> = {
  new: 'Новых заявок нет.',
  in_progress: 'Заявок в работе нет.',
  done: 'Завершённых заявок пока нет.',
}

export function RequestsListPage() {
  const isDispatcher = getRole() === 'DISPATCHER'
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

  function handleStatusChange(id: string, status: RequestStatus) {
    requestsApi.updateStatus(id, status).then((updated) => {
      setRequests((prev) => prev?.map((r) => (r.id === id ? updated : r)) ?? prev)
    })
  }

  const activeStatuses = TABS.find((t) => t.id === activeTab)!.statuses
  const filtered = useMemo(
    () => requests?.filter((r) => activeStatuses.includes(r.status)) ?? null,
    [requests, activeStatuses],
  )

  return (
    <>
      <main className="app-content">
        <div className="title-row">
          <h1 className="page-title">Заявки</h1>
          <TileLink to="/notifications" icon={bellIcon} label="Уведомления" soft />
        </div>

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
            <p>{EMPTY_TEXT[activeTab]}</p>
            {activeTab === 'new' && (
              <p className="field-hint">Нажмите «+», чтобы подать первую заявку в УК.</p>
            )}
          </div>
        )}

        <div className="request-list">
          {filtered?.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              action={
                isDispatcher ? (
                  <StatusControl
                    status={request.status}
                    onChange={(next) => handleStatusChange(request.id, next)}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      </main>

      <BottomNav left="home" />
    </>
  )
}
