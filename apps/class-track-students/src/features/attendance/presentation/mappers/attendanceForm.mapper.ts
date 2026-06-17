import {
    StartAttendanceSessionDtoImpl,
    type StartAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import {
    EndAttendanceSessionDtoImpl,
    type EndAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type {
    BaseCheckInFormValues,
    BaseCheckoutFormValues,
} from "@/features/attendance/presentation/interfaces/BaseAttendanceFormValues.interface";

export class AttendanceFormMapper {
    public static toStartSessionDto(formValues: BaseCheckInFormValues): StartAttendanceSessionDto {
        return StartAttendanceSessionDtoImpl.create({
            studentId: formValues.studentId,
            entryTime: new Date(),
        });
    }

    public static toEndSessionDto(formValues: BaseCheckoutFormValues): EndAttendanceSessionDto {
        return EndAttendanceSessionDtoImpl.create({
            sessionId: formValues.sessionId,
            exitTime: new Date(),
        });
    }
}
