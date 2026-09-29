import { useState } from 'react'
import envelopeIcon from '../assets/nav/envelope.png'
import homeIcon from '../assets/nav/home.png'
import moonIcon from '../assets/nav/moon.png'
import plusIcon from '../assets/nav/plus.png'
import { currentTheme, toggleTheme } from '../lib/theme'
import { TileLink } from './TileLink'

interface BottomNavProps {
  /** Левая кнопка: «домой» на экранах внутри приложения, «конверт» (к заявкам) на главной и в уведомлениях. */
  left: 'home' | 'requests'
}

/**
 * Плавающая нижняя панель из макета: [домой/конверт] [+] [луна].
 * Конверт ведёт к списку заявок, плюс — к форме новой заявки, луна
 * переключает тему.
 */
export function BottomNav({ left }: BottomNavProps) {
  const [theme, setTheme] = useState(currentTheme)

  return (
    <nav className="bottom-nav" aria-label="Навигация">
      {left === 'home' ? (
        <TileLink to="/" icon={homeIcon} label="Главная" />
      ) : (
        <TileLink to="/requests" icon={envelopeIcon} label="Мои заявки" />
      )}
      <TileLink to="/new" icon={plusIcon} label="Новая заявка" />
      <button
        type="button"
        className="tile-btn"
        aria-label="Тёмная тема"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme(toggleTheme())}
      >
        <img src={moonIcon} alt="" width={51} height={41} />
      </button>
    </nav>
  )
}
