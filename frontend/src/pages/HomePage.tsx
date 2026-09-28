import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getMyProfile, updateMyProfile } from '../api/usersApi'
import { listAnnouncements } from '../api/announcementsApi'
import { requestsApi } from '../api/requestsApi'
import { SlaTimer } from '../components/SlaTimer'
import { StatusBadge } from '../components/StatusBadge'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
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

  const [addressSheetOpen, setAddressSheetOpen] = useState(false)
  const [addressInput, setAddressInput] = useState('')
  const [apartmentInput, setApartmentInput] = useState('')
  const [savingAddress, setSavingAddress] = useState(false)
  const [addressSaveError, setAddressSaveError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    // Заявки грузим только ПОСЛЕ профиля, чтобы отфильтровать список по
    // адресу дома жителя (иначе на главной видно заявки всех домов сразу).
    // Если профиль не загрузился — показываем нефильтрованный список, а не
    // блокируем страницу целиком из-за одной упавшей ручки.
    getMyProfile()
      .then((data) => {
        if (cancelled) return undefined
        setProfile(data)
        return data.address
      })
      .catch(() => {
        if (!cancelled) setProfileError(true)
        return undefined
      })
      .then((address) =>
        requestsApi
          .list(address)
          .then((data) => !cancelled && setRecent(data.slice(0, RECENT_COUNT)))
          .catch((e) => !cancelled && setRecentError(e instanceof Error ? e.message : 'Не удалось загрузить заявки')),
      )

    listAnnouncements().then((data) => !cancelled && setAnnouncements(data))
    return () => {
      cancelled = true
    }
  }, [])

  const latestAnnouncement = announcements[0]

  function openAddressSheet() {
    if (!profile) return
    setAddressInput(profile.address)
    setApartmentInput(profile.apartment ? String(profile.apartment) : '')
    setAddressSaveError(null)
    setAddressSheetOpen(true)
  }

  async function handleSaveAddress(e: FormEvent) {
    e.preventDefault()
    if (!addressInput.trim() || savingAddress) return
    setSavingAddress(true)
    setAddressSaveError(null)
    try {
      const updated = await updateMyProfile({
        address: addressInput.trim(),
        apartment: apartmentInput ? Number(apartmentInput) : undefined,
      })
      setProfile(updated)
      setAddressSheetOpen(false)
    } catch (e) {
      setAddressSaveError(e instanceof Error ? e.message : 'Не удалось сохранить адрес')
    } finally {
      setSavingAddress(false)
    }
  }

  return (
    <>
    <main className="app-content stack">
      {/* Тап по адресу открывает форму редактирования — PATCH /users/me
          пока нет на бэке (см. api/usersApi.ts, updateMyProfile), поэтому
          сохранение здесь до готовности бэкенда будет падать с ошибкой. */}
      {profile && (
        <button
          type="button"
          onClick={openAddressSheet}
          style={{
            margin: 0,
            padding: 0,
            border: 'none',
            background: 'none',
            fontSize: 15,
            color: 'var(--color-text-muted)',
            textAlign: 'left',
            textDecoration: 'underline',
          }}
        >
          {profile.address}
          {profile.apartment ? `, кв. ${profile.apartment}` : ''}
        </button>
      )}
      {profileError && (
        <p className="field-hint">Адрес пока недоступен — эндпоинт профиля ещё не подключён.</p>
      )}

      <BottomSheet open={addressSheetOpen} onClose={() => setAddressSheetOpen(false)} title="Ваш адрес">
        <form onSubmit={handleSaveAddress} className="stack" style={{ gap: 12 }}>
          <TextField
            label="Адрес дома"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />
          <TextField
            label="Квартира"
            type="number"
            value={apartmentInput}
            onChange={(e) => setApartmentInput(e.target.value)}
          />
          {addressSaveError && <p className="field-hint field-hint--error">{addressSaveError}</p>}
          <Button type="submit" loading={savingAddress} disabled={!addressInput.trim()}>
            Сохранить
          </Button>
        </form>
      </BottomSheet>

      {/* Единственный вход на /dispatcher из интерфейса (помимо кнопки в
          боте с payload=admin) — иначе роль DISPATCHER просто не может
          попасть на свою панель без выхода в MAX. */}
      {profile?.role === 'DISPATCHER' && (
        <Link to="/dispatcher" className="card card--brand-outline" style={{ padding: 16, textDecoration: 'none', color: 'inherit' }}>
          <strong>Панель диспетчера →</strong>
        </Link>
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
