import { type MethodsHttp, type SuccessResponse } from "@salc/core/interfaces";
import { CustomError } from "@salc/core/enums";
import type { AttendanceSessionDataSource } from "@salc/core/features/class-track-teachers/attendance/domain/datasources/tendanceSession.datasource";
import type { AttendanceSessionMapper } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/attendanceSession.mapper";
import type { StartAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/StartAttendanceSession.dto";
import type { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";
import type { EndAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/EndAttendanceSession.dto";
import type { ApproveAttendanceSessionDto } from "@salc/core/features/class-track-teachers/attendance/domain/dtos/ApproveAttendanceSession.dto";
import type { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import {
    SessionStatus,
    type AttendanceSessionStatus,
} from "@salc/core/features/class-track-teachers/attendance/domain/interfaces/AttendanceSessionStatus.interface";
import type { StudentInClassMapper } from "@salc/core/features/class-track-teachers/attendance/infrastructure/mappers/studentInClass.mapper";

export class AttendanceSessionDataSourceImpl implements AttendanceSessionDataSource {
    private readonly baseUrl = "/attendance";
    private readonly urlTypeAttendance = {
        [SessionStatus.InProgress]: "in-progress",
        [SessionStatus.PendingApproval]: "pending-approval",
        [SessionStatus.Approved]: "completed",
    };

    constructor(
        private readonly api: MethodsHttp,
        private readonly mapper: AttendanceSessionMapper,
        private readonly mapperStudent: StudentInClassMapper,
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

    async approveSession(dto: ApproveAttendanceSessionDto): Promise<SuccessResponse<AttendanceSessionEntity>> {
        const url = `${this.baseUrl}/approve`;

        const rawResponse = await this.api.patch<SuccessResponse<AttendanceSessionEntity>, ApproveAttendanceSessionDto>(url, dto);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not approve attendance session");
        }

        const session = this.mapper.toEntity(rawResponse.data);

        return {
            ...rawResponse,
            data: session,
        };
    }
    public async getActiveSessionsWithStudentDetails(
        status: AttendanceSessionStatus,
    ): Promise<SuccessResponse<StudentInClassProjection[]>> {
        const url = `${this.baseUrl}/${this.urlTypeAttendance[status]}`;

        const rawResponse = await this.api.get<SuccessResponse<StudentInClassProjection[]>>(url);

        if (!rawResponse.data) {
            throw CustomError.notFound("Could not get active sessions with student details");
        }

        const studentsInClass = this.mapperStudent.toArrayEntities(rawResponse.data);

        return {
            ...rawResponse,
            data: studentsInClass,
        };
    }
}
