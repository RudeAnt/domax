import { Keyboard } from '@maxhub/max-bot-api'
import { config } from './config.js'
import { isAdmin } from './lib/isAdmin.js'

const hasMiniAppUrl = () => config.miniAppUrl.trim().length > 0

/**
 * Кнопка openApp с пустой/некорректной ссылкой ломает отправку ВСЕГО
 * сообщения (сервер MAX отвечает 404 "common.finder"), поэтому пока
 * MINI_APP_URL не заполнен — просто не показываем эти кнопки.
 * Возвращает undefined, если показывать нечего — тогда сообщение уходит без клавиатуры.
 */
export function buildDialogKeyboard(userId: number | undefined | null) {
  if (!hasMiniAppUrl()) return undefined

  const rows: Parameters<typeof Keyboard.inlineKeyboard>[0] = [
    [Keyboard.button.openApp('📱 Открыть мини-приложение', config.miniAppUrl)],
  ]

  if (isAdmin(userId)) {
    rows.push([
      Keyboard.button.openApp('🛠 Панель администратора', config.miniAppUrl, undefined, 'admin'),
    ])
  }

  return Keyboard.inlineKeyboard(rows)
}

export function buildChatKeyboard() {
  return Keyboard.inlineKeyboard([
    [Keyboard.button.callback('🤫 Попросить соседей потише', 'quiet_request')],
  ])
}
