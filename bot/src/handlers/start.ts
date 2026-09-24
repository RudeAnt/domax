import type { Context, FilteredContext } from '@maxhub/max-bot-api'
import { buildChatKeyboard, buildDialogKeyboard } from '../keyboards.js'

const DIALOG_WELCOME =
  'Здравствуйте! Здесь вы будете получать уведомления об изменении статуса ваших заявок в УК ' +
  'и важные новости от дома (например, об отключении воды).\n\n' +
  'Откройте мини-приложение, чтобы подать заявку и посмотреть её статус.'

const CHAT_WELCOME =
  'Привет! Я бот дома. Если сосед шумит — нажмите кнопку ниже, я анонимно попрошу вести себя потише.'

function logUserId(userId: number | undefined | null) {
  if (!userId) return
  // Помогает найти свой user_id, чтобы добавить его в ADMIN_USER_IDS в bot/.env
  console.log(`[start] сообщение от user_id=${userId}`)
}

function replyWithDialogWelcome(ctx: Context, userId: number | undefined | null) {
  const keyboard = buildDialogKeyboard(userId)
  return ctx.reply(DIALOG_WELCOME, keyboard ? { attachments: [keyboard] } : undefined)
}

/** Срабатывает, когда пользователь впервые нажал "Старт" в личном диалоге с ботом. */
export async function handleBotStarted(ctx: FilteredContext<Context, 'bot_started'>) {
  logUserId(ctx.user?.user_id)
  await replyWithDialogWelcome(ctx, ctx.user?.user_id)
}

/** Срабатывает, когда бота добавили в групповой чат (например, чат подъезда/дома). */
export async function handleBotAddedToChat(ctx: FilteredContext<Context, 'bot_added'>) {
  await ctx.reply(CHAT_WELCOME, { attachments: [buildChatKeyboard()] })
}

/** Ручной /start — например, если пользователь напечатал его в уже открытом диалоге или чате. */
export async function handleStartCommand(ctx: FilteredContext<Context, 'message_created'>) {
  const chatType = ctx.message?.recipient.chat_type
  const userId = ctx.message?.sender?.user_id
  logUserId(userId)

  if (chatType === 'chat') {
    await ctx.reply(CHAT_WELCOME, { attachments: [buildChatKeyboard()] })
    return
  }

  await replyWithDialogWelcome(ctx, userId)
}
