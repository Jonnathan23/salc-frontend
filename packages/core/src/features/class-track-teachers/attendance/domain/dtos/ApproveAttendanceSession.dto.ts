import { CustomError } from "@salc/core/enums";

export interface ApproveAttendanceSessionDto {
    sessionId: string;
}

export class ApproveAttendanceSessionDtoImpl implements ApproveAttendanceSessionDto {
    private constructor(public readonly sessionId: string) {}

    static create(data: ApproveAttendanceSessionDto): ApproveAttendanceSessionDto {
        if (!data.sessionId) {
            throw CustomError.badRequest("Missing session");
        }

        return new ApproveAttendanceSessionDtoImpl(data.sessionId);
    }
}
