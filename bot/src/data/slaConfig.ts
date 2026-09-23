export type RequestCategory = 'leak' | 'elevator' | 'electricity' | 'heating' | 'other'

export interface SlaCategoryConfig {
  id: RequestCategory
  label: string
  responseHours: number
  resolutionHours: number
}

/**
 * Дублирует frontend/src/data/slaConfig.ts. На хакатоне нет времени выносить
 * общий пакет между bot/ и frontend/, поэтому справочник поддерживается
 * вручную в двух местах — если меняете один, поменяйте и второй.
 * ТЕСТОВЫЕ ДАННЫЕ, подробности и источник см. в комментарии frontend-версии.
 */
export const SLA_CONFIG: SlaCategoryConfig[] = [
  { id: 'leak', label: 'Протечка', responseHours: 2, resolutionHours: 72 },
  { id: 'elevator', label: 'Лифт', responseHours: 2, resolutionHours: 24 },
  { id: 'electricity', label: 'Электрика', responseHours: 2, resolutionHours: 24 },
  { id: 'heating', label: 'Отопление', responseHours: 4, resolutionHours: 24 },
  { id: 'other', label: 'Иное', responseHours: 24, resolutionHours: 240 },
]

export function getSlaConfig(category: RequestCategory): SlaCategoryConfig {
  return SLA_CONFIG.find((c) => c.id === category) ?? SLA_CONFIG[SLA_CONFIG.length - 1]
}
