import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import bellIcon from '../assets/nav/bell.png'
import dispatcherIcon from '../assets/status-control/edit.png'
import logo from '../assets/brand/logo.png'
import { getMyProfile, updateMyProfile } from '../api/usersApi'
import { listAnnouncements } from '../api/announcementsApi'
import { requestsApi } from '../api/requestsApi'
import { BottomNav } from '../components/BottomNav'
import { RequestCard } from '../components/RequestCard'
import { TileLink } from '../components/TileLink'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import type { Announcement, UserProfile } from '../types/home'
import type { ServiceRequest } from '../types/request'

const RECENT_COUNT = 3

export function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
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

    getMyProfile()
      .then((data) => {
        if (cancelled) return undefined
        setProfile(data)
        return data.address
      })
      .catch(() => undefined)
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

  const announcement = announcements[0]

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
      <main className="app-content home">
        <img className="home__logo" src={logo} alt="DOМАКС" width={168} height={67} />

        <div className="home__bell">
          {profile?.role === 'DISPATCHER' && (
            <Link to="/dispatcher" className="home__dispatcher-tile" aria-label="Панель диспетчера">
              <img src={dispatcherIcon} alt="" width={51} height={41} />
            </Link>
          )}
          <TileLink to="/notifications" icon={bellIcon} label="Уведомления" soft />
        </div>

        {profile && (
          <button
            type="button"
            className="home__address"
            onClick={openAddressSheet}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
            }}
          >
            {profile.address}
            {profile.apartment ? ` кв ${profile.apartment}` : ''}
          </button>
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
