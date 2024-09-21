"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const prismaErrors_1 = require("./prismaErrors");
function errors(error, req, res, _next) {
    res.locals.message = error === null || error === void 0 ? void 0 : error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};
    const errCode = ((error === null || error === void 0 ? void 0 : error.code) in prismaErrors_1.codeToName) ? prismaErrors_1.codeToName[(error === null || error === void 0 ? void 0 : error.code)] : undefined;
    const { code: _, ...others } = error;
    res.status((error === null || error === void 0 ? void 0 : error.status) || (errCode !== undefined ? 400 : 500)).json({
        url: req.originalUrl,
        method: req.method,
        code: errCode,
        ...others,
    });
}
exports.errors = errors;
