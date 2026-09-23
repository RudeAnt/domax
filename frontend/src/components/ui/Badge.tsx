import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'info' | 'warning' | 'danger' | 'success'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children: ReactNode
}

const TONE_VARS: Record<BadgeTone, CSSProperties> = {
  neutral: { background: 'var(--color-bg)', color: 'var(--color-text-muted)' },
  info: { background: 'var(--status-registered-bg)', color: 'var(--status-registered-text)' },
  warning: { background: 'var(--color-warning-bg)', color: 'var(--color-warning)' },
  danger: { background: 'var(--color-danger-bg)', color: 'var(--color-danger)' },
  success: { background: 'var(--color-success-bg)', color: 'var(--color-success)' },
}

/**
 * Обобщение .badge из global.css по смысловому "тону", а не по конкретному
 * статусу заявки. StatusBadge и SlaTimer сейчас красят .badge инлайн-стилями
 * напрямую — со временем стоит переключить их на этот компонент
 * (status -> tone, overdue -> 'danger' / 'warning'), не трогал, чтобы не
 * задеть рабочую логику таймера.
 */
export function Badge({ tone = 'neutral', style, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={['badge', className].filter(Boolean).join(' ')}
      style={{ ...TONE_VARS[tone], ...style }}
      {...rest}
    >
      {children}
    </span>
  )
}
