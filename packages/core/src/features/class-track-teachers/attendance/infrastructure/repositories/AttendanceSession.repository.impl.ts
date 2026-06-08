import type { AttendanceSessionDataSource } from "@salc/core/features/class-track-teachers/attendance/domain/datasources/attendanceSession.datasource";
import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/AttendanceSession.repository";
import type { SuccessResponse } from "@salc/core/interfaces";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";

export class AttendanceSessionRepositoryImpl implements AttendanceSessionRepository {
    constructor(private readonly dataSource: AttendanceSessionDataSource) {}

    async startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return this.dataSource.startSession(dto);
    }

    async endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return this.dataSource.endSession(dto);
    }

    async getActiveSessionsWithStudentDetails(
        status: AttendanceSessionStatus,
    ): Promise<SuccessResponse<StudentInClassProjection[]>> {
        return this.dataSource.getActiveSessionsWithStudentDetails(status);
    }
}
