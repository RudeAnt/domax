import { Link } from 'react-router-dom'

interface TileLinkProps {
  to: string
  icon: string
  label: string
  /** Светлая плитка (колокольчик/домик справа вверху), а не тёмная нижней панели. */
  soft?: boolean
}

/** Плитка-ссылка 51×41 с белой иконкой из макета. */
export function TileLink({ to, icon, label, soft }: TileLinkProps) {
  return (
    <Link
      to={to}
      className={['tile-btn', soft && 'tile-btn--soft'].filter(Boolean).join(' ')}
      aria-label={label}
    >
      <img src={icon} alt="" width={51} height={41} />
    </Link>
  )
}
