import z, { type ZodSchema } from 'zod';
import { CustomError } from '@salc/core/enums/errors/CustomError.error';
import type { SuccessResponse } from '@salc/core/interfaces';
import type { EntityValidator } from '@salc/core/interfaces/EntityValidator';

export class SuccessResponseZodValidator<TExpectedDataType = null> implements EntityValidator<SuccessResponse<TExpectedDataType>> {
    private readonly schema: ZodSchema<SuccessResponse<TExpectedDataType>>;

    // Si pasamos un esquema, valida con data. Si no, valida que data sea nulo/opcional.
    constructor(dataSchema?: ZodSchema<TExpectedDataType>) {
        this.schema = z.object({
            success: z.boolean(),
            message: z.string(),
            data: dataSchema ? dataSchema.nullable() : z.null().optional()
        }) as ZodSchema<SuccessResponse<TExpectedDataType>>;
    }

    public validate(rawData: unknown): SuccessResponse<TExpectedDataType> {
        const validationResult = this.schema.safeParse(rawData);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path.join('.')
                };
            });
            throw CustomError.badRequest(formattedErrors);
        }

        return validationResult.data;
    }
}