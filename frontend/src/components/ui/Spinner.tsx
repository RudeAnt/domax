interface SpinnerProps {
  size?: number
  className?: string
}

/**
 * Индикатор загрузки. Сейчас нигде в приложении не показывается состояние
 * "идёт запрос" (HttpRequestsApi делает реальные fetch-запросы к бэку) —
 * этот компонент закрывает дыру: используйте в списке заявок, на кнопке
 * отправки формы (см. Button loading) и т.д.
 */
export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <span
      className={['spinner', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Загрузка"
    />
  )
}
