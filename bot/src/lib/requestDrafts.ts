export type DraftStep = 'awaiting_description'

export interface RequestDraft {
  step: DraftStep
}

/**
 * Простое in-memory состояние диалога "подать заявку" на пользователя.
 * Живёт, пока жив процесс бота — для хакатона этого достаточно (бот
 * отвечает только за короткий шаг "опишите проблему", полная форма —
 * в мини-приложении, см. план проекта, раздел 4).
 * Не переживёт перезапуск процесса и не масштабируется на несколько
 * инстансов бота — если понадобится, заменить на встроенный session()
 * из @maxhub/max-bot-api с внешним store (Redis и т.п.).
 */
const drafts = new Map<number, RequestDraft>()

export function startDraft(userId: number): void {
  drafts.set(userId, { step: 'awaiting_description' })
}

export function getDraft(userId: number): RequestDraft | undefined {
  return drafts.get(userId)
}

export function clearDraft(userId: number): void {
  drafts.delete(userId)
}
