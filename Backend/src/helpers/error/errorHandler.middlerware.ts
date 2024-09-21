import { Request, Response, NextFunction } from 'express'
import { codeToName } from './prismaErrors'

export function errors(
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.locals.message = error?.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}
  const errCode: any = (error?.code in codeToName) ? codeToName[(error?.code) as keyof typeof codeToName] : undefined

  const { code: _, ...others } = error

  res.status(error?.status || (errCode !== undefined ? 400 : 500)).json({
    url: req.originalUrl,
    method: req.method,
    code: errCode,
    ...others,
  })
}
