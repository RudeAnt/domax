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
  PLUMBING: ['течь', 'протеч', 'залив', 'капает', 'вода с потолка', 'труба'],
  ELEVATOR: ['лифт', 'застрял', 'кабина'],
  ELECTRICS: ['свет', 'электрич', 'проводк', 'розетк', 'щиток', 'искр'],
  COMMON_AREA: ['подъезд', 'двор', 'домофон', 'мусор', 'лестниц'],
  OTHER: [],
}

export function classifyCategory(description: string): RequestCategory {
  const text = description.toLowerCase()
  for (const category of Object.keys(KEYWORDS) as RequestCategory[]) {
    if (category === 'OTHER') continue
    if (KEYWORDS[category].some((keyword) => text.includes(keyword))) {
      return category
    }
  }
  return 'OTHER'
}

