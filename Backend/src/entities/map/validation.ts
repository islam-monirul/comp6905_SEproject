import { z } from "zod";
import { idSchema } from "../../helpers/validation/zod.validation";

// Zod validation schemas
export const getPathsSchema = z.object({
    startNodeId: idSchema,
    targetNodeId: idSchema,
    difficulty: z.boolean().array().length(3)
});

