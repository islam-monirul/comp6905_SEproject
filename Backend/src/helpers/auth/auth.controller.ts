import { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service'
import { authValidation } from './auth.validation'
import { asyncHandler } from '../asyncHandler/asyncHandler'
// =============================================================

export const authRouter = Object.freeze({

    register: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        authValidation.register.parse(req.body)
        const result = await authService.register({
            ...req.body,
            token: req.headers.token,
        })
        return result
    }),

    // -------------------------------------

    login: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        authValidation.login.parse(req.body)
        const result = await authService.login({ ...req.body })
        return result
    }),

    me: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        authValidation.me.parse(req.query)
        const result = await authService.me(req)
        return result
    }),

    // -------------------------------------
})
