import { z } from "zod";

export const studentSearchProjectionSchema = z.object({
    id: z.string(),
    identificationCard: z.string(),
    fullName: z.string(),
    email: z.string(),
    totalEnrolledLevels: z.number(),
});

export const arrayStudentSearchProjectionSchema = z.array(studentSearchProjectionSchema);

export const timelineStudentInfoSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    phoneNumber: z.string(),
    startDate: z.string().or(z.date()),
});

export const timelineEnrolledLevelSchema = z.object({
    contractId: z.string(),
    status: z.enum(["ACTIVE", "APPROVED", "LOCKED"]),
    purchaseDate: z.string().or(z.date()),
    module: z.object({
        moduleId: z.string(),
        name: z.string(),
        level: z.number(),
    }),
});

export const timelineAvailableModuleSchema = z.object({
    moduleId: z.string(),
    name: z.string(),
    level: z.number(),
    description: z.string(),
});

export const studentTimelineProjectionSchema = z.object({
    studentInfo: timelineStudentInfoSchema,
    enrolledLevels: z.array(timelineEnrolledLevelSchema),
    availableModules: z.array(timelineAvailableModuleSchema),
});
