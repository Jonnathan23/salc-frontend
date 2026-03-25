import z from "zod";


export const moduleSchema = z.object({
    mo_id: z.string(),
    mo_name: z.string().min(3).max(50),
    mo_description: z.string().min(3).max(255),
    mo_created_at: z.string().transform((value) => new Date(value)),
    mo_updated_at: z.string().transform((value) => new Date(value)),
})

export const arrayModulesSchema = z.array(moduleSchema);