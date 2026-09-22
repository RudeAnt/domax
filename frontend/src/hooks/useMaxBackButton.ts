import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { hideBackButton, showBackButton } from '../lib/maxBridge'

/** Показывает нативный BackButton клиента MAX на всех экранах, кроме корня. */
export function useMaxBackButton() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      hideBackButton()
      return
    }

    const goBack = () => navigate(-1)
    showBackButton(goBack)
    return () => hideBackButton(goBack)
  }, [location.pathname, navigate])
}
