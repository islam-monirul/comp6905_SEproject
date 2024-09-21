import { z } from 'zod';
import { idSchema } from '../../../helpers/validation/zod.validation';

// Zod validation schemas
export const slopeSchema = z.object({
    name: z.string(),
    difficulty: z.number(),
    timeTaken: z.number(),
    length: z.number(),
    fromNodeId: idSchema,
    toNodeId: idSchema,
});
