import { enviromentSchema } from "@salc/core/schemas/envs.schema";
import { InferSchema } from "@salc/core/utils";



export type SystemConfiguration = InferSchema<typeof enviromentSchema>


export let envs: SystemConfiguration;

export const loadEnvs = (rawEnviroment: { [key: string]: any }) => {
    const result = enviromentSchema.safeParse(rawEnviroment);
    if (!result.success) {
        throw new Error('Invalid environment variables');
    }

    envs.API_URL = result.data.API_URL;
}