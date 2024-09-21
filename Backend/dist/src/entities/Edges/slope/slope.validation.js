"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeSchema = void 0;
const zod_1 = require("zod");
const zod_validation_1 = require("../../../helpers/validation/zod.validation");
// Zod validation schemas
exports.slopeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    difficulty: zod_1.z.number(),
    timeTaken: zod_1.z.number(),
    length: zod_1.z.number(),
    fromNodeId: zod_validation_1.idSchema,
    toNodeId: zod_validation_1.idSchema,
});
