import { CustomError } from "@salc/core/enums";

export interface StartAttendanceSessionDto {
    studentId: string;
    entryTime: Date;
}

export class StartAttendanceSessionDtoImpl implements StartAttendanceSessionDto {
    private constructor(
        public readonly studentId: string,
        public readonly entryTime: Date,
    ) {}

    static create(data: StartAttendanceSessionDto): StartAttendanceSessionDto {
        if (!data.studentId) {
            throw CustomError.badRequest("Missing student");
        }
        if (!data.entryTime) {
            throw CustomError.badRequest("Missing entry time");
        }

        return new StartAttendanceSessionDtoImpl(data.studentId, data.entryTime);
    }
}
