import { z } from 'zod';

// Zod validation schemas
export const slopeStartSchema = z.object({
    name: z.string(),
    difficulty: z.string(),
    coordinates: z.object({ x: z.number(), y: z.number() }),
});
