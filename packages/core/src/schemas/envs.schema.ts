import { z } from 'zod'

export const enviromentSchema = z.object({
    API_URL: z.string().url("API_URL must be a valid URL").nonempty("API_URL is required")
})