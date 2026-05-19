import type { ZodSchema } from "zod";
import { CustomError } from "@salc/core/enums/errors/CustomError.error";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

export class ZodValidatorAdapter<tExpectedEntity> implements EntityValidator<tExpectedEntity> {
    private readonly schema: ZodSchema<tExpectedEntity>;

    constructor(schema: ZodSchema<tExpectedEntity>) {
        this.schema = schema;
    }

    public validate(rawData: unknown): tExpectedEntity {
        const validationResult = this.schema.safeParse(rawData);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path.join("."),
                };
            });

            throw CustomError.badRequest(formattedErrors);
        }

        return validationResult.data;
    }
}
