import type { RequestStatus } from '../types/request'

const STATUS_LABEL: Record<RequestStatus, string> = {
  registered: 'Зарегистрирована',
  in_progress: 'В работе',
  closed: 'Закрыта',
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className="badge"
      style={{
        background: `var(--status-${status}-bg)`,
        color: `var(--status-${status}-text)`,
      }}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
