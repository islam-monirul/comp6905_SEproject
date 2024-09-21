"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restApiRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.restApiRouter = (0, express_1.Router)();
exports.restApiRouter.post('/auth/register', auth_controller_1.authRouter.register);
exports.restApiRouter.post('/auth/login', auth_controller_1.authRouter.login);
exports.restApiRouter.get('/auth/me', auth_controller_1.authRouter.me);
