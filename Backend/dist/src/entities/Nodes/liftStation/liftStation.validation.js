"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftStationSchemaSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.liftStationSchemaSchema = zod_1.z.object({
    name: zod_1.z.string(),
    capacity: zod_1.z.number(),
    coordinates: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
});
