import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useMaxBackButton } from './hooks/useMaxBackButton'
import { AuthGate } from './lib/AuthGate'
import { getStartParam } from './lib/maxBridge'
import { HomePage } from './pages/HomePage'
import { BrandBar } from './components/BrandBar'
import { DispatcherPage } from './pages/DispatcherPage'
import { NewRequestPage } from './pages/NewRequestPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RequestsListPage } from './pages/RequestsListPage'
import { PlaygroundPage } from './pages/PlaygroundPage'

/**
 * Кнопка "Панель администратора" в боте открывает мини-апп с payload=admin
 * (bot/src/keyboards.ts) — при запуске сразу уводим на /dispatcher.
 * Срабатывает один раз на старте приложения, а не на каждой навигации.
 */
function useAdminStartRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    if (getStartParam() === 'admin') {
      navigate('/dispatcher', { replace: true })
    }
  }, [])
}

export function App() {
  useMaxBackButton()
  useAdminStartRedirect()

  return (
    <div className="app-shell">
      <BrandBar />
      <AuthGate>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsListPage />} />
          <Route path="/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/dispatcher" element={<DispatcherPage />} />
          <Route path="/dev/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthGate>
    </div>
  )
}

