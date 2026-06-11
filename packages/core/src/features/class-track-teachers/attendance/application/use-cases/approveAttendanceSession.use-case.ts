import type { ApproveAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/ApproveAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/danceSession.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

export class ApproveAttendanceSessionUseCase {
    constructor(private readonly repository: AttendanceSessionRepository) {}

    async execute(dto: ApproveAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return await this.repository.approveSession(dto);
    }
}
