import { createServer } from 'node:http'
import type { Api } from '@maxhub/max-bot-api'
import { config } from './config.js'

interface NotifyPayload {
  userId: number
  text: string
}

/**
 * Внутренний HTTP-эндпоинт для бэкенда: когда статус заявки меняется,
 * бэкенд вызывает POST http://<адрес бота>:<NOTIFY_PORT>/notify с заголовком
 * X-Notify-Secret и телом { userId, text }, чтобы бот прислал пользователю
 * уведомление в MAX (план проекта, раздел 4 — "После создания заявки —
 * уведомления в чат при смене статуса").
 *
 * ЕЩЁ НЕ ПОДКЛЮЧЕНО К БЭКЕНДУ: модель заявки в backend/ пока не хранит
 * max user_id заявителя, а без него некому слать уведомление. Нужно:
 * 1) на фронте/в боте передавать max user_id при создании заявки,
 * 2) в backend/ сохранить его в заявке,
 * 3) при смене статуса backend делает POST сюда.
 * Эндпоинт уже готов принять такой вызов, когда это будет сделано.
 */
export function startNotifyServer(api: Api): void {
  const server = createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/notify') {
      res.writeHead(404).end()
      return
    }

    if (req.headers['x-notify-secret'] !== config.notifySecret) {
      res.writeHead(401).end()
      return
    }

    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      void (async () => {
        try {
          const payload = JSON.parse(body) as Partial<NotifyPayload>
          if (!payload.userId || !payload.text) {
            res.writeHead(400).end()
            return
          }
          await api.sendMessageToUser(payload.userId, payload.text)
          res.writeHead(200).end()
        } catch (error) {
          console.error('[notifyServer] ошибка обработки запроса', error)
          res.writeHead(500).end()
        }
      })()
    })
  })

  server.listen(config.notifyPort, () => {
    console.log(`[notifyServer] слушает на порту ${config.notifyPort}`)
  })
}
