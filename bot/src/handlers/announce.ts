import type { Context, FilteredContext } from '@maxhub/max-bot-api'
import { getAllBotChats } from '../lib/getAllBotChats.js'
import { isAdmin } from '../lib/isAdmin.js'

/**
 * /announce <текст> — рассылает новость/объявление (например, об отключении
 * воды) во все групповые чаты, где состоит бот. Личные диалоги сознательно
 * не рассылаем — иначе это выглядит как спам конкретным людям без их запроса.
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

  const chats = await getAllBotChats(ctx.api)
  const targets = chats.filter((chat) => chat.type === 'chat')

  let sent = 0
  for (const chat of targets) {
    try {
      await ctx.api.sendMessageToChat(chat.chat_id, `📢 ${text}`)
      sent += 1
    } catch (error) {
      console.error(`[announce] не удалось отправить в чат ${chat.chat_id}`, error)
    }
  }

  await ctx.reply(`Объявление отправлено в ${sent} из ${targets.length} чатов.`)
}
