import type { Context, FilteredContext } from '@maxhub/max-bot-api'
import { buildChatKeyboard, buildDialogKeyboard } from '../keyboards.js'

const DIALOG_WELCOME =
  'Здравствуйте! Я помогу подать заявку в управляющую компанию и покажу нормативный срок её обработки.\n\n' +
  'Нажмите «Подать заявку», чтобы описать проблему, или откройте мини-приложение, чтобы посмотреть все свои заявки.'

const CHAT_WELCOME =
  'Привет! Я бот дома. Если сосед шумит — нажмите кнопку ниже, я анонимно попрошу вести себя потише.'

/** Срабатывает, когда пользователь впервые нажал "Старт" в личном диалоге с ботом. */
export async function handleBotStarted(ctx: FilteredContext<Context, 'bot_started'>) {
  await ctx.reply(DIALOG_WELCOME, { attachments: [buildDialogKeyboard(ctx.user?.user_id)] })
}

/** Срабатывает, когда бота добавили в групповой чат (например, чат подъезда/дома). */
export async function handleBotAddedToChat(ctx: FilteredContext<Context, 'bot_added'>) {
  await ctx.reply(CHAT_WELCOME, { attachments: [buildChatKeyboard()] })
}

/** Ручной /start — например, если пользователь напечатал его в уже открытом диалоге или чате. */
export async function handleStartCommand(ctx: FilteredContext<Context, 'message_created'>) {
  const chatType = ctx.message?.recipient.chat_type

  if (chatType === 'chat') {
    await ctx.reply(CHAT_WELCOME, { attachments: [buildChatKeyboard()] })
    return
  }

  await ctx.reply(DIALOG_WELCOME, {
    attachments: [buildDialogKeyboard(ctx.message?.sender?.user_id)],
  })
}
