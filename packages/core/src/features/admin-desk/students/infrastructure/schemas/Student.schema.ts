import { z } from "zod";

export const studentSchema = z.object({
    id: z.string(),
    identificationCard: z.string(),
    fullName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    dateOfBirth: z.string().or(z.date()),
    nationality: z.string(),
    certificateType: z.string(),
    startDate: z.string().or(z.date()),
    isGraduated: z.boolean(),
    contractStatus: z.string(),
    progressCategory: z.string(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export const arrayStudentsSchema = z.array(studentSchema);
