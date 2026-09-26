import { Navigate, Route, Routes } from 'react-router-dom'
import { useMaxBackButton } from './hooks/useMaxBackButton'
import { AuthGate } from './lib/AuthGate'
import { HomePage } from './pages/HomePage'
import { BrandBar } from './components/BrandBar'
import { NewRequestPage } from './pages/NewRequestPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RequestsListPage } from './pages/RequestsListPage'
import { PlaygroundPage } from './pages/PlaygroundPage'

export function App() {
  useMaxBackButton()

  return (
    <div className="app-shell">
      <BrandBar />
      <AuthGate>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsListPage />} />
          <Route path="/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<RequestDetailPage />} />
          <Route path="/dev/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthGate>
    </div>
  )
}

