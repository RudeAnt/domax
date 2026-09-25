import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestsApi } from '../api/requestsApi'
import { CategoryPicker } from '../components/CategoryPicker'
import { PageHeader } from '../components/PageHeader'
import { PhotoUpload } from '../components/PhotoUpload'
import { classifyCategory } from '../utils/classifyCategory'
import type { RequestCategory } from '../types/request'

export function NewRequestPage() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<RequestCategory>('OTHER')
  const [categoryTouched, setCategoryTouched] = useState(false)
  const [address, setAddress] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  const suggested = useMemo(() => classifyCategory(description), [description])

  function handleDescriptionChange(value: string) {
    setDescription(value)
    if (!categoryTouched) {
      setCategory(classifyCategory(value))
    }
  }

  const isValid = description.trim().length > 0 && address.trim().length > 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    try {
      const title = description.trim().slice(0, 60)
      const created = await requestsApi.create({
        title,
        category,
        description: description.trim(),
        address: address.trim(),
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
            <label htmlFor="description">Опишите проблему</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Например: течёт потолок в ванной"
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
            <label htmlFor="address">Адрес</label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Улица, дом, квартира"
              required
            />
            <p className="field-hint">
              Тестовые данные вместо ФИАС/ГИС ЖКХ — интеграция с реальным справочником
              адресов запланирована отдельным слоем (см. стратегию, раздел 7).
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

