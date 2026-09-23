import { Bot } from '@maxhub/max-bot-api'
import { config } from './config.js'
import { handleAnnounceCommand } from './handlers/announce.js'
import { handleDescriptionMessage, handleNewRequestButton } from './handlers/newRequest.js'
import { handleQuietRequest } from './handlers/quiet.js'
import { handleBotAddedToChat, handleBotStarted, handleStartCommand } from './handlers/start.js'
import { startNotifyServer } from './notifyServer.js'

const bot = new Bot(config.botToken)

bot.on('bot_started', handleBotStarted)
bot.on('bot_added', handleBotAddedToChat)
bot.command('start', handleStartCommand)
bot.command('announce', handleAnnounceCommand)

bot.action('new_request', handleNewRequestButton)
bot.action('quiet_request', handleQuietRequest)

// Общий обработчик текста должен идти последним, чтобы не перехватывать
// сообщения раньше команд и callback-кнопок выше.
bot.on('message_created', handleDescriptionMessage)

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
