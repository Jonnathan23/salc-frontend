import { userRoles } from "@salc/core/interfaces";
import z from "zod";

export const registerUserSchema = z.object({
    us_full_name: z.string().min(3).max(100),
    us_email: z.string().email(),
    us_password_hash: z.string().min(8),
    us_role: z.enum([userRoles.ADMIN, userRoles.TEACHER]),
})