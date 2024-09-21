"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const client_1 = require("@prisma/client");
const configs_1 = require("../configs");
// -----------------------------------------------
// Set Environment Variables
const env = dotenv_1.default.config();
dotenv_expand_1.default.expand(env);
// -----------------------------------------------
const prismaGlobal = global;
exports.prisma = prismaGlobal.prisma ||
    new client_1.PrismaClient({
    // log: ['query'],
    // log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
const connectDatabase = async () => {
    try {
        console.log(configs_1.configs.DATABASE_URL);
        await exports.prisma.$connect();
        console.dir('Connected to Database Successfully ! 🗄 ');
    }
    catch (error) {
        console.error('Cannot connect to database');
        console.error({ error });
    }
};
exports.connectDatabase = connectDatabase;
