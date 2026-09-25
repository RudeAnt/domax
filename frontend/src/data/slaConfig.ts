import type { RequestCategory } from '../types/request'

export interface CategoryConfig {
  id: RequestCategory
  label: string
}

/**
 * Только человекочитаемые лейблы категорий для UI. Нормативные сроки (SLA)
 * теперь считает и отдаёт бэкенд в поле slaDeadline — дублировать часы здесь
 * больше не нужно, чтобы фронт и бэк не могли разойтись в значениях.
 */
export const CATEGORY_CONFIG: CategoryConfig[] = [
  { id: 'PLUMBING', label: 'Протечка / сантехника' },
  { id: 'ELEVATOR', label: 'Лифт' },
  { id: 'ELECTRICS', label: 'Электрика' },
  { id: 'COMMON_AREA', label: 'Подъезд / двор' },
  { id: 'OTHER', label: 'Иное' },
]

export function getCategoryConfig(category: RequestCategory): CategoryConfig {
  return CATEGORY_CONFIG.find((c) => c.id === category) ?? CATEGORY_CONFIG[CATEGORY_CONFIG.length - 1]
}

