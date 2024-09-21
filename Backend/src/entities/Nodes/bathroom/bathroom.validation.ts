import { z } from 'zod';

// Zod validation schemas
export const bathroomSchemaSchema = z.object({
    name: z.string(),
    hasShowers: z.boolean().default(false),
    coordinates: z.object({ x: z.number(), y: z.number() }),
});
