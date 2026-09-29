import { useEffect, useRef, useState } from 'react'
import closedIcon from '../assets/status-control/closed.png'
import completedIcon from '../assets/status-control/completed.png'
import editIcon from '../assets/status-control/edit.png'
import inProgressIcon from '../assets/status-control/in-progress.png'
import pickerBackground from '../assets/status-control/picker.png'
import type { RequestStatus } from '../types/request'

interface StatusControlProps {
  status: RequestStatus
  onChange: (next: RequestStatus) => void
  disabled?: boolean
}

// Порядок сверху вниз — как в раскрытом варианте макета (Variant2).
const OPTIONS: { status: RequestStatus; label: string }[] = [
  { status: 'IN_PROGRESS', label: 'В работе' },
  { status: 'COMPLETED', label: 'Выполнено' },
  { status: 'CLOSED', label: 'Закрыта' },
]

// Что показывать на свёрнутой кнопке. Для только что созданной заявки
// (ещё не взята в работу) — карандаш, дальше иконка текущего статуса.
const COLLAPSED_ICON: Record<RequestStatus, string> = {
  CREATED: editIcon,
  IN_PROGRESS: inProgressIcon,
  COMPLETED: completedIcon,
  CLOSED: closedIcon,
}

const STATUS_LABEL: Record<RequestStatus, string> = {
  CREATED: 'Зарегистрирована',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Выполнено',
  CLOSED: 'Закрыта',
}

/**
 * Кнопка смены статуса для диспетчера — по макету: свёрнутая (карандаш или
 * иконка текущего статуса) раскрывается в столбик из трёх статусов.
 * Чистый UI: сам запрос не делает, роль не проверяет — вызывающий код
 * решает, показывать ли компонент (только DISPATCHER) и что делать в onChange.
 */
export function StatusControl({ status, onChange, disabled }: StatusControlProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Закрываем раскрытый список по клику мимо и по Escape.
  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function select(next: RequestStatus) {
    setOpen(false)
    if (next !== status) onChange(next)
  }

  return (
    <div ref={rootRef} className="status-control">
      {open ? (
        <div
          className="status-control__picker"
          style={{ backgroundImage: `url(${pickerBackground})` }}
          role="menu"
        >
          {OPTIONS.map((option) => (
            <button
              key={option.status}
              type="button"
              role="menuitem"
              className="status-control__option"
              aria-label={option.label}
              aria-current={option.status === status}
              onClick={() => select(option.status)}
            />
          ))}
        </div>
      ) : (
        <button
          type="button"
          className="status-control__trigger"
          style={{ backgroundImage: `url(${COLLAPSED_ICON[status]})` }}
          aria-label={`Изменить статус, сейчас: ${STATUS_LABEL[status]}`}
          aria-haspopup="menu"
          aria-expanded={false}
          disabled={disabled}
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  )
}
