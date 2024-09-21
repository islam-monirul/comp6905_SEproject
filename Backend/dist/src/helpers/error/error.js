"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyError = void 0;
const statusCode_1 = require("../http/statusCode");
function MyError(status, message, platform = 'REST') {
    const statusCode = (typeof status === 'number') ? status : statusCode_1.Http[status];
    if (platform === 'REST') {
        throw { name: 'RestError', status: statusCode, message, platform };
    }
}
exports.MyError = MyError;
// TRPC future work
