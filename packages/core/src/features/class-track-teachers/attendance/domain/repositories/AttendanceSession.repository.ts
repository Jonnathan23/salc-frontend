import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

export abstract class AttendanceSessionRepository {
    abstract startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    abstract endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    abstract getActiveSessionsWithStudentDetails(
        status: AttendanceSessionStatus,
    ): Promise<SuccessResponse<StudentInClassProjection[]>>;
}
