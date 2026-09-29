import { useEffect, useState } from 'react'
import { devLogin, getToken, loginWithMax, type UserRole } from './auth'
import { getInitData, isInsideMax } from './maxBridge'
import { Button } from '../components/ui/Button'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(() => !!getToken())
  const [error, setError] = useState<string | null>(null)
  // Только для входа вне MAX — пока идёт запрос к dev-login после выбора роли.
  const [loggingInAs, setLoggingInAs] = useState<UserRole | null>(null)

  const insideMax = isInsideMax()

  useEffect(() => {
    if (ready || !insideMax) return

    // Внутри клиента MAX — единственный сценарий: настоящий вход по
    // подписанной initData, без выбора роли (роль приходит с бэка).
    const initData = getInitData()
    if (!initData) {
      setError('Не удалось получить initData от MAX Bridge')
      return
    }
    loginWithMax(initData)
      .then(() => setReady(true))
      .catch((e) => setError(e instanceof Error ? e.message : 'Не удалось авторизоваться'))
  }, [ready, insideMax])

  // Вне MAX (обычный браузер, локальная разработка/демо) — dev-логин под
  // выбранной ролью, чтобы можно было проверить и жителя, и диспетчера,
  // не выходя в реальный MAX. По просьбе Георгия: роль на бэке уже
  // полностью поддержана (devLogin(role)), фронт раньше жёстко слал RESIDENT.
  async function handleDevLogin(role: UserRole) {
    setLoggingInAs(role)
    setError(null)
    try {
      await devLogin(role)
      setReady(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось авторизоваться')
    } finally {
      setLoggingInAs(null)
    }
  }

  if (error) {
    return (
      <main className="app-content">
        <div className="empty-state">
          <p>Не удалось подключиться к серверу</p>
          <p className="field-hint">{error}</p>
        </div>
      </main>
    )
  }

  if (!ready) {
    if (insideMax) {
      return (
        <main className="app-content">
          <p className="field-hint">Загрузка…</p>
        </main>
      )
    }

    return (
      <main className="app-content stack">
        <p className="field-hint">Вход вне MAX (для разработки/демо) — выберите роль:</p>
        <Button
          variant="primary"
          loading={loggingInAs === 'RESIDENT'}
          disabled={loggingInAs !== null}
          onClick={() => handleDevLogin('RESIDENT')}
        >
          Войти как житель
        </Button>
        <Button
          variant="secondary"
          loading={loggingInAs === 'DISPATCHER'}
          disabled={loggingInAs !== null}
          onClick={() => handleDevLogin('DISPATCHER')}
        >
          Войти как диспетчер
        </Button>
      </main>
    )
  }

  return <>{children}</>
}

