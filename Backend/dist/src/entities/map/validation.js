"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathsSchema = void 0;
const zod_1 = require("zod");
const zod_validation_1 = require("../../helpers/validation/zod.validation");
// Zod validation schemas
exports.getPathsSchema = zod_1.z.object({
    startNodeId: zod_validation_1.idSchema,
    targetNodeId: zod_validation_1.idSchema,
    difficulty: zod_1.z.boolean().array().length(3)
});
