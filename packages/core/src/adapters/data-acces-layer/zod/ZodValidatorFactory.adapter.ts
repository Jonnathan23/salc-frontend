import z, { ZodSchema, ZodTypeAny  } from 'zod';

import { EntityValidator, ValidatorFactory } from "@salc/core/interfaces/EntityValidator";
import { ZodValidatorAdapter } from '@salc/core/adapters/data-acces-layer/zod/ZodValidatorAdapter.adapter';


export type InferSchema<T extends ZodTypeAny> = z.infer<T>;

export class ZodValidatorFactory implements ValidatorFactory {

    public createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData> {
        const zodSchema = schema as ZodSchema<TExpectedData>;
        return new ZodValidatorAdapter<TExpectedData>(zodSchema);
    }

}