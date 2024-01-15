export enum ErrorCode {
    CONVERSATION_LIMIT = 'CONVERSATION_LIMIT',
    UNKOWN_ERROR = 'UNKOWN_ERROR',

    API_KEY_NOT_SET = 'API_KEY_NOT_SET',


    MISSING_HOST_PERMISSION = 'MISSING_HOST_PERMISSION',

    NETWORK_ERROR = 'NETWORK_ERROR',

    QIANWEN_WEB_UNAUTHORIZED = 'QIANWEN_WEB_UNAUTHORIZED',
    BAICHUAN_WEB_UNAUTHORIZED = 'BAICHUAN_WEB_UNAUTHORIZED',

}

export class ChatError extends Error {
    code: ErrorCode
    constructor(message: string, code: ErrorCode) {
        super(message)
        this.code = code
    }
}
