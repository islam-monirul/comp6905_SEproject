"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeStartSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.slopeStartSchema = zod_1.z.object({
    name: zod_1.z.string(),
    difficulty: zod_1.z.string(),
    coordinates: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
});
