import { z } from "zod";

export const studentInClassSchema = z.object({
    sessionId: z.string(),
    studentId: z.string(),
    fullName: z.string(),
    contractStatus: z.string(),
    entryTime: z.string().or(z.date()),
});

export const dashboardSummarySchema = z.object({
    studentsInsideCount: z.number(),
    pendingCheckoutsCount: z.number(),
    activeAlertsCount: z.number(),
    activeContractsCount: z.number(),
    studentsInClass: z.array(studentInClassSchema),
});
