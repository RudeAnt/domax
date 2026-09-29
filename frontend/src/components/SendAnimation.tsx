import { useEffect, useState } from 'react'
import closedFrame from '../assets/envelope/closed.png'
import letterFrame from '../assets/envelope/letter.png'
import openFrame from '../assets/envelope/open.png'

// Открытый конверт → письмо ложится внутрь → конверт закрывается.
const FRAMES = [openFrame, letterFrame, closedFrame]
const STEP_MS = [0, 350, 750]

/** Сколько минимум держим анимацию на экране, чтобы её успели увидеть. */
export const SEND_ANIMATION_MS = 1300

export function SendAnimation() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timers = STEP_MS.slice(1).map((delay, i) => setTimeout(() => setFrame(i + 1), delay))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="send-anim" role="status" aria-label="Отправляем заявку">
      <img src={FRAMES[frame]} alt="" width={208} height={200} />
    </div>
  )
}
