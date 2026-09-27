import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../api/usersApi'
import { requestsApi } from '../api/requestsApi'
import { CategoryPicker } from '../components/CategoryPicker'
import { PageHeader } from '../components/PageHeader'
import { PhotoUpload } from '../components/PhotoUpload'
import { classifyCategory } from '../utils/classifyCategory'
import type { RequestCategory } from '../types/request'

export function NewRequestPage() {
  const navigate = useNavigate()
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

  // Бэкенд требует адрес при создании заявки (CreateTicketDto.address) —
  // подтягиваем его из профиля автоматически, пользователь его не вводит.
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

  const isValid = title.trim().length > 0 && description.trim().length > 0 && !!address

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid || submitting || !address) return
    setSubmitting(true)
    try {
      const created = await requestsApi.create({
        title: title.trim(),
        category,
        address,
        description: description.trim(),
        entrance: entrance ? Number(entrance) : undefined,
        floor: floor ? Number(floor) : undefined,
        photoUrl,
      })
      navigate(`/requests/${created.id}`, { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader title="Новая заявка" showBack />
      <main className="app-content">
        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Тема заявки</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: течёт потолок в ванной"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="description">Подробное описание</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Опишите проблему подробнее — это поможет мастеру подготовиться заранее"
              required
            />
          </div>

          <CategoryPicker
            value={category}
            suggested={description ? suggested : undefined}
            onChange={(next) => {
              setCategory(next)
              setCategoryTouched(true)
            }}
          />

          <div className="field">
            <label>Адрес</label>
            {address && <p style={{ margin: 0 }}>{address}</p>}
            {!address && !addressError && <p className="field-hint">Загрузка адреса из профиля…</p>}
            {addressError && (
              <p className="field-hint" style={{ color: 'var(--color-danger)' }}>
                Не удалось загрузить адрес из профиля — оформить заявку пока нельзя, попробуйте
                обновить страницу.
              </p>
            )}
          </div>

          <div className="field">
            <label id="place-label">Место проблемы</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }} role="group" aria-labelledby="place-label">
              <input
                type="number"
                min={1}
                inputMode="numeric"
                value={entrance}
                onChange={(e) => setEntrance(e.target.value)}
                placeholder="Подъезд №"
                aria-label="Подъезд"
                style={{ flex: 1 }}
              />
              <input
                type="number"
                inputMode="numeric"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Этаж"
                aria-label="Этаж"
                style={{ flex: 1 }}
              />
            </div>
            <p className="field-hint">
              Адрес дома берётся из вашего профиля — здесь достаточно уточнить подъезд и этаж.
            </p>
          </div>

          <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />

          <button type="submit" className="btn btn-primary" disabled={!isValid || submitting}>
            {submitting ? 'Отправка…' : 'Оформить заявку'}
          </button>
        </form>
      </main>
    </>
  )
}