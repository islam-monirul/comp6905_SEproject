import express, { NextFunction, Request, Response } from 'express';

export const asyncHandler = (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await handler(req, res, next);
            res.json(data);
        } catch (err) {
            console.error(err)
            next(err);
        }
    };
};