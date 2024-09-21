import { Request, Response, NextFunction } from 'express'
import PrismaErrors from './prismaErrors'

const prettyViolationErrorMessage = (error: any, req: Request) => {
  const { code, meta } = error
  const name: any = PrismaErrors.codeToName[code]

  if (name) error.name = name

  if (name === 'UniqueConstraintViolation') {
    let [_model, _field] = meta?.target?.split('_')
    // error.message = `
    // ${req.t(model.toLowerCase())} ${req.t(field)} ${req.t(name)}`;
  } else if (name === 'RecordsNotFound') {
    let [_, _model, _id] = req.url.split('/')
    // error.message = `${req.t(model)} ${id} ${req.t("RecordsNotFound")}`;
  }
}

// ---------------------------------------------------------------

const prismaErrorHandler = (
  error: any,
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { _code, _meta, _message: m2 } = error
  error.status = 400
  prettyViolationErrorMessage(error, req)
  next(error)
}

// ------------------------------------------------

export default prismaErrorHandler
