import { useEffect, useState } from 'react'
import { devLogin, getToken, loginWithMax } from './auth'
import { getInitData, isInsideMax } from './maxBridge'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(() => !!getToken())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (ready) return

    // Внутри клиента MAX — настоящий вход по подписанной initData.
    // Вне MAX (обычный браузер, локальная разработка) — dev-логин, чтобы
    // не блокировать разработку без доступа к реальному MAX-окружению.
    const initData = isInsideMax() ? getInitData() : undefined
    const login = initData ? () => loginWithMax(initData) : () => devLogin('RESIDENT')

    login()
      .then(() => setReady(true))
      .catch((e) => setError(e instanceof Error ? e.message : 'Не удалось авторизоваться'))
  }, [ready])

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
    return (
      <main className="app-content">
        <p className="field-hint">Загрузка…</p>
      </main>
    )
  }

  return <>{children}</>
}

