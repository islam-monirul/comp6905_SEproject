"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeEndSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.slopeEndSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    coordinates: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
});
