import type { RequestCategory } from '../data/slaConfig.js'

/**
 * Дублирует frontend/src/utils/classifyCategory.ts — та же эвристика по
 * ключевым словам, чтобы бот и мини-апп классифицировали одинаково.
 * Заменить на общий вызов бэкенд-классификатора, когда он появится.
 */
const KEYWORDS: Record<RequestCategory, string[]> = {
  leak: ['течь', 'протеч', 'залив', 'капает', 'вода с потолка', 'труба'],
  elevator: ['лифт', 'застрял', 'кабина'],
  electricity: ['свет', 'электрич', 'проводк', 'розетк', 'щиток', 'искр'],
  heating: ['отоплен', 'батаре', 'радиатор', 'холодно', 'не топят'],
  other: [],
}

export function classifyCategory(description: string): RequestCategory {
  const text = description.toLowerCase()
  for (const category of Object.keys(KEYWORDS) as RequestCategory[]) {
    if (category === 'other') continue
    if (KEYWORDS[category].some((keyword) => text.includes(keyword))) {
      return category
    }
  }
  return 'other'
}
