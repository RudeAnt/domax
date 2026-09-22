import { Navigate, Route, Routes } from 'react-router-dom'
import { useMaxBackButton } from './hooks/useMaxBackButton'
import { NewRequestPage } from './pages/NewRequestPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { RequestsListPage } from './pages/RequestsListPage'

export function App() {
  useMaxBackButton()

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<RequestsListPage />} />
        <Route path="/new" element={<NewRequestPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
