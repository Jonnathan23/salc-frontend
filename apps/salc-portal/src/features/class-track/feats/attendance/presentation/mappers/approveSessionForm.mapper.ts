import type { BaseApproveSessionFormValues } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseApproveSessionFormValues.interface";
import {
    ApproveAttendanceSessionDtoImpl,
    type ApproveAttendanceSessionDto,
} from "@salc/core/features/class-track-teachers/attendance/domain/dtos/ApproveAttendanceSession.dto";
import type { BaseStudentInClass } from "@/features/class-track/feats/attendance/presentation/interfaces/BaseStudentInClass.interface";

export class ApproveSessionFormMapper {
    public static toApproveSessionDto(formValues: BaseApproveSessionFormValues): ApproveAttendanceSessionDto {
        return ApproveAttendanceSessionDtoImpl.create({
            sessionId: formValues.sessionId.trim(),
        });
    }

    public static toBaseApproveSessionFormValues(student: BaseStudentInClass): BaseApproveSessionFormValues {
        return {
            sessionId: student.sessionId,
        };
    }
}
