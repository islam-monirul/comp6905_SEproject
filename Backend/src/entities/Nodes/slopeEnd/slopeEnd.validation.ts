import { z } from 'zod';

// Zod validation schemas
export const slopeEndSchema = z.object({
    name: z.string(),
    description: z.string(),
    coordinates: z.object({ x: z.number(), y: z.number() }),
});
