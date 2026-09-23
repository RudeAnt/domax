import type { Context, FilteredContext } from '@maxhub/max-bot-api'
import { buildRequestResultKeyboard } from '../keyboards.js'
import { getSlaConfig } from '../data/slaConfig.js'
import { classifyCategory } from '../lib/classifyCategory.js'
import { clearDraft, getDraft, startDraft } from '../lib/requestDrafts.js'

export async function handleNewRequestButton(ctx: FilteredContext<Context, 'message_callback'>) {
  await ctx.answerOnCallback({}).catch(() => {})

  const userId = ctx.user?.user_id
  if (!userId) return

  startDraft(userId)
  await ctx.reply(
    'Опишите проблему одним сообщением, например: «Течёт потолок в ванной». ' +
      'Я определю категорию и покажу нормативный срок реагирования.',
  )
}

/**
 * Общий обработчик текстовых сообщений. Реагирует только если у отправителя
 * есть незавершённый черновик заявки (после handleNewRequestButton) — иначе
 * сразу передаёт управление дальше по цепочке через next(). Должен быть
 * зарегистрирован в index.ts ПОСЛЕ всех command()/action() обработчиков.
 */
export async function handleDescriptionMessage(
  ctx: FilteredContext<Context, 'message_created'>,
  next: () => Promise<void>,
) {
  const userId = ctx.message?.sender?.user_id
  const text = ctx.message?.body.text

  if (!userId || !text || getDraft(userId)?.step !== 'awaiting_description') {
    await next()
    return
  }

  clearDraft(userId)
  const category = classifyCategory(text)
  const sla = getSlaConfig(category)

  await ctx.reply(
    `Категория: ${sla.label}\n` +
      `Нормативный срок: реагирование — ${sla.responseHours} ч, устранение — ${sla.resolutionHours} ч.\n\n` +
      'Чтобы приложить фото, указать адрес и телефон — завершите оформление в мини-приложении:',
    { attachments: [buildRequestResultKeyboard(category)] },
  )
}
