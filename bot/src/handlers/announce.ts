import type { Context, FilteredContext } from '@maxhub/max-bot-api'
import { isAdmin } from '../lib/isAdmin.js'
import { getKnownChatIds } from '../lib/subscribers.js'

/**
 * /announce <текст> — рассылает новость (например, об отключении воды) всем
 * известным чатам (личным и групповым), где кто-либо когда-либо писал боту.
 * Список берём из lib/subscribers.ts, а не из GET /chats — этот метод API
 * реально не существует на сервере MAX, см. комментарий в subscribers.ts.
 * Доступно только user_id из ADMIN_USER_IDS (см. bot/.env.example).
 */
export async function handleAnnounceCommand(ctx: FilteredContext<Context, 'message_created'>) {
  const senderId = ctx.message?.sender?.user_id
  if (!isAdmin(senderId)) {
    await ctx.reply('Эта команда доступна только администраторам.')
    return
  }

  const text = ctx.message?.body.text?.replace(/^\/announce\s*/i, '').trim()
  if (!text) {
    await ctx.reply('Использование: /announce текст объявления')
    return
  }

  const targets = getKnownChatIds()
  if (targets.length === 0) {
    await ctx.reply('Пока никто не писал боту — рассылать некому.')
    return
  }

  let sent = 0
  for (const chatId of targets) {
    try {
      await ctx.api.sendMessageToChat(chatId, `📢 ${text}`)
      sent += 1
    } catch (error) {
      console.error(`[announce] не удалось отправить в чат ${chatId}`, error)
    }
  }

  await ctx.reply(`Объявление отправлено в ${sent} из ${targets.length} чатов.`)
}
