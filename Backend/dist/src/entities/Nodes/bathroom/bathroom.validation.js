"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bathroomSchemaSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.bathroomSchemaSchema = zod_1.z.object({
    name: zod_1.z.string(),
    hasShowers: zod_1.z.boolean().default(false),
    coordinates: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
});
