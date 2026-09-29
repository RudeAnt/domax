import { useState, type FormEvent } from 'react'
import plusIcon from '../assets/nav/plus.png'

interface NewsComposerProps {
  onSubmit: (title: string, body: string) => Promise<void>
  onCancel: () => void
}

/**
 * Панель создания объявления — по макету «главный экран модераторов»:
 * поля «Заголовок» / «Содержание» и квадратная тёмная кнопка «+» на отправку.
 */
export function NewsComposer({ onSubmit, onCancel }: NewsComposerProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(title.trim(), body.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось опубликовать')
      setSubmitting(false)
    }
  }

  return (
    <form className="news-composer" onSubmit={handleSubmit}>
      <input
        className="panel-input"
        aria-label="Заголовок"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="panel-input"
        aria-label="Содержание"
        placeholder="Содержание"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {error && (
        <p className="form-panel__error" role="alert">
          {error}
        </p>
      )}
      <div className="news-composer__row">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Отмена
        </button>
        <button type="submit" className="tile-btn" aria-label="Опубликовать" disabled={submitting}>
          <img src={plusIcon} alt="" width={51} height={41} />
        </button>
      </div>
    </form>
  )
}
