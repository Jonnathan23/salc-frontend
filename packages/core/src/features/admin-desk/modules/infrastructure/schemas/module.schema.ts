import z from "zod";


export const moduleSchema = z.object({
    mo_id: z.string(),
    mo_name: z.string(),
    mo_description: z.string().min(3).max(255),
    mo_created_at: z.string(),
    mo_updated_at: z.string(),
})

export const arrayModulesSchema = z.array(moduleSchema);