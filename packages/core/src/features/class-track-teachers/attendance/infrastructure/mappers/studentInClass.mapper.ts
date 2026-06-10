import { CustomError } from "@salc/core/enums";
import { StudentInClassProjection } from "@salc/core/features/class-track-teachers/attendance/domain/entities/StudentInClassProjection.entity";
import type { EntityValidator } from "@salc/core/interfaces/EntityValidator";

type StudentInClassMapperrProps = Record<string, unknown> | unknown | null | undefined;

export interface StudentInClassMapper {
    toEntity(rawObject: StudentInClassMapperrProps): StudentInClassProjection;
    toArrayEntities(rawArray: StudentInClassMapperrProps[]): StudentInClassProjection[];
}

export class StudentInClassMapperImpl implements StudentInClassMapper {
    constructor(private readonly validator: EntityValidator<StudentInClassProjection>) {}

    toEntity(rawObject: StudentInClassMapperrProps): StudentInClassProjection {
        if (!rawObject) {
            throw CustomError.notFound("StudentInClass not found");
        }

        const validationResponse = this.validator.validate(rawObject);

        const { sessionId, studentId, fullName, sessionStatus, entryTime } = validationResponse;

        const date = new Date(entryTime);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;

        return new StudentInClassProjection(sessionId, studentId, fullName, sessionStatus, formattedTime);
    }

    toArrayEntities(rawArray: StudentInClassMapperrProps[]): StudentInClassProjection[] {
        if (!rawArray) {
            throw CustomError.notFound("StudentInClass array not found");
        }

        return rawArray.map((rawObject) => this.toEntity(rawObject));
    }
}
