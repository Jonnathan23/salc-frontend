import type { BaseStartSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseStartSessionFormValues.interface";
import {
    StartAttendanceSessionDtoImpl,
    type StartAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";

export class StartSessionFormMapper {
    public static toStartSessionDto(formValues: BaseStartSessionFormValues): StartAttendanceSessionDto {
        return StartAttendanceSessionDtoImpl.create({
            studentId: formValues.studentId.trim(),
            entryTime: formValues.entryTime,
        });
    }
}
