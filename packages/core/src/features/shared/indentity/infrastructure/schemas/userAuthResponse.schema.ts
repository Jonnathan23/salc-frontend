
import { z } from "zod";

import { userState } from "@salc/core/features/shared/indentity/domain/entities";
import { userRoles } from "@salc/core/interfaces";

const userRolesArray = Object.values(userRoles) as [string, ...string[]];
const userStatesArray = Object.values(userState) as [string, ...string[]];

export const userAuthResponseSchema = z.object({
    us_id: z.string(),
    us_full_name: z.string(),
    us_email: z.string(),
    us_role: z.enum(userRolesArray),
    us_is_active: z.enum(userStatesArray),
    permissions: z.array(z.string()),
});


export const loginResponseSchema = z.object({
    user: userAuthResponseSchema,
    token: z.string()
});