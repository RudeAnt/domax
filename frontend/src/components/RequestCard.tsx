import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryConfig } from '../data/slaConfig'
import type { ServiceRequest } from '../types/request'
import { SlaTimer } from './SlaTimer'

interface RequestCardProps {
  request: ServiceRequest
  /** Кнопка в правом верхнем углу — например StatusControl для диспетчера. */
  action?: ReactNode
}

function formatPlace(request: ServiceRequest): string {
  return [
    request.entrance ? `Подъезд №${request.entrance}` : null,
    request.floor ? `${request.floor} этаж` : null,
  ]
    .filter(Boolean)
    .join(', ')
}

/**
 * Карточка заявки как в макете: тема, серым место («Подъезд №2, 3 этаж»),
 * описание с обрезкой. SLA-таймер оставлен мелкой строкой внизу — в макете
 * его нет, но это ключевая фича продукта; убирается одной строкой ниже.
 */
export function RequestCard({ request, action }: RequestCardProps) {
  const place = formatPlace(request)
  // Таймер до срока имеет смысл, пока работа не выполнена.
  const showSla = request.status === 'CREATED' || request.status === 'IN_PROGRESS'
  const title = request.title || getCategoryConfig(request.category).label

  return (
    <article className="request-card">
      <Link to={`/requests/${request.id}`} className="request-card__link">
        <h3 className="request-card__title">{title}</h3>
        {place && <p className="request-card__place">{place}</p>}
        <p className="request-card__text">{request.description}</p>
        {showSla && (
          <div className="request-card__meta">
            <SlaTimer request={request} />
          </div>
        )}
      </Link>
      {action && <div className="request-card__action">{action}</div>}
    </article>
  )
}
