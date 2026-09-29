import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useMaxBackButton } from './hooks/useMaxBackButton'
import { AuthGate } from './lib/AuthGate'
import { getStartParam } from './lib/maxBridge'
import { BrandBar } from './components/BrandBar'
import { SplashScreen, shouldShowSplash } from './components/SplashScreen'
import { HomePage } from './pages/HomePage'
import { NewRequestPage } from './pages/NewRequestPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { NewsPage } from './pages/NewsPage'
import { DevRolePage } from './pages/DevRolePage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RequestsListPage } from './pages/RequestsListPage'
import { DispatcherPage } from './pages/DispatcherPage'
import { PlaygroundPage } from './pages/PlaygroundPage'

function useAdminStartRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    if (getStartParam() === 'admin') {
      navigate('/dispatcher', { replace: true })
    }
  }, [navigate])
}

export function App() {
  useMaxBackButton()
  useAdminStartRedirect()

  const [splash, setSplash] = useState(shouldShowSplash)
  const finishSplash = useCallback(() => setSplash(false), [])

  return (
    <div className="app-shell">
      <BrandBar />
      <AuthGate>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsListPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/dispatcher" element={<DispatcherPage />} />
          {import.meta.env.DEV && <Route path="/dev/playground" element={<PlaygroundPage />} />}
          <Route path="/dev/role" element={<DevRolePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthGate>
      {splash && <SplashScreen onDone={finishSplash} />}
    </div>
  )
}
