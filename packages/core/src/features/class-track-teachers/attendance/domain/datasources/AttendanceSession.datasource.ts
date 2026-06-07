import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export abstract class AttendanceSessionDataSource {
    abstract startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
    abstract endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>>;
}
