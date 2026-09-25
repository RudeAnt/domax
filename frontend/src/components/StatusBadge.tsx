import type { RequestStatus } from '../types/request'

const STATUS_LABEL: Record<RequestStatus, string> = {
  CREATED: 'Зарегистрирована',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Выполнено',
  CLOSED: 'Закрыта',
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

