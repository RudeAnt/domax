import { Bot } from '@maxhub/max-bot-api'
import { config } from './config.js'

/**
 * npm run whoami — узнать юзернейм и user_id бота по токену из .env.
 * Эквивалент curl-запроса из FAQ организаторов:
 *   curl -X GET "https://platform-api2.max.ru/me" -H "Authorization: <токен>"
 */
const bot = new Bot(config.botToken)

bot.api
  .getMyInfo()
  .then((info) => {
    console.log('Юзернейм бота:', info.username)
    console.log('user_id бота:', info.user_id)
    console.log('Полный ответ:', info)
  })
  .catch((error) => {
    console.error(
      'Не удалось получить информацию о боте — проверьте BOT_TOKEN в .env и доступ к сети:',
      error,
    )
  })
  .finally(() => process.exit())
