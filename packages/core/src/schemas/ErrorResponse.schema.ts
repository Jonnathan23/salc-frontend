import z from "zod";

export const FormattedErrorResponseSchema = z.object({
    message: z.string(),
    path: z.string().optional(),
});

export const ErrorResponseSchema = z.object({
    errors: z.array(FormattedErrorResponseSchema),
});