import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { initMaxBridge } from './lib/maxBridge'
import './styles/tokens.css'
import './styles/global.css'

// HashRouter, а не BrowserRouter: мини-апп раздаётся как статика без
// гарантированного server-side fallback на index.html (см. стратегию,
// раздел 8 — "выложить фронтенд на статический хостинг"), поэтому роуты
// вида /requests/123 не должны зависеть от настройки хостинга.
initMaxBridge()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaxUI>
      <HashRouter>
        <App />
      </HashRouter>
    </MaxUI>
  </StrictMode>,
)
