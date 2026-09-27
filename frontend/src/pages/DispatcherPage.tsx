import { useEffect, useState } from 'react'
import { getMyProfile } from '../api/usersApi'
import { requestsApi } from '../api/requestsApi'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { RequestStatus, ServiceRequest } from '../types/request'

/**
 * Панель диспетчера УК — открывается по кнопке "Панель администратора" в
 * боте (payload=admin, см. App.tsx и bot/src/keyboards.ts) или напрямую
 * по /dispatcher. Показывает все заявки и позволяет двигать статус вперёд.
 * Реальная защита — на бэкенде (@Roles(DISPATCHER) на PATCH .../status),
 * здесь только UX: жителю просто не показываем кнопки действий.
 */

const NEXT_STATUS: Partial<Record<RequestStatus, { status: RequestStatus; label: string }>> = {
  CREATED: { status: 'IN_PROGRESS', label: 'Взять в работу' },
  IN_PROGRESS: { status: 'COMPLETED', label: 'Отметить выполненной' },
  COMPLETED: { status: 'CLOSED', label: 'Закрыть заявку' },
}

export function DispatcherPage() {
  const [role, setRole] = useState<'RESIDENT' | 'DISPATCHER' | null>(null)
  const [requests, setRequests] = useState<ServiceRequest[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMyProfile()
      .then((profile) => !cancelled && setRole(profile.role))
      .catch(() => !cancelled && setError('Не удалось проверить роль пользователя'))
    requestsApi
      .list()
      .then((data) => !cancelled && setRequests(data))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Не удалось загрузить заявки'))
    return () => {
      cancelled = true
    }
  }, [])

  async function handleAdvance(request: ServiceRequest) {
    const next = NEXT_STATUS[request.status]
    if (!next) return
    setUpdatingId(request.id)
    try {
      const updated = await requestsApi.updateStatus(request.id, next.status)
      setRequests((prev) => prev?.map((r) => (r.id === updated.id ? updated : r)) ?? prev)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось изменить статус')
    } finally {
      setUpdatingId(null)
    }
  }

  if (role && role !== 'DISPATCHER') {
    return (
      <>
        <PageHeader title="Панель администратора" showBack />
        <main className="app-content">
          <EmptyState
            title="Доступно только диспетчерам"
            description="Эта панель предназначена для сотрудников управляющей компании."
          />
        </main>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Панель администратора" showBack />
      <main className="app-content stack">
        {error && (
          <div className="empty-state">
            <p>Ошибка</p>
            <p className="field-hint">{error}</p>
          </div>
        )}

        {!error && requests === null && <p className="field-hint">Загрузка…</p>}

        {!error && requests !== null && requests.length === 0 && (
          <EmptyState title="Заявок пока нет" />
        )}

        {requests?.map((request) => {
          const next = NEXT_STATUS[request.status]
          return (
            <Card key={request.id} style={{ padding: 16 }}>
              <div className="stack" style={{ gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <strong>{CATEGORY_CONFIG.find((c) => c.id === request.category)?.label}</strong>
                  <StatusBadge status={request.status} />
                </div>
                <p style={{ margin: 0 }}>{request.title}</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                  {request.author.address}
                  {request.author.apartment ? `, кв. ${request.author.apartment}` : ''}
                  {request.entrance ? `, подъезд ${request.entrance}` : ''}
                  {request.floor ? `, ${request.floor} этаж` : ''}
                </p>
                <p className="field-hint" style={{ margin: 0 }}>
                  Заявитель: {request.author.fullName}
                </p>
                {next && (
                  <Button
                    variant="primary"
                    loading={updatingId === request.id}
                    onClick={() => handleAdvance(request)}
                  >
                    {next.label}
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </main>
    </>
  )
}
