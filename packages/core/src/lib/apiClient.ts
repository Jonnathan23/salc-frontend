import { envs } from "@salc/core/config"
import { Api } from "@salc/core/lib"


const baseUrl = envs.API_URL
export const apiSalc = new Api(baseUrl)