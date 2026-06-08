import { z } from "zod";

export const studentInClassSchema = z.object({
    sessionId: z.string(),
    studentId: z.string(),
    fullName: z.string(),
    contractStatus: z.string(),
    entryTime: z.string().or(z.date()),
});
