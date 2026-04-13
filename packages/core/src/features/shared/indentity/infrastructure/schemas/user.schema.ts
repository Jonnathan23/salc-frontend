import z, { string } from "zod";
import { userRoles } from "@salc/core/interfaces";

export const userSchema = z.object({
    us_id: string(),
    us_full_name: string(),
    us_email: string(),
    us_password_hash: string(),
    us_role: z.enum([userRoles.ADMIN, userRoles.TEACHER]),
    us_is_active: string(),
    us_created_at: string(),
    us_updated_at: string(),
});