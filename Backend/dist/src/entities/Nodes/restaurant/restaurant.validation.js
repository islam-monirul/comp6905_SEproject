"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    menu: zod_1.z.string().default("menu"),
    coordinates: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
});
