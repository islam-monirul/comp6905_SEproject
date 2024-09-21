import { z } from 'zod';

// Zod validation schemas
export const liftStationSchemaSchema = z.object({
    name: z.string(),
    capacity: z.number(),
    coordinates: z.object({ x: z.number(), y: z.number() }),
});
