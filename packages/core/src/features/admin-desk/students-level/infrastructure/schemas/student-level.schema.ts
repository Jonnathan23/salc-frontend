import z from "zod";

export const studentLevelSchema = z.object({
    id: z.string(),
    studentId: z.string(),
    moduleId: z.string(),
    sellerId: z.string(),
    status: z.enum(["ACTIVE", "APPROVED", "LOCKED"]),
    purchaseDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
