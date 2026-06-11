import { z } from "zod";

export const retentionAlertSchema = z.object({
    reAlId: z.string(),
    reAlStudentId: z.string(),
    reAlUserId: z.string().nullable(),
    reAlContactDate: z.string().or(z.date()).nullable().optional(),
    reAlHasResponded: z.boolean(),
    reAlDaysAbsent: z.number(),
    reAlIsJustified: z.boolean(),
    reAlJustificationReason: z.string().nullable().optional(),
    reAlReturnDeadline: z.string().or(z.date()).nullable().optional(),
    reAlObservations: z.string(),
    reAlStatus: z.string(),
    reAlCreatedAt: z.string().or(z.date()),
});

export const arrayRetentionAlertsSchema = z.array(retentionAlertSchema);
