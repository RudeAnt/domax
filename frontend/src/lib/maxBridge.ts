/**
 * Тонкая обёртка над window.WebApp, которую в клиенте MAX создаёт
 * скрипт https://st.max.ru/js/max-web-app.js (подключён в index.html).
 *
 * ВАЖНО: имена методов ниже (ready, expand, BackButton, HapticFeedback,
 * initDataUnsafe.user) собраны из публичных упоминаний и примеров кода
 * на dev.max.ru/docs/webapps/bridge — прямой доступ к самой странице
 * был недоступен из этой рабочей среды при написании кода. Перед сдачей
 * сверьте эту обёртку с официальной документацией вручную в браузере:
 * https://dev.max.ru/docs/webapps/bridge
 *
 * Обёртка сознательно defensive: вне клиента MAX (обычный браузер,
 * `npm run dev`) window.WebApp может отсутствовать полностью или частично —
 * ни один вызов отсюда не должен ломать приложение в этом случае.
 */

interface MaxWebAppUser {
  id?: number | string
  name?: string
  avatar?: string
}

interface MaxBackButton {
  show?: () => void
  hide?: () => void
  onClick?: (cb: () => void) => void
  offClick?: (cb: () => void) => void
}

interface MaxHapticFeedback {
  notificationOccurred?: (type: 'success' | 'error' | 'warning') => void
  impactOccurred?: (style?: string) => void
}

interface MaxWebApp {
  ready?: () => void
  expand?: () => void
  close?: () => void
  colorScheme?: 'light' | 'dark'
  initDataUnsafe?: { user?: MaxWebAppUser }
  BackButton?: MaxBackButton
  HapticFeedback?: MaxHapticFeedback
}

declare global {
  interface Window {
    WebApp?: MaxWebApp
  }
}

function getWebApp(): MaxWebApp | undefined {
  return typeof window !== 'undefined' ? window.WebApp : undefined
}

export const isInsideMax = (): boolean => Boolean(getWebApp())

export function initMaxBridge(): void {
  const webApp = getWebApp()
  if (!webApp) return
  try {
    webApp.ready?.()
    webApp.expand?.()
  } catch (error) {
    console.warn('[maxBridge] ready/expand failed', error)
  }
}

export function getCurrentUser(): MaxWebAppUser | undefined {
  return getWebApp()?.initDataUnsafe?.user
}

export function showBackButton(onClick: () => void): void {
  const backButton = getWebApp()?.BackButton
  if (!backButton) return
  try {
    backButton.onClick?.(onClick)
    backButton.show?.()
  } catch (error) {
    console.warn('[maxBridge] showBackButton failed', error)
  }
}

export function hideBackButton(onClick?: () => void): void {
  const backButton = getWebApp()?.BackButton
  if (!backButton) return
  try {
    if (onClick) backButton.offClick?.(onClick)
    backButton.hide?.()
  } catch (error) {
    console.warn('[maxBridge] hideBackButton failed', error)
  }
}

export function notifyHaptic(type: 'success' | 'error' | 'warning'): void {
  try {
    getWebApp()?.HapticFeedback?.notificationOccurred?.(type)
  } catch (error) {
    console.warn('[maxBridge] haptic failed', error)
  }
}
