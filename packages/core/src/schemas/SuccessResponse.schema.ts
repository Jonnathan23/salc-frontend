import { z, ZodTypeAny } from 'zod';

export const buildSuccessResponseSchema = <T extends ZodTypeAny>(dataSchema?: T) => {
    return z.object({
        success: z.boolean(),
        message: z.string(),
        data: dataSchema ? dataSchema.nullable() : z.null().optional()
    });
};