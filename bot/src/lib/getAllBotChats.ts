import type { Api } from '@maxhub/max-bot-api'
import type { Chat } from '@maxhub/max-bot-api/types'

/** Постранично собирает все чаты, где состоит бот (api.getAllChats пагинирован через marker). */
export async function getAllBotChats(api: Api): Promise<Chat[]> {
  const chats: Chat[] = []
  let marker: number | null | undefined

  do {
    const response = await api.getAllChats({ count: 100, marker: marker ?? undefined })
    chats.push(...response.chats)
    marker = response.marker
  } while (marker)

  return chats
}
