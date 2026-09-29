import { useEffect, useState, type FormEvent } from 'react'
import { createAnnouncement, deleteAnnouncement, listAnnouncements } from '../api/announcementsApi'
import { BottomNav } from '../components/BottomNav'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/ui/Button'
import { IconButton } from '../components/ui/IconButton'
import { TextArea } from '../components/ui/TextArea'
import { TextField } from '../components/ui/TextField'
import { getRole } from '../lib/auth'
import type { Announcement } from '../types/home'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  } catch {
    return ''
  }
}

/**
 * Полный список новостей/объявлений УК. Баннер на HomePage показывает
 * только самое свежее — сюда попадают все, отсортированные бэком по дате.
 * Создание и удаление доступны только диспетчеру (как и на бэке).
 */
export function NewsPage() {
  const isDispatcher = getRole() === 'DISPATCHER'
  const [items, setItems] = useState<Announcement[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formOpen, setFormOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function load() {
    listAnnouncements().then(setItems)
  }

  useEffect(() => {
    load()
  }, [])

  const isValid = title.trim().length > 0 && body.trim().length > 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    setFormError(null)
    try {
      const created = await createAnnouncement({ title: title.trim(), body: body.trim() })
      setItems((prev) => [created, ...(prev ?? [])])
      setTitle('')
      setBody('')
      setFormOpen(false)
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Не удалось опубликовать новость')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    setError(null)
    try {
      await deleteAnnouncement(id)
      setItems((prev) => prev?.filter((a) => a.id !== id) ?? prev)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось удалить новость')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <main className="app-content">
        <PageHeader title="Новости" showBack />

        {isDispatcher && (
          <div className="stack" style={{ marginTop: 16 }}>
            {!formOpen && (
              <Button variant="secondary" onClick={() => setFormOpen(true)}>
                + Новая новость
              </Button>
            )}

            {formOpen && (
              <form className="stack" style={{ gap: 12 }} onSubmit={handleSubmit}>
                <TextField
                  label="Заголовок"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <TextArea
                  label="Текст"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
                {formError && (
                  <p className="field-hint field-hint--error" role="alert">
                    {formError}
                  </p>
                )}
                <div className="panel-row">
                  <Button type="submit" disabled={!isValid} loading={submitting}>
                    Опубликовать
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={submitting}
                    onClick={() => {
                      setFormOpen(false)
                      setFormError(null)
                      setTitle('')
                      setBody('')
                    }}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {error && (
          <div className="empty-state">
            <p>Не удалось удалить новость</p>
            <p className="field-hint">{error}</p>
          </div>
        )}

        {items === null && <p className="field-hint" style={{ marginTop: 16 }}>Загрузка…</p>}

        {items !== null && items.length === 0 && (
          <div className="empty-state">
            <p>Новостей пока нет.</p>
          </div>
        )}

        <div className="request-list">
          {items?.map((item) => (
            <article key={item.id} className="request-card notification">
              {isDispatcher && (
                <IconButton
                  aria-label="Удалить новость"
                  className="notification__close"
                  disabled={deletingId === item.id}
                  onClick={() => handleDelete(item.id)}
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </IconButton>
              )}
              <h3 className="request-card__title">{item.title}</h3>
              <p className="request-card__text" style={{ WebkitLineClamp: 'unset' }}>
                {item.body}
              </p>
              <p className="request-card__place">{formatDate(item.createdAt)}</p>
            </article>
          ))}
        </div>
      </main>

      <BottomNav left="home" />
    </>
  )
}
