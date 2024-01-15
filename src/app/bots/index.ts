import { BaichuanWebBot } from './baichuan'
import { QianwenWebBot } from './qianwen'

export type BotId =
    | 'qianwen'
    | 'baichuan'

export function createBotInstance(botId: BotId) {
    switch (botId) {
        case 'qianwen':
            return new QianwenWebBot()
        case 'baichuan':
            return new BaichuanWebBot()
    }
}

export type BotInstance = ReturnType<typeof createBotInstance>
