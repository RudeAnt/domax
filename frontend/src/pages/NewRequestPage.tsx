import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMyProfile } from '../api/usersApi'
import { requestsApi } from '../api/requestsApi'
import { CategoryPicker } from '../components/CategoryPicker'
import { PhotoUpload } from '../components/PhotoUpload'
import { SEND_ANIMATION_MS, SendAnimation } from '../components/SendAnimation'
import { classifyCategory } from '../utils/classifyCategory'
import type { RequestCategory } from '../types/request'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function NewRequestPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<RequestCategory>('OTHER')
  const [categoryTouched, setCategoryTouched] = useState(false)
  const [entrance, setEntrance] = useState('')
  const [floor, setFloor] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [addressError, setAddressError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMyProfile()
      .then((profile) => {
        if (!cancelled) setAddress(profile.address)
      })
      .catch(() => {
        if (!cancelled) setAddressError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const suggested = useMemo(() => classifyCategory(description), [description])

  function handleDescriptionChange(value: string) {
    setDescription(value)
    if (!categoryTouched) {
      setCategory(classifyCategory(value))
    }
  }

  function handleClose() {
    if (location.key !== 'default') navigate(-1)
    else navigate('/', { replace: true })
  }

  const isValid = title.trim().length > 0 && description.trim().length > 0 && !!address

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid || submitting || !address) return
    setSubmitting(true)
    setError(null)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      const [created] = await Promise.all([
        requestsApi.create({
          title: title.trim(),
          category,
          address,
          description: description.trim(),
          entrance: entrance ? Number(entrance) : undefined,
          floor: floor ? Number(floor) : undefined,
          photoUrl,
        }),
        sleep(reduceMotion ? 0 : SEND_ANIMATION_MS),
      ])
      navigate(`/requests/${created.id}`, { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось отправить заявку')
      setSubmitting(false)
    }
  }

  return (
    <>
      <main className="app-content">
        <form className="form-panel" onSubmit={handleSubmit}>
          <button type="button" className="form-panel__close" aria-label="Закрыть" onClick={handleClose}>
            <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <input
            className="panel-input"
            aria-label="Тема заявки"
            placeholder="Тема заявки"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="panel-input panel-input--area"
            aria-label="Подробное описание"
            placeholder="Подробное описание"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            required
          />

          <CategoryPicker
            value={category}
            suggested={description ? suggested : undefined}
            onChange={(next) => {
              setCategory(next)
              setCategoryTouched(true)
            }}
          />

          {address && (
            <p className="field-hint" style={{ margin: '4px 0' }}>
              Адрес дома: <strong>{address}</strong>
            </p>
          )}
          {addressError && (
            <p className="field-hint" style={{ color: 'var(--color-danger)' }}>
              Не удалось загрузить адрес из профиля — обновите страницу.
            </p>
          )}

          <div className="panel-row" role="group" aria-label="Место проблемы">
            <input
              className="panel-input"
              type="number"
              min={1}
              inputMode="numeric"
              aria-label="Подъезд"
              placeholder="Подъезд №"
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
            />
            <input
              className="panel-input"
              type="number"
              min={1}
              inputMode="numeric"
              aria-label="Этаж"
              placeholder="Этаж"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>

          <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />

          {error && (
            <p className="form-panel__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-gradient" disabled={!isValid || submitting}>
            Отправить
          </button>
        </form>
      </main>

      {submitting && <SendAnimation />}
    </>
  )
}
