import type { InferSchema } from "@salc/core/adapters/data-acces-layer/zod/ZodValidatorFactory.adapter";
import { CustomError } from "@salc/core/enums";
import { enviromentSchema } from "@salc/core/schemas/Envs.schema";

export type SystemConfiguration = InferSchema<typeof enviromentSchema>;

export const envs = {} as SystemConfiguration;

export const loadEnvs = (rawEnviroment: Record<string, any>) => {
    const result = enviromentSchema.safeParse(rawEnviroment);

    if (!result.success) {
        throw CustomError.internalServer("Invalid environment variables: " + result.error.message);
    }

    Object.assign(envs, result.data);
};
