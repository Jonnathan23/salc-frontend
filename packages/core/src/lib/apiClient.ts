import { envs } from "@salc/core/config"
import { CustomError } from "@salc/core/enums";
import { Api } from "@salc/core/interfaces/Apit.interface";
import { ApiAxios } from "@salc/core/lib/api-axios";



export let api: Api;

export const setupApiClient = (onUnauthorized: () => void): void => {
    if (!envs.API_URL) {
        throw CustomError.internalServer("CRITICAL: API_URL is missing. Call loadEnvs() first.");
    }

    api = new ApiAxios(envs.API_URL);

    api.setUnauthorizedCallback(onUnauthorized);
}