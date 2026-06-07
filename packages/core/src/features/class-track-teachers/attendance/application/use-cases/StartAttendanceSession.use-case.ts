import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/AttendanceSession.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

export class StartAttendanceSessionUseCase {
    constructor(private readonly repository: AttendanceSessionRepository) {}

    async execute(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return await this.repository.startSession(dto);
    }
}
