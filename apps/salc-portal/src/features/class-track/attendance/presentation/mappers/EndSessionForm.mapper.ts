import type { BaseEndSessionFormValues } from "@/features/class-track/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import {
    EndAttendanceSessionDtoImpl,
    type EndAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";

export class EndSessionFormMapper {
    public static toEndSessionDto(formValues: BaseEndSessionFormValues): EndAttendanceSessionDto {
        return EndAttendanceSessionDtoImpl.create({
            sessionId: formValues.sessionId.trim(),
            teacherId: formValues.teacherId.trim(),
            exitTime: formValues.exitTime,
        });
    }
}
