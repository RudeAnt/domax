import { useEffect, useState } from 'react'
import frame1 from '../assets/brand/splash-1.png'
import frame2 from '../assets/brand/splash-2.png'
import frame3 from '../assets/brand/splash-3.png'
import frame4 from '../assets/brand/splash-4.png'

const FRAMES = [frame1, frame2, frame3, frame4]
const FLAG = 'domax.splashSeen'

/** Заставку показываем один раз за сессию и не показываем при «уменьшить движение». */
export function shouldShowSplash(): boolean {
  try {
    if (sessionStorage.getItem(FLAG)) return false
  } catch {
    // sessionStorage недоступен — просто покажем
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Кадры из макета: окошко → два окошка → сдвиг влево → появляется «MAX»,
// затем снизу поднимается градиент и заставка растворяется.
const FRAME_AT = [0, 350, 700, 1050]
const GRADIENT_AT = 1050
const FADE_AT = 2000
const DONE_AT = 2350

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [frame, setFrame] = useState(0)
  const [gradient, setGradient] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(FLAG, '1')
    } catch {
      // не критично
    }
    const timers = [
      ...FRAME_AT.slice(1).map((at, i) => setTimeout(() => setFrame(i + 1), at)),
      setTimeout(() => setGradient(true), GRADIENT_AT),
      setTimeout(() => setFading(true), FADE_AT),
      setTimeout(onDone, DONE_AT),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      className={['splash', fading && 'splash--fading'].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div className="splash__bar">DOМАКС</div>
      <div className={['splash__gradient', gradient && 'splash__gradient--on'].filter(Boolean).join(' ')} />
      <img className="splash__logo" src={FRAMES[frame]} alt="" width={202} height={80} />
    </div>
  )
}
