import z, { type ZodSchema } from 'zod';
import { CustomError } from '@salc/core/enums/errors/CustomError.error';
import type { EntityValidator } from '@salc/core/interfaces/EntityValidator';


export class ZodValidatorAdapter<TExpectedEntity> implements EntityValidator<TExpectedEntity> {
    private readonly schema: ZodSchema<TExpectedEntity>;

    constructor(schema: ZodSchema<TExpectedEntity>) {
        this.schema = schema;
    }

    public validate(rawData: unknown,): TExpectedEntity {
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