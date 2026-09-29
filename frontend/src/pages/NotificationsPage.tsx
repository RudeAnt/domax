import { useEffect, useMemo, useState } from 'react'
import homeIcon from '../assets/nav/home.png'
import { listAnnouncements } from '../api/announcementsApi'
import { requestsApi } from '../api/requestsApi'
import { BottomNav } from '../components/BottomNav'
import { TileLink } from '../components/TileLink'
import type { Announcement } from '../types/home'
import type { ServiceRequest } from '../types/request'

const DISMISSED_KEY = 'domax.dismissedNotifications'

interface NotificationItem {
  id: string
  title: string
  subtitle?: string
  text?: string
  date: number
}

function readDismissed(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function writeDismissed(ids: string[]) {
  try {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(ids))
  } catch {
    // не критично: уведомление просто вернётся после перезагрузки
  }
}

/**
 * Уведомления собираются на клиенте из того, что уже отдаёт бэк:
 * объявления УК и заявки, по которым работа завершена. Отдельной сущности
 * «уведомление» на бэке нет; крестик прячет карточку только на этом устройстве.
 */
function buildItems(requests: ServiceRequest[], announcements: Announcement[]): NotificationItem[] {
  const fromRequests = requests
    .filter((r) => r.status === 'COMPLETED' || r.status === 'CLOSED')
    .map<NotificationItem>((r) => ({
      id: `request-${r.id}`,
      title: r.status === 'CLOSED' ? 'Ваша заявка закрыта' : 'Ваша заявка выполнена',
      subtitle: r.title,
      date: new Date(r.updatedAt).getTime(),
    }))

  const fromAnnouncements = announcements.map<NotificationItem>((a) => ({
    id: `announcement-${a.id}`,
    title: a.title,
    text: a.body,
    date: new Date(a.createdAt).getTime(),
  }))

  return [...fromRequests, ...fromAnnouncements].sort((a, b) => b.date - a.date)
}

export function NotificationsPage() {
  const [requests, setRequests] = useState<ServiceRequest[] | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState<string[]>(readDismissed)

  useEffect(() => {
    let cancelled = false
    requestsApi
      .list()
      .then((data) => !cancelled && setRequests(data))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Не удалось загрузить'))
    listAnnouncements().then((data) => !cancelled && setAnnouncements(data))
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => {
    if (!requests || !announcements) return null
    return buildItems(requests, announcements).filter((item) => !dismissed.includes(item.id))
  }, [requests, announcements, dismissed])

  function dismiss(id: string) {
    const next = [...dismissed, id]
    setDismissed(next)
    writeDismissed(next)
  }

  return (
    <>
      <main className="app-content">
        <div className="title-row">
          <h1 className="page-title">Уведомления</h1>
          <TileLink to="/" icon={homeIcon} label="Главная" soft />
        </div>

        {error && (
          <div className="empty-state">
            <p>Не удалось загрузить уведомления</p>
            <p className="field-hint">{error}</p>
          </div>
        )}

        {!error && items === null && <p className="field-hint">Загрузка…</p>}

        {!error && items !== null && items.length === 0 && (
          <div className="empty-state">
            <p>Уведомлений нет.</p>
          </div>
        )}

        <div className="request-list">
          {items?.map((item) => (
            <article key={item.id} className="request-card notification">
              <button
                type="button"
                className="notification__close"
                aria-label="Скрыть уведомление"
                onClick={() => dismiss(item.id)}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <h3 className="request-card__title">{item.title}</h3>
              {item.subtitle && <p className="request-card__place">{item.subtitle}</p>}
              {item.text && <p className="request-card__text">{item.text}</p>}
            </article>
          ))}
        </div>
      </main>

      <BottomNav left="requests" />
    </>
  )
}
