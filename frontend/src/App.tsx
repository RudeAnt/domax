import { useCallback, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useMaxBackButton } from './hooks/useMaxBackButton'
import { AuthGate } from './lib/AuthGate'
import { BrandBar } from './components/BrandBar'
import { SplashScreen, shouldShowSplash } from './components/SplashScreen'
import { HomePage } from './pages/HomePage'
import { NewRequestPage } from './pages/NewRequestPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RequestsListPage } from './pages/RequestsListPage'
import { PlaygroundPage } from './pages/PlaygroundPage'

export function App() {
  useMaxBackButton()
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
          <Route path="/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/dev/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthGate>
      {splash && <SplashScreen onDone={finishSplash} />}
    </div>
  )
}
