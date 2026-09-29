import { useState } from 'react'
import { devLogin, getRole, setRole, type UserRole } from '../lib/auth'

/**
 * Служебная страница для демонстрации жюри — переключает, под какой ролью
 * открыт мини-апп (RESIDENT/DISPATCHER), без реального входа через MAX.
 * Реальный вход (POST /auth/max) роль не выбирает — её определяет бэк.
 * Не публикуется в навигации приложения, открывается по прямой ссылке
 * /#/dev/role.
 */
export function DevRolePage() {
  const [role, setRoleState] = useState<UserRole>(getRole)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function apply(next: UserRole) {
    setLoading(true)
    setError(null)
    try {
      setRole(next)
      await devLogin(next)
      setRoleState(next)
      window.location.hash = '/'
      window.location.reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось переключить роль')
      setLoading(false)
    }
  }

  return (
    <main className="app-content">
      <h1 className="page-title">Роль (демо)</h1>
      <p className="field-hint">
        Только для показа — переключает роль входа. На реальный вход через MAX не влияет.
      </p>
      <div className="stack" style={{ marginTop: 16, gap: 12 }}>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={loading || role === 'RESIDENT'}
          onClick={() => apply('RESIDENT')}
        >
          Житель{role === 'RESIDENT' ? ' — сейчас так' : ''}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={loading || role === 'DISPATCHER'}
          onClick={() => apply('DISPATCHER')}
        >
          Диспетчер{role === 'DISPATCHER' ? ' — сейчас так' : ''}
        </button>
      </div>
      {error && (
        <p className="form-panel__error" style={{ marginTop: 12 }}>
          {error}
        </p>
      )}
    </main>
  )
}
