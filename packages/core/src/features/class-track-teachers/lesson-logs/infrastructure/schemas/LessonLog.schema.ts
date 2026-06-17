import { z } from "zod";

export const lessonLogSchema = z.object({
    id: z.string(),
    attendanceSessionId: z.string(),
    lessonNumber: z.union([z.string(), z.number()]).transform(String),
    oralPracticeScore: z.number().nullable(),
    isCompleted: z.boolean(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export const arrayLessonLogsSchema = z.array(lessonLogSchema);
