import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  showBack?: boolean
}

export function PageHeader({ title, showBack = false }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="app-topbar">
      {showBack && (
        <button
          type="button"
          className="app-topbar__back"
          onClick={() => navigate(-1)}
          aria-label="Назад"
        >
          ←
        </button>
      )}
      <h1>{title}</h1>
    </header>
  )
}
