import { envs } from "@salc/core/config"
import { CustomError } from "@salc/core/enums";
import { Api } from "@salc/core/lib"


export let apiSalc: Api;

export const setupApiClient = (onUnauthorized: () => void): void => {
    if (!envs.API_URL) {
        throw CustomError.internalServer("CRITICAL: API_URL is missing. Call loadEnvs() first.");
    }

    // Ahora sí, instanciamos la clase de Axios con la URL ya validada
    apiSalc = new Api(envs.API_URL);

    apiSalc.setUnauthorizedCallback(onUnauthorized);
}