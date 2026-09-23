import type { Context, FilteredContext } from '@maxhub/max-bot-api'

const QUIET_MESSAGE =
  '🤫 Один из соседей попросил вести себя потише. Пожалуйста, отнеситесь с пониманием — спасибо!'

/**
 * Сообщение уходит в тот же чат анонимно — не указывает, кто нажал кнопку.
 * Антиспам/ограничение частоты нажатий на MVP не реализованы, при желании
 * можно добавить (например, не чаще раза в 30 минут на чат).
 */
export async function handleQuietRequest(ctx: FilteredContext<Context, 'message_callback'>) {
  await ctx.answerOnCallback({}).catch(() => {})
  await ctx.reply(QUIET_MESSAGE)
}
