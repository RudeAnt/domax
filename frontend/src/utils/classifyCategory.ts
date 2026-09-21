import type { RequestCategory } from '../types/request'

/**
 * Эвристика-заглушка вместо бэкенд-классификатора из плана MVP
 * ("Бот классифицирует категорию"). Подбирает категорию по ключевым
 * словам прямо на фронте, чтобы форму можно было показать и
 * протестировать уже сейчас. Пользователь всегда может переопределить
 * результат вручную — см. CategoryPicker. Заменить на вызов бэкенда,
 * когда там появится реальная классификация.
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
