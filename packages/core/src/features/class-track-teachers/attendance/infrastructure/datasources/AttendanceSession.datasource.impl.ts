import { type MethodsHttp, type SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";
import type { AttendanceSessionDataSource } from "@salc/core/features/class-track-teachers/attendance/domain/datasources/AttendanceSession.datasource";
import type { AttendanceSessionMapper } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/attendanceSession.mapper";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";

export class AttendanceSessionDataSourceImpl implements AttendanceSessionDataSource {
    private readonly baseUrl = "/api/attendance";

    constructor(
        private readonly api: MethodsHttp,
        private readonly mapper: AttendanceSessionMapper,
    ) {}

    async startSession(dto: StartAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        const url = `${this.baseUrl}/check-in`;

        const rawResponse = await this.api.post<SuccessResponse<AttendanceSessionEntity>, StartAttendanceSessionDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not start attendance session");
        }

        const session = this.mapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: session,
        };
    }

    async endSession(dto: EndAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        const url = `${this.baseUrl}/check-out`;

        const rawResponse = await this.api.patch<SuccessResponse<AttendanceSessionEntity>, EndAttendanceSessionDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not end attendance session");
        }

        const session = this.mapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: session,
        };
    }
}
