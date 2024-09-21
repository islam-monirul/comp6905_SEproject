import { Router } from 'express'
import { authRouter } from './auth.controller'

export const restApiRouter = Router()


restApiRouter.post('/auth/register', authRouter.register)
restApiRouter.post('/auth/login', authRouter.login)
restApiRouter.get('/auth/me', authRouter.me)