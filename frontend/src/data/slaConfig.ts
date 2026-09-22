import type { RequestCategory } from '../types/request'

export interface SlaCategoryConfig {
  id: RequestCategory
  label: string
  /** За сколько часов УК обязана среагировать (первый ответ) */
  responseHours: number
  /** За сколько часов от подачи заявка должна быть закрыта */
  resolutionHours: number
}

/**
 * ТЕСТОВЫЕ ДАННЫЕ. Ориентир — категории нормативных сроков из
 * Постановления Правительства РФ №290, но конкретные часы здесь —
 * плейсхолдер для демонстрации механики SLA-таймера на MVP (см. план,
 * раздел 5: "SLA-таймер по нормативному справочнику (тестовые данные,
 * явно помечено)"). Перед защитой сверить точные значения по категориям
 * и типам домов с первоисточником и/или юристом команды.
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
