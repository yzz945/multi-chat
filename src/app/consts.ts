
import baichuanLogo from '~/assets/logos/baichuan.png'
import qianwenLogo from '~/assets/logos/qianwen.png'
import { BotId } from './bots'

export const CHATBOTS: Record<BotId, { name: string; avatar: string }> = {
    qianwen: {
        name: 'Qianwen',
        avatar: qianwenLogo,
    },
    baichuan: {
        name: 'Baichuan',
        avatar: baichuanLogo,
    }
}
export const CHATGPT_API_MODELS = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'] as const
export const ALL_IN_ONE_PAGE_ID = 'all'

export const DEFAULT_CHATGPT_SYSTEM_MESSAGE =
    'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: 2021-09-01. Current date: {current_date}'

export type Layout = 2 | 3 | 4 | 'imageInput' | 'twoVertical'
