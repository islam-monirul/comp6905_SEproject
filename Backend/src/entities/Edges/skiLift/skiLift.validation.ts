import { z } from 'zod';
import { idSchema } from '../../../helpers/validation/zod.validation';


// Zod validation schemas
export const skiLiftSchemaSchema = z.object({
    name: z.string(),
    length: z.number(),
    fromNodeId: idSchema,
    toNodeId: idSchema,
});
