import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import { atomFamily, atomWithStorage } from 'jotai/utils'
import { BotId, createBotInstance } from '~app/bots'
import { ChatMessageModel } from '~types'
import { uuid } from '~utils'

type Param = { botId: BotId; page: string }

export const chatFamily = atomFamily(
    (param: Param) => {
        return atomWithImmer({
            botId: param.botId,
            bot: createBotInstance(param.botId),
            messages: [] as ChatMessageModel[],
            generatingMessageId: '',
            abortController: undefined as AbortController | undefined,
            conversationId: uuid(),
        })
    },
    (a, b) => a.botId === b.botId && a.page === b.page,
)

export const sidebarCollapsedAtom = atomWithStorage('sidebarCollapsed', false, undefined, { getOnInit: true })
export const themeColorAtom = atomWithStorage('themeColor', getDefaultThemeColor())
export const followArcThemeAtom = atomWithStorage('followArcTheme', false)
export const sidePanelBotAtom = atomWithStorage<BotId>('sidePanelBot', 'qianwen')
export const releaseNotesAtom = atom<string[]>([])

function getDefaultThemeColor() {
    return '#7EB8D6FF'
}
