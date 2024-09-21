import { Http } from "../http/statusCode"

// ================================================================================================
export type HttpErrorType = keyof typeof Http

export function MyError(
    status: number | HttpErrorType,
    message: string,
    platform: 'REST' | 'tRPC' = 'REST'
) {
    const statusCode = (typeof status === 'number') ? status : Http[status]
    if (platform === 'REST') {
        throw { name: 'RestError', status: statusCode, message, platform }
    }
}
// TRPC future work