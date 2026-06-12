import { z } from "zod";

export const basicStudentInfoSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    identificationCard: z.string(),
    phoneNumber: z.string(),
    contractStatus: z.string(),
});

export const retentionAlertWithStudentProjectionSchema = z.object({
    id: z.string(),
    contactDate: z.string().or(z.date()).nullable().optional(),
    hasResponded: z.boolean(),
    daysAbsent: z.number(),
    isJustified: z.boolean(),
    justificationReason: z.string().nullable().optional(),
    returnDeadline: z.string().or(z.date()).nullable().optional(),
    observations: z.string(),
    status: z.string(),
    student: basicStudentInfoSchema,
    createdAt: z.string().or(z.date()),
});

export const arrayRetentionAlertsWithStudentProjectionSchema = z.array(retentionAlertWithStudentProjectionSchema);
