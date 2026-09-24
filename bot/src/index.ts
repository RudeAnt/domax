import { Bot } from '@maxhub/max-bot-api'
import { config } from './config.js'
import { handleAnnounceCommand } from './handlers/announce.js'
import { handleQuietRequest } from './handlers/quiet.js'
import { handleBotAddedToChat, handleBotStarted, handleStartCommand } from './handlers/start.js'
import { registerChat } from './lib/subscribers.js'
import { startNotifyServer } from './notifyServer.js'

const bot = new Bot(config.botToken)

// Запоминаем chat_id каждого, кто как-либо взаимодействовал с ботом — это
// список рассылки для /announce (см. handlers/announce.ts и lib/subscribers.ts
// про то, почему не используется официальный метод "список всех чатов").
// Должно идти ПЕРВЫМ в цепочке, чтобы отработать для любого события.
bot.on(['bot_started', 'bot_added', 'message_created', 'message_callback'], (ctx, next) => {
  registerChat(ctx.chatId)
  return next()
})

bot.on('bot_started', handleBotStarted)
bot.on('bot_added', handleBotAddedToChat)
bot.command('start', handleStartCommand)
// Строковый триггер требует ТОЧНОГО совпадения всей команды (см.
// normalizeTrigger в @maxhub/max-bot-api) — "/announce текст" не совпал бы
// с 'announce'. Регулярное выражение matches "/announce" и "/announce ...".
bot.command(/^announce/, handleAnnounceCommand)

bot.action('quiet_request', handleQuietRequest)

bot.catch((error, ctx) => {
  console.error('[bot] необработанная ошибка', error, { updateType: ctx.updateType })
})

startNotifyServer(bot.api)

bot.api
  .setMyCommands([
    { name: 'start', description: 'Начать / показать меню' },
    { name: 'announce', description: 'Разослать объявление (для администраторов)' },
  ])
  .catch((error) => console.error('[bot] не удалось установить команды', error))

bot.start({ mode: 'polling' }).then(() => {
  console.log('Бот запущен (long polling)')
})
