import { useEffect, useState, type FormEvent } from 'react'
import { getMyProfile } from '../api/usersApi'
import { requestsApi } from '../api/requestsApi'
import { createAnnouncement, listAnnouncements, removeAnnouncement } from '../api/announcementsApi'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { IconButton } from '../components/ui/IconButton'
import { TextArea } from '../components/ui/TextArea'
import { TextField } from '../components/ui/TextField'
import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { Announcement } from '../types/home'
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

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [announcementTitle, setAnnouncementTitle] = useState('')
  const [announcementBody, setAnnouncementBody] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [announcementError, setAnnouncementError] = useState<string | null>(null)
  const [deletingAnnouncementId, setDeletingAnnouncementId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMyProfile()
      .then((profile) => {
        if (cancelled) return
        setRole(profile.role)
        // Заявки по всем домам — чувствительные данные (ФИО, адреса), поэтому
        // грузим их только ПОСЛЕ подтверждения роли DISPATCHER, а не параллельно
        // с проверкой роли: иначе список на мгновение отрисуется для любого
        // пользователя, пока role ещё null (см. рендер ниже).
        if (profile.role !== 'DISPATCHER') return
        return Promise.all([requestsApi.list(), listAnnouncements()])
      })
      .then((result) => {
        if (cancelled || !result) return
        const [requestsData, announcementsData] = result
        setRequests(requestsData)
        setAnnouncements(announcementsData)
      })
      .catch((e) =>
        !cancelled &&
        setError(e instanceof Error ? e.message : 'Не удалось проверить роль пользователя или загрузить заявки'),
      )
    return () => {
      cancelled = true
    }
  }, [])

  async function handlePublishAnnouncement(e: FormEvent) {
    e.preventDefault()
    if (!announcementTitle.trim() || !announcementBody.trim() || publishing) return
    setPublishing(true)
    setAnnouncementError(null)
    try {
      const created = await createAnnouncement({
        title: announcementTitle.trim(),
        body: announcementBody.trim(),
      })
      setAnnouncements((prev) => [created, ...prev])
      setAnnouncementTitle('')
      setAnnouncementBody('')
    } catch (e) {
      setAnnouncementError(e instanceof Error ? e.message : 'Не удалось опубликовать объявление')
    } finally {
      setPublishing(false)
    }
  }

  async function handleRemoveAnnouncement(id: string) {
    setDeletingAnnouncementId(id)
    setAnnouncementError(null)
    try {
      await removeAnnouncement(id)
      setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    } catch (e) {
      setAnnouncementError(e instanceof Error ? e.message : 'Не удалось удалить объявление')
    } finally {
      setDeletingAnnouncementId(null)
    }
  }

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

  if (role !== 'DISPATCHER') {
    return (
      <>
        <PageHeader title="Панель администратора" showBack />
        <main className="app-content">
          {role === null && !error && <p className="field-hint">Проверяем доступ…</p>}
          {role === null && error && (
            <div className="empty-state">
              <p>Не удалось проверить доступ</p>
              <p className="field-hint">{error}</p>
            </div>
          )}
          {role !== null && (
            <EmptyState
              title="Доступно только диспетчерам"
              description="Эта панель предназначена для сотрудников управляющей компании."
            />
          )}
        </main>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Панель администратора" showBack />
      <main className="app-content stack">
        <Card style={{ padding: 16 }}>
          <div className="stack" style={{ gap: 12 }}>
            <strong>Новости дома</strong>

            <form onSubmit={handlePublishAnnouncement} className="stack" style={{ gap: 8 }}>
              <TextField
                label="Заголовок"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Плановое отключение воды"
              />
              <TextArea
                label="Текст"
                value={announcementBody}
                onChange={(e) => setAnnouncementBody(e.target.value)}
                placeholder="27 сентября с 10:00 до 14:00 будет отключена холодная вода на всём доме."
              />
              {announcementError && <p className="field-hint field-hint--error">{announcementError}</p>}
              <Button
                type="submit"
                variant="secondary"
                loading={publishing}
                disabled={!announcementTitle.trim() || !announcementBody.trim()}
              >
                Опубликовать
              </Button>
            </form>

            {announcements.map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0 }}>{a.title}</p>
                  <p className="field-hint" style={{ margin: 0 }}>{a.body}</p>
                </div>
                <IconButton
                  aria-label="Удалить объявление"
                  onClick={() => handleRemoveAnnouncement(a.id)}
                  disabled={deletingAnnouncementId === a.id}
                >
                  ✕
                </IconButton>
              </div>
            ))}
          </div>
        </Card>

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
