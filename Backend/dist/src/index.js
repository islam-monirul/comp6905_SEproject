"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const prisma_1 = require("./helpers/database/prisma");
const express_1 = require("./helpers/server/express");
// ==========================================
// Set Environment Variables
const env = dotenv_1.default.config();
dotenv_expand_1.default.expand(env);
// ==========================================
async function main() {
    await (0, prisma_1.connectDatabase)();
    await (0, express_1.launchWebServer)();
}
// ==========================================
main();
