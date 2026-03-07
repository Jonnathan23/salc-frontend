import z, { ZodSchema, ZodTypeAny } from 'zod';
import { CustomError } from '../../enums/errors/CustomError.error';
import { FormattedErrorResponse } from '../../interfaces/Errors';

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
}