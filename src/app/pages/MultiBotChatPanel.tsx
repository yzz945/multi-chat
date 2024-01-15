import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { sample, uniqBy } from 'lodash-es'
import { FC, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '~/utils'
import Button from '~app/components/Button'
import ChatMessageInput from '~app/components/Chat/ChatMessageInput'
import { CHATBOTS, Layout } from '~app/consts'
import { useChat } from '~app/hooks/use-chat'
import { BotId } from '../bots'
import ConversationPanel from '../components/Chat/ConversationPanel'

const DEFAULT_BOTS: BotId[] = Object.keys(CHATBOTS).slice(0, 3) as BotId[]

const layoutAtom = atomWithStorage<Layout>('multiPanelLayout', 2, undefined, { getOnInit: true })
const twoPanelBotsAtom = atomWithStorage<BotId[]>('multiPanelBots:2', DEFAULT_BOTS.slice(0, 2))


function replaceDeprecatedBots(bots: BotId[]): BotId[] {
    return bots.map((bot) => {
        if (CHATBOTS[bot]) {
            return bot
        }
        return sample(DEFAULT_BOTS)!
    })
}

const GeneralChatPanel: FC<{
    chats: ReturnType<typeof useChat>[]
    setBots?: ReturnType<typeof useSetAtom<typeof twoPanelBotsAtom>>
    supportImageInput?: boolean
}> = ({ chats, setBots, supportImageInput }) => {
    const { t } = useTranslation()
    const generating = useMemo(() => chats.some((c) => c.generating), [chats])
    const [layout, setLayout] = useAtom(layoutAtom)

    const disabled = false;
    const sendSingleMessage = useCallback(
        (input: string, botId: BotId) => {
            const chat = chats.find((c) => c.botId === botId)
            chat?.sendMessage(input)
        },
        [chats],
    )

    const sendAllMessage = useCallback(
        (input: string, image?: File) => {
            uniqBy(chats, (c) => c.botId).forEach((c) => c.sendMessage(input, image))
        },
        [chats, disabled, layout],
    )

    const onSwitchBot = useCallback(
        (botId: BotId, index: number) => {
            if (!setBots) {
                return
            }
            setBots((bots) => {
                const newBots = [...bots]
                newBots[index] = botId
                return newBots
            })
        },
        [chats.length, setBots],
    )

    const onLayoutChange = useCallback(
        (v: Layout) => {
            setLayout(v)
        },
        [setLayout],
    )

    return (
        <div className="flex flex-col overflow-hidden h-full">
            <div
                className={cx(
                    'grid overflow-hidden grow auto-rows-fr',
                    chats.length % 3 === 0 ? 'grid-cols-3' : 'grid-cols-2',
                    chats.length > 3 ? 'gap-2 mb-2' : 'gap-3 mb-3',
                )}
            >
                {chats.map((chat, index) => (
                    <ConversationPanel
                        key={`${chat.botId}-${index}`}
                        botId={chat.botId}
                        bot={chat.bot}
                        messages={chat.messages}
                        onUserSendMessage={(input) => sendSingleMessage(input, chat.botId)}
                        generating={chat.generating}
                        stopGenerating={chat.stopGenerating}
                        mode="compact"
                        resetConversation={chat.resetConversation}
                        onSwitchBot={setBots ? (botId) => onSwitchBot(botId, index) : undefined}
                    />
                ))}
            </div>
           <div className="flex flex-row gap-3">
                <ChatMessageInput
                    mode="full"
                    className="rounded-2xl bg-primary-background px-4 py-2 grow"
                    disabled={generating}
                    onSubmit={sendAllMessage}
                    actionButton={!generating && <Button text={t('Send')} color="primary" type="submit" />}
                    autoFocus={true}
                    supportImageInput={supportImageInput}
                />
            </div>
        </div>
    )
}

const TwoBotChatPanel = () => {
    const [bots, setBots] = useAtom(twoPanelBotsAtom)
    const multiPanelBotIds = useMemo(() => replaceDeprecatedBots(bots), [bots])
    const chat1 = useChat(multiPanelBotIds[0])
    const chat2 = useChat(multiPanelBotIds[1])
    const chats = useMemo(() => [chat1, chat2], [chat1, chat2])
    return <GeneralChatPanel chats={chats} setBots={setBots} />
}

const MultiBotChatPanel: FC = () => {
    const layout = useAtomValue(layoutAtom)
    console.log("layout:"+layout)
    return <TwoBotChatPanel />
}

const MultiBotChatPanelPage: FC = () => {
    console.log('MultiBotChatPanelPage被渲染了！');
    return (
        <Suspense>
            <MultiBotChatPanel />
        </Suspense>
    )
}

export default MultiBotChatPanelPage
