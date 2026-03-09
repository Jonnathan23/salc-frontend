import { ErrorResponseSchema, FormattedErrorResponseSchema } from "@salc/core/schemas";
import { InferSchema } from "@salc/core/utils";


export type FormattedErrorResponse = InferSchema<typeof FormattedErrorResponseSchema>;

export type ErrorResponse = InferSchema<typeof ErrorResponseSchema>;
