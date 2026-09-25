import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestsApi } from '../api/requestsApi'
import { PageHeader } from '../components/PageHeader'
import { SlaTimer } from '../components/SlaTimer'
import { StatusBadge } from '../components/StatusBadge'
import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { ServiceRequest } from '../types/request'
import { isOverdue } from '../utils/sla'

/**
 * Шаблон обращения при просрочке — раздел 4 плана: "кнопка «Что делать» →
 * шаблон обращения в жилищную инспекцию/ГИС ЖКХ". Пока просто текст для
 * копирования, без реальной интеграции (она в Won't на этом MVP).
 */
function buildEscalationTemplate(request: ServiceRequest): string {
  const category = CATEGORY_CONFIG.find((c) => c.id === request.category)?.label ?? request.category
  return [
    'Обращение в жилищную инспекцию / ГИС ЖКХ',
    '',
    `Категория: ${category}`,
    `Адрес: ${request.address}`,
    `Описание проблемы: ${request.description}`,
    `Заявка подана: ${new Date(request.createdAt).toLocaleString('ru-RU')}`,
    'Нормативный срок устранения нарушен, ответ от управляющей организации отсутствует.',
    'Прошу принять меры в соответствии с Постановлением Правительства РФ №290.',
  ].join('\n')
}

export function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<ServiceRequest | null | undefined>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    requestsApi.get(id).then((data) => {
      if (!cancelled) setRequest(data ?? undefined)
    })
    return () => {
      cancelled = true
    }
  }, [id])

  async function handleCopyTemplate() {
    if (!request) return
    try {
      await navigator.clipboard.writeText(buildEscalationTemplate(request))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API может быть недоступен вне HTTPS/разрешений — просто
      // не показываем "скопировано", шаблон всё равно виден на экране.
    }
  }

  if (request === null) {
    return (
      <>
        <PageHeader title="Заявка" showBack />
        <main className="app-content">
          <p className="field-hint">Загрузка…</p>
        </main>
      </>
    )
  }

  if (!request) {
    return (
      <>
        <PageHeader title="Заявка" showBack />
        <main className="app-content">
          <div className="empty-state">Заявка не найдена</div>
        </main>
      </>
    )
  }

  const overdue = isOverdue(request)
  const categoryLabel = CATEGORY_CONFIG.find((c) => c.id === request.category)?.label

  return (
    <>
      <PageHeader title={categoryLabel ?? 'Заявка'} showBack />
      <main className="app-content stack">
        <div className="card stack" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <StatusBadge status={request.status} />
            <SlaTimer request={request} />
          </div>
          <p style={{ margin: 0 }}>{request.description}</p>
          <dl style={{ margin: 0, display: 'grid', gap: 4 }}>
            <div>
              <dt className="field-hint">Адрес</dt>
              <dd style={{ margin: 0 }}>{request.address}</dd>
            </div>
            <div>
              <dt className="field-hint">Заявитель</dt>
              <dd style={{ margin: 0 }}>{request.author.fullName}</dd>
            </div>
            {request.assignee && (
              <div>
                <dt className="field-hint">Исполнитель</dt>
                <dd style={{ margin: 0 }}>{request.assignee.fullName}</dd>
              </div>
            )}
            <div>
              <dt className="field-hint">Подана</dt>
              <dd style={{ margin: 0 }}>
                {new Date(request.createdAt).toLocaleString('ru-RU')}
              </dd>
            </div>
          </dl>
          {request.photoUrl && (
            <img
              src={request.photoUrl}
              alt="Фото к заявке"
              style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)' }}
            />
          )}
        </div>

        {overdue && (
          <div className="card stack" style={{ padding: 16, borderColor: 'var(--color-danger)' }}>
            <strong style={{ color: 'var(--color-danger)' }}>Срок реагирования нарушен</strong>
            <p className="field-hint" style={{ margin: 0 }}>
              Можно направить обращение в жилищную инспекцию / ГИС ЖКХ. Ниже — готовый текст,
              его можно скопировать и отправить.
            </p>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                background: 'var(--color-bg)',
                padding: 12,
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                margin: 0,
              }}
            >
              {buildEscalationTemplate(request)}
            </pre>
            <button type="button" className="btn btn-secondary" onClick={handleCopyTemplate}>
              {copied ? 'Скопировано' : 'Скопировать текст'}
            </button>
          </div>
        )}
      </main>
    </>
  )
}

