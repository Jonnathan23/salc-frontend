import { z } from "zod";

export const studentClassTrackSchema = z.object({
    studentId: z.string(),
    identificationCard: z.string(),
    fullName: z.string(),
});

export const arrayStudentClassTrackSchema = z.array(studentClassTrackSchema);
