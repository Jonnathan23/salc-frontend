import type { AttendanceSessionStatus } from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";
import type { AttendanceSessionRepository } from "@salc/core/features/class-track-teachers/attendance/domain/repositories/danceSession.repository";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { SuccessResponse } from "@salc/core/interfaces";

export class GetActiveSessionsUseCase {
    constructor(
        private readonly repository: AttendanceSessionRepository,
        private readonly status: AttendanceSessionStatus,
    ) {}

    public async execute(): Promise<SuccessResponse<StudentInClassProjection[]>> {
        return this.repository.getActiveSessionsWithStudentDetails(this.status);
    }
}
