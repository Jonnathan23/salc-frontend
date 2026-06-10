import { z } from "zod";

export const attendanceSessionSchema = z.object({
    atSeId: z.string(),
    atSeStudentId: z.string(),
    atSeTeacherId: z.string().nullable(),
    atSeSessionDate: z.string().or(z.date()),
    atSeEntryTime: z.string().or(z.date()),
    atSeExitTime: z.string().or(z.date()).nullable(),
    atSeTotalMinutes: z.number().nullable(),
    atSeStatus: z.enum(["IN_PROGRESS", "PENDING_APPROVAL", "APPROVED"]),
});

export const arrayAttendanceSessionsSchema = z.array(attendanceSessionSchema);
