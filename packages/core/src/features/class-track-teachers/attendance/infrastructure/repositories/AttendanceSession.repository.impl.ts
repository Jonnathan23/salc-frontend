import type { AttendanceSessionDataSource } from "@salc/core/features/class-track-teachers/attendance/domain/datasources/AttendanceSession.datasource";
import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/AttendanceSession.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

export class AttendanceSessionRepositoryImpl implements AttendanceSessionRepository {
    constructor(private readonly dataSource: AttendanceSessionDataSource) {}

    async startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return this.dataSource.startSession(dto);
    }

    async endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return this.dataSource.endSession(dto);
    }
}
