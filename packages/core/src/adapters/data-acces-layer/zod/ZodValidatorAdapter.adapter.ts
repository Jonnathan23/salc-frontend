import z, { type ZodSchema } from 'zod';
import { CustomError } from '@salc/core/enums/errors/CustomError.error';
import type { EntityValidator } from '@salc/core/interfaces/EntityValidator';


export class ZodValidatorAdapter<TExpectedEntity> implements EntityValidator<TExpectedEntity> {
    private readonly schema: ZodSchema<TExpectedEntity>;

    constructor(schema: ZodSchema<TExpectedEntity>) {
        this.schema = schema;
    }

    public validate(rawData: unknown, ): TExpectedEntity {
        console.log('rawData')
        console.log(rawData)
        const validationResult = this.schema.safeParse(rawData);

        if (!validationResult.success) {
            console.log('validationResult.error.issues')
            console.log(validationResult.error.issues)
            console.log('----------------------')
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