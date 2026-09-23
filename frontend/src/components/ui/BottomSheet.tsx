import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from './IconButton'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

/**
 * Модалка в виде шторки снизу — привычнее на смартфоне, чем центральный
 * попап. Рендерится через портал в document.body, чтобы не зависеть от
 * overflow/position родителя. В проекте пока нигде не используется, но
 * понадобится для будущих экранов (подтверждение действия, детали SLA
 * и т.п.) — на этом же паттерне.
 */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="sheet-overlay" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet__handle" aria-hidden="true" />
        {title ? (
          <div className="sheet__header">
            <h2 className="sheet__title">{title}</h2>
            <IconButton aria-label="Закрыть" onClick={onClose}>
              ✕
            </IconButton>
          </div>
        ) : null}
        <div className="sheet__content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
