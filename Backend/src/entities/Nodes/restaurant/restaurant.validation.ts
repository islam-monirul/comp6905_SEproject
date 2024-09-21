import { z } from 'zod';

// Zod validation schemas
export const restaurantSchema = z.object({
    name: z.string(),
    menu: z.string().default("menu"),
    coordinates: z.object({ x: z.number(), y: z.number() }),
});
