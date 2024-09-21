"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const data = await handler(req, res, next);
            res.json(data);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    };
};
exports.asyncHandler = asyncHandler;
