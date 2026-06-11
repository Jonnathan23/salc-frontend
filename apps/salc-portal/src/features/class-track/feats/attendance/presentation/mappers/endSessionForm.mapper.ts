import type { BaseEndSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseEndSessionFormValues.interface";
import {
    EndAttendanceSessionDtoImpl,
    type EndAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { BaseStudentInClass } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseStudentInClass.interface";

export class EndSessionFormMapper {
    public static toEndSessionDto(formValues: BaseEndSessionFormValues): EndAttendanceSessionDto {
        return EndAttendanceSessionDtoImpl.create({
            sessionId: formValues.sessionId.trim(),
            exitTime: formValues.exitTime,
        });
    }

    public static toBaseEndSessionFormValues(student: BaseStudentInClass): BaseEndSessionFormValues {
        return {
            sessionId: student.sessionId,
            exitTime: new Date(),
        };
    }
}
