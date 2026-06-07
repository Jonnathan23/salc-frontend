import { CustomError } from "@salc/core/enums";
import { AttendanceSessionEntity } from "@salc/core/features/class-track-teachers/attendance/domain/entities/AttendanceSession.entity";

import { type EntityValidator } from "@salc/core/interfaces/EntityValidator";

type AttendanceSessionMapperProps = Record<string, unknown> | unknown | null | undefined;

export interface AttendanceSessionMapper {
    toEntity(rawObject: AttendanceSessionMapperProps): AttendanceSessionEntity;
    toArrayEntities(rawObjects: AttendanceSessionMapperProps[]): AttendanceSessionEntity[];
}

export class AttendanceSessionMapperImpl implements AttendanceSessionMapper {
    constructor(private readonly validator: EntityValidator<AttendanceSessionEntity>) {}

    toEntity(rawObject: AttendanceSessionMapperProps): AttendanceSessionEntity {
        if (!rawObject) {
            throw CustomError.notFound("Attendance session data is missing");
        }

        const validationResponse = this.validator.validate(rawObject);

        return new AttendanceSessionEntity(
            validationResponse.atSeId,
            validationResponse.atSeStudentId,
            validationResponse.atSeTeacherId,
            new Date(validationResponse.atSeSessionDate),
            new Date(validationResponse.atSeEntryTime),
            validationResponse.atSeExitTime ? new Date(validationResponse.atSeExitTime) : null,
            validationResponse.atSeTotalMinutes,
            validationResponse.atSeStatus,
        );
    }

    toArrayEntities(rawObjects: AttendanceSessionMapperProps[]): AttendanceSessionEntity[] {
        if (!rawObjects) {
            throw CustomError.notFound("Attendance sessions data is missing");
        }

        const entities = rawObjects.map((rawSession) => this.toEntity(rawSession));

        return entities;
    }
}
