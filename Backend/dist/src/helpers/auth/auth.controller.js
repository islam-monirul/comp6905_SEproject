"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const asyncHandler_1 = require("../asyncHandler/asyncHandler");
// =============================================================
exports.authRouter = Object.freeze({
    register: (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
        auth_validation_1.authValidation.register.parse(req.body);
        const result = await auth_service_1.authService.register({
            ...req.body,
            token: req.headers.token,
        });
        return result;
    }),
    // -------------------------------------
    login: (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
        auth_validation_1.authValidation.login.parse(req.body);
        const result = await auth_service_1.authService.login({ ...req.body });
        return result;
    }),
    me: (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
        auth_validation_1.authValidation.me.parse(req.query);
        const result = await auth_service_1.authService.me(req);
        return result;
    }),
    // -------------------------------------
});
