import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyProfile } from '../api/usersApi'
import { listAnnouncements } from '../api/announcementsApi'
import { requestsApi } from '../api/requestsApi'
import { SlaTimer } from '../components/SlaTimer'
import { StatusBadge } from '../components/StatusBadge'
import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { Announcement, UserProfile } from '../types/home'
import type { ServiceRequest } from '../types/request'

const RECENT_COUNT = 3

export function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileError, setProfileError] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [recent, setRecent] = useState<ServiceRequest[] | null>(null)
  const [recentError, setRecentError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMyProfile()
      .then((data) => !cancelled && setProfile(data))
      .catch(() => !cancelled && setProfileError(true))
    listAnnouncements().then((data) => !cancelled && setAnnouncements(data))
    requestsApi
      .list()
      .then((data) => !cancelled && setRecent(data.slice(0, RECENT_COUNT)))
      .catch((e) => !cancelled && setRecentError(e instanceof Error ? e.message : 'Не удалось загрузить заявки'))
    return () => {
      cancelled = true
    }
  }, [])

  const latestAnnouncement = announcements[0]

  return (
    <>
    <main className="app-content stack">
      {/* Адрес — ждёт GET /users/me на бэке (см. api/usersApi.ts). Пока
          эндпоинта нет, честно молчим вместо выдуманного адреса. */}
      {profile && (
        <p style={{ margin: 0, fontSize: 15, color: 'var(--color-text-muted)' }}>
          {profile.address}
          {profile.apartment ? `, кв. ${profile.apartment}` : ''}
        </p>
      )}
      {profileError && (
        <p className="field-hint">Адрес пока недоступен — эндпоинт профиля ещё не подключён.</p>
      )}

      {/* Баннер объявления — ждёт сущность «Новости» на бэке (её пока нет
          вообще). Рендерится только если реально что-то пришло. */}
      {latestAnnouncement && (
        <div className="card card--brand-outline" style={{ padding: 16 }}>
          <strong>{latestAnnouncement.title}</strong>
          <p style={{ margin: '8px 0 0', color: 'var(--color-text-muted)' }}>
            {latestAnnouncement.body}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Недавние заявки</h2>
        <Link to="/requests" className="field-hint" style={{ textDecoration: 'none' }}>
          Все заявки →
        </Link>
      </div>

      {recentError && (
        <div className="empty-state">
          <p>Не удалось загрузить заявки</p>
          <p className="field-hint">{recentError}</p>
        </div>
      )}

      {!recentError && recent === null && <p className="field-hint">Загрузка…</p>}

      {!recentError && recent !== null && recent.length === 0 && (
        <div className="empty-state">
          <p>Заявок пока нет.</p>
          <p className="field-hint">Нажмите «+», чтобы подать первую заявку в УК.</p>
        </div>
      )}

      {recent?.map((request) => (
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
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{request.description}</p>
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
