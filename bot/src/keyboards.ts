import { Keyboard } from '@maxhub/max-bot-api'
import { config } from './config.js'
import { isAdmin } from './lib/isAdmin.js'

export function buildDialogKeyboard(userId: number | undefined | null) {
  const rows = [
    [Keyboard.button.callback('📝 Подать заявку', 'new_request')],
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

export function buildRequestResultKeyboard(category: string) {
  return Keyboard.inlineKeyboard([
    [
      Keyboard.button.openApp(
        'Оформить заявку в мини-приложении',
        config.miniAppUrl,
        undefined,
        category,
      ),
    ],
  ])
}
