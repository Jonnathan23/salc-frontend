import { ZodValidatorFactory } from "@salc/core/adapters/data-acces-layer/zod/ZodValidatorFactory.adapter";
import { envs } from "@salc/core/config";
import { CustomError } from "@salc/core/enums";
import type { Api, ErrorResponse } from "@salc/core/interfaces";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";
import { ApiAxios } from "@salc/core/lib/api-axios";
import { ErrorResponseSchema } from "@salc/core/schemas";

const validateErrorResponse = new ZodValidatorFactory().createValidator(ErrorResponseSchema);

export const api: Api = new ApiAxios("", validateErrorResponse as EntityValidator<ErrorResponse>);

export const setupApiClient = (onUnauthorized: () => void): void => {
    if (!envs.API_URL) {
        throw CustomError.internalServer("CRITICAL: API_URL is missing. Call loadEnvs() first.");
    }

    api.setBaseUrl(envs.API_URL);

    api.setUnauthorizedCallback(onUnauthorized);
};
