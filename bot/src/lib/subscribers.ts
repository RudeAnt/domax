import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const STORE_PATH = join(currentDir, '..', '..', 'data', 'subscribers.json')

function loadChatIds(): Set<number> {
  try {
    if (!existsSync(STORE_PATH)) return new Set()
    const raw = readFileSync(STORE_PATH, 'utf-8')
    return new Set(JSON.parse(raw) as number[])
  } catch (error) {
    console.error('[subscribers] не удалось прочитать сохранённый список чатов', error)
    return new Set()
  }
}

const chatIds = loadChatIds()

function persist(): void {
  try {
    mkdirSync(dirname(STORE_PATH), { recursive: true })
    writeFileSync(STORE_PATH, JSON.stringify([...chatIds]))
  } catch (error) {
    console.error('[subscribers] не удалось сохранить список чатов', error)
  }
}

/**
 * Официальный метод "список всех чатов бота" (GET /chats из
 * @maxhub/max-bot-api, см. lib/getAllBotChats.ts) на практике отвечает
 * 404 "Path /chats is not recognized" на реальном сервере MAX — проверено
 * на хакатоне в бою. Поэтому вместо него сами запоминаем chat_id каждого,
 * кто написал боту (см. index.ts, вызывается на каждое событие), и
 * рассылаем /announce по этому списку.
 */
export function registerChat(chatId: number | null | undefined): void {
  if (!chatId || chatIds.has(chatId)) return
  chatIds.add(chatId)
  persist()
}

export function getKnownChatIds(): number[] {
  return [...chatIds]
}
