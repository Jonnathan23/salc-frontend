import z, { ZodSchema, ZodType, ZodTypeAny } from 'zod';
import { CustomError } from '../enums/errors/CustomError.error';
import { FormattedErrorResponse } from '../interfaces/Errors';
import { SuccessResponse } from '@salc/core/interfaces';

export type InferSchema<T extends ZodTypeAny> = z.infer<T>;

export class DataAccessLayerAdapter {
    public static validateData<ExpectedType>(schema: ZodSchema<ExpectedType>, rawData: unknown): ExpectedType {
        const validationResult = schema.safeParse(rawData);

        if (!validationResult.success) {
            const formattedErrors: Array<FormattedErrorResponse> = validationResult.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path.join('.')
                };
            });
            throw CustomError.badRequest(formattedErrors);
        }

        return validationResult.data;
    }

    public static buildSuccessResponseSchema<ExpectedDataType = null>(dataSchema?: ZodType<ExpectedDataType>): ZodSchema<SuccessResponse<ExpectedDataType>> {

        const schema = z.object({
            success: z.boolean(),
            message: z.string(),
            data: dataSchema ? dataSchema.nullable() : z.null().optional()
        });
        return schema as ZodSchema<SuccessResponse<ExpectedDataType>>;
    }
}