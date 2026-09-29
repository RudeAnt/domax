import { useEffect, useState } from 'react'
import { devLogin, getRole, getToken, loginWithMax } from './auth'
import { getInitData, isInsideMax } from './maxBridge'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(() => !!getToken())
  const [error, setError] = useState<string | null>(null)

  const insideMax = isInsideMax()

  useEffect(() => {
    if (ready) return

    if (insideMax) {
      const initData = getInitData()
      if (!initData) {
        setError('Не удалось получить initData от MAX Bridge')
        return
      }
      loginWithMax(initData)
        .then(() => setReady(true))
        .catch((e) => setError(e instanceof Error ? e.message : 'Не удалось авторизоваться'))
      return
    }

    devLogin(getRole())
      .then(() => setReady(true))
      .catch((e) => setError(e instanceof Error ? e.message : 'Не удалось авторизоваться'))
  }, [ready, insideMax])

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
