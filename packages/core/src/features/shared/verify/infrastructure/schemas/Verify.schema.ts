import { z } from "zod";
import { userRoles } from "@salc/core/interfaces";
import { clientRoles } from "@salc/core/features/shared/verify/domain/models/StudentTokenPayload.model";

const userRolesArray = Object.values(userRoles) as [string, ...string[]];
const clientRolesArray = Object.values(clientRoles) as [string, ...string[]];

export const userTokenPayloadSchema = z.object({
    id: z.string(),
    email: z.email(),
    role: z.enum(userRolesArray),
});

export const studentTokenPayloadSchema = z.object({
    id: z.string(),
    sessionId: z.string(),
    role: z.enum(clientRolesArray),
});
