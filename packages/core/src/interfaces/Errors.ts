import type { InferSchema } from '@salc/core/adapters/data-acces-layer/zod/ZodValidatorFactory.adapter';
import { ErrorResponseSchema, FormattedErrorResponseSchema } from '@salc/core/schemas';

export type FormattedErrorResponse = InferSchema<typeof FormattedErrorResponseSchema>;

export type ErrorResponse = InferSchema<typeof ErrorResponseSchema>;
