import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Обязателен — у кнопки нет текста, aria-label заменяет его для скринридеров. */
  'aria-label': string
  children: ReactNode
}

/**
 * Квадратная кнопка под одну иконку/символ (закрыть шторку, удалить фото,
 * "назад" в шапке и т.п.). Минимум 44x44 — тач-таргет для смартфона.
 */
export function IconButton({ className, children, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} className={['icon-btn', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  )
}
