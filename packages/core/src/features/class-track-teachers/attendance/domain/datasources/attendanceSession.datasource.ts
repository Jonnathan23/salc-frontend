import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { ApproveAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/ApproveAttendanceSession.dto";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class AttendanceSessionDataSource {
    abstract startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    abstract endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    abstract approveSession(dto: ApproveAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    public abstract getActiveSessionsWithStudentDetails(
        status: AttendanceSessionStatus,
    ): Promise<SuccessResponse<StudentInClassProjection[]>>;
}
