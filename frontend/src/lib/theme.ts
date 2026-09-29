const KEY = 'domax.theme'

export type Theme = 'light' | 'dark'

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function apply(theme: Theme | null) {
  const root = document.documentElement
  if (theme) root.dataset.theme = theme
  else delete root.dataset.theme
}

/** Тема, которая реально отображается сейчас: выбор пользователя или настройка ОС. */
export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Применяет сохранённый выбор пользователя; без выбора остаётся тема ОС. */
export function initTheme() {
  apply(readStored())
}

/** Кнопка «луна»: переключает тему и запоминает выбор. */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // хранилище недоступно — тема переключится, но не запомнится
  }
  apply(next)
  return next
}
