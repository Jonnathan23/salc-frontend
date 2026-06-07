import { CustomError } from "@salc/core/enums";

export interface EndAttendanceSessionDto {
    sessionId: string;
    teacherId: string;
    exitTime: Date;
}

export class EndAttendanceSessionDtoImpl implements EndAttendanceSessionDto {
    private constructor(
        public readonly sessionId: string,
        public readonly teacherId: string,
        public readonly exitTime: Date,
    ) {}

    static create(data: EndAttendanceSessionDto): EndAttendanceSessionDto {
        if (!data.sessionId) {
            throw CustomError.badRequest("Missing session");
        }
        if (!data.teacherId) {
            throw CustomError.badRequest("Missing teacher");
        }
        if (!data.exitTime) {
            throw CustomError.badRequest("Missing exit time");
        }

        return new EndAttendanceSessionDtoImpl(data.sessionId, data.teacherId, data.exitTime);
    }
}
