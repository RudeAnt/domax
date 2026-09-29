import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bellIcon from '../assets/nav/bell.png'
import logo from '../assets/brand/logo.png'
import { listAnnouncements } from '../api/announcementsApi'
import { requestsApi } from '../api/requestsApi'
import { getMyProfile } from '../api/usersApi'
import { BottomNav } from '../components/BottomNav'
import { RequestCard } from '../components/RequestCard'
import { TileLink } from '../components/TileLink'
import type { Announcement, UserProfile } from '../types/home'
import type { ServiceRequest } from '../types/request'

const RECENT_COUNT = 3

export function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [recent, setRecent] = useState<ServiceRequest[] | null>(null)
  const [recentError, setRecentError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMyProfile()
      .then((data) => !cancelled && setProfile(data))
      .catch(() => {
        // Адрес просто не показываем — остальная главная работает без него.
      })
    listAnnouncements().then((data) => !cancelled && setAnnouncements(data))
    requestsApi
      .list()
      .then((data) => !cancelled && setRecent(data.slice(0, RECENT_COUNT)))
      .catch(
        (e) =>
          !cancelled && setRecentError(e instanceof Error ? e.message : 'Не удалось загрузить заявки'),
      )
    return () => {
      cancelled = true
    }
  }, [])

  const announcement = announcements[0]

  return (
    <>
      <main className="app-content home">
        <img className="home__logo" src={logo} alt="DOМАКС" width={168} height={67} />

        <div className="home__bell">
          <TileLink to="/notifications" icon={bellIcon} label="Уведомления" soft />
        </div>

        {profile && (
          <p className="home__address">
            {profile.address}
            {profile.apartment ? ` кв ${profile.apartment}` : ''}
          </p>
        )}

        <div className="title-row" style={{ marginTop: 'var(--space-3)' }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            Новости
          </h2>
          <Link to="/news" className="field-hint">
            Все →
          </Link>
        </div>

        {announcement ? (
          <section className="announcement" aria-label="Объявление">
            <h2 className="announcement__title">{announcement.title}</h2>
            <p className="announcement__text">{announcement.body}</p>
          </section>
        ) : (
          <p className="field-hint">Объявлений пока нет.</p>
        )}

        <h2 className="section-title">Недавние заявки</h2>

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

        <div className="request-list">
          {recent?.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>

        <p className="field-hint" style={{ textAlign: 'center', marginTop: 8 }}>
          <Link to="/dev/role">Демо: сменить роль</Link>
        </p>
      </main>

      <BottomNav left="requests" />
    </>
  )
}