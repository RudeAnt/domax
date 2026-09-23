import 'dotenv/config'

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Переменная окружения ${name} не задана — см. bot/.env.example`)
  }
  return value
}

export const config = {
  botToken: required('BOT_TOKEN'),
  /**
   * НЕ ПРОВЕРЕНО по первоисточнику: судя по PR, добавившему openApp-кнопку в
   * официальный клиент (github.com/max-messenger/max-bot-api-client-ts/pull/222),
   * это "ссылка на мини-приложение бота" — предположительно тот же публичный
   * HTTPS-адрес, что вы отправляете организаторам через форму сбора ссылок,
   * либо deep-link вида https://max.ru/<botUsername>?startapp=... Однозначно
   * не подтверждено — dev.max.ru был недоступен из рабочей среды при
   * написании кода. Проверить в официальной документации или спросить в
   * канале участников хакатона, прежде чем полагаться на кнопку на защите.
   */
  miniAppUrl: process.env.MINI_APP_URL ?? '',
  adminUserIds: (process.env.ADMIN_USER_IDS ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .map(Number),
  notifyPort: Number(process.env.NOTIFY_PORT ?? 8081),
  notifySecret: process.env.NOTIFY_SECRET ?? '',
}
