import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConversationContext } from '~app/context'
import { ChatError, ErrorCode } from '~utils/errors'
import Button, { Props as ButtonProps } from '../Button'

const ActionButton: FC<ButtonProps> = (props) => {
    return <Button {...props} size="small" className="font-medium underline" color="primary" />
}

const ErrorAction: FC<{ error: ChatError }> = ({ error }) => {
    const { t } = useTranslation()

    if (error.code === ErrorCode.QIANWEN_WEB_UNAUTHORIZED) {
        return (
            <a href="https://qianwen.aliyun.com" target="_blank" rel="noreferrer">
                <ActionButton text={t('Login at qianwen.aliyun.com')} />
            </a>
        )
    }
    if (error.code === ErrorCode.BAICHUAN_WEB_UNAUTHORIZED) {
        return (
            <a href="https://www.baichuan-ai.com" target="_blank" rel="noreferrer">
                <ActionButton text={t('Login at baichuan-ai.com')} />
            </a>
        )
    }

    if (
        error.code === ErrorCode.NETWORK_ERROR ||
        (error.code === ErrorCode.UNKOWN_ERROR && error.message.includes('Failed to fetch'))
    ) {
        return (
            <div>
                <p className="ml-2 text-secondary-text text-sm">{t('Please check your network connection')}</p>
            </div>
        )
    }
    return null
}

export default ErrorAction
