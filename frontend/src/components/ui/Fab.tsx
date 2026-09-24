import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

/** Обёртка над .fab (уже есть в global.css) — плавающая кнопка добавления заявки. */
export function Fab({ className, children, type = 'button', ...rest }: FabProps) {
  return (
    <button type={type} className={['fab', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  )
}
