import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/AttendanceSession.repository";
import type { SuccessResponse } from "@salc/core/interfaces";

export class EndAttendanceSessionUseCase {
    constructor(private readonly repository: AttendanceSessionRepository) {}

    async execute(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        return await this.repository.endSession(dto);
    }
}
