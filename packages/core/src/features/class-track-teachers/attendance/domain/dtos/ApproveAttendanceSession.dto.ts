import { CustomError } from "@salc/core/enums";

export interface ApproveAttendanceSessionDto {
    sessionId: string;
    teacherId: string;
}

export class ApproveAttendanceSessionDtoImpl implements ApproveAttendanceSessionDto {
    private constructor(
        public readonly sessionId: string,
        public readonly teacherId: string,
    ) {}

    static create(data: ApproveAttendanceSessionDto): ApproveAttendanceSessionDto {
        if (!data.sessionId) {
            throw CustomError.badRequest("Missing session");
        }
        if (!data.teacherId) {
            throw CustomError.badRequest("Missing teacher");
        }

        return new ApproveAttendanceSessionDtoImpl(data.sessionId, data.teacherId);
    }
}
